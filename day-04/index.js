const {parseInput} = require('../utils/parseInput')
const path = require('path')
const moment = require('moment')
const lodash = require('lodash')

const input = parseInput(path.join(__dirname, 'input.txt'), row => {
    const regex = /\[(?<time>.*)\] (?<action>.*)/
    const match = regex.exec(row)
    return {
        time: moment(match.groups.time),
        action: match.groups.action
    }
})
input.sort((a,b) => a.time - b.time)

const shiftActionRegex = /Guard #(?<id>\d{1,5}) begins shift/
const isBeginShiftAction = action => shiftActionRegex.test(action)
const extractGuardId = action => shiftActionRegex.exec(action).groups.id

const isFallAsleepAction = action => action === 'falls asleep'
const isWakesUpaction = action => action === 'wakes up'

let currentGuard = null;
let asleepTime = null;
const resultByGuard = {}
input.forEach(({time, action}) => {
    if (isBeginShiftAction(action)) {
        currentGuard = extractGuardId(action)
        resultByGuard[currentGuard] = resultByGuard[currentGuard] || {id: currentGuard, total: 0, byMinutes: Array(60).fill(0)}
        return;
    }
    if (isFallAsleepAction(action)) {
        asleepTime = time
    }
    if(isWakesUpaction(action)) {
        const duration = moment.duration(time.diff(asleepTime));
        const minutes = duration.asMinutes();
        for(let i =asleepTime.minutes(); i<time.minutes(); i++) {
            resultByGuard[currentGuard].byMinutes[i] += 1
        }
        resultByGuard[currentGuard].total += minutes
    }
})

// console.log(input.map(it => it.time.format('YYYY-MM-DD HH:mm:ss') + ' - ' + it.action))
// console.log(resultByGuard)

console.log("=== PART ONE ===")
const winner = lodash.reduce(resultByGuard, (maxGuard, nextGuard) => {
    if (maxGuard.total < nextGuard.total) {
        return nextGuard
    }
    return maxGuard
}, {id: null, total: 0})

console.log('winnerId', winner.id)
const maxMInuteAslepp = lodash.max(winner.byMinutes)
const minuteMinute = winner.byMinutes.findIndex(it => it === maxMInuteAslepp)
console.log('winner minutes most asleep', minuteMinute)

console.log("result ==> ", minuteMinute * Number(winner.id))


console.log("\n\n=== PART TWO ===")
const mostSleeper = lodash.reduce(resultByGuard, (maxGuard, nextGuard) => {
    
    const maxMInuteAslepp = lodash.max(nextGuard.byMinutes)
    if (maxMInuteAslepp > maxGuard.maxMinuteAmount) {
        const minuteMinute = nextGuard.byMinutes.findIndex(it => it === maxMInuteAslepp)
        return {id: nextGuard.id, maxMinute: minuteMinute, maxMinuteAmount: maxMInuteAslepp}
    }
    return maxGuard
}, {id: null, maxMinute: 0, maxMinuteAmount: 0})
console.log(mostSleeper)
console.log("result", Number(mostSleeper.id) * mostSleeper.maxMinute)

// const initialValue = []
// let maxMinute = 
// for(let i=0; i<60; i++) {initialValue.push({})}
// const frequencyByMinutesAndByGuard = lodash.reduce(resultByGuard, (frequencyByMinutesAndByGuard, nextGuard) => {
//     nextGuard.byMinutes.forEach((it, index) => {
//         frequencyByMinutesAndByGuard[index][nextGuard.id] = it;
//     })
//     return frequencyByMinutesAndByGuard
// }, initialValue)

// console.log(frequencyByMinutesAndByGuard)