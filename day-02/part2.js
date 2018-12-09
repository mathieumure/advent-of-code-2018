const {parseInput} = require('../utils/parseInput')
const path = require('path')
const _ = require('lodash')

const input = parseInput(path.join(__dirname, 'input.txt'), row => row)

const getDistance = (a, b) => {
    const splittedA = a.split('')
    const splittedB = b.split('')
    let diffCounter = 0
    for (let i = 0; i < splittedA.length; i++) {
        if (splittedA[i] !== splittedB[i]) {
            diffCounter++
        }
    }
    return diffCounter
}

let withOnlyOneDiff = {}
for (let i = 0; i < input.length; i++) {
    const current = input[i];
    for(let j = i + 1; j < input.length; j++) {
        const other = input[j]
        const nbDiff = getDistance(current, other)
        if (nbDiff === 1) {
            withOnlyOneDiff = {current, other}
        }
    }
}

const keepSameLetters = (a, b) => {
    const splittedA = a.split('')
    const splittedB = b.split('')
    let result = ''
    for (let i = 0; i < splittedA.length; i++) {
        if (splittedA[i] === splittedB[i]) {
            result+=splittedA[i]
        }
    }
    return result
}

console.log(keepSameLetters(withOnlyOneDiff.current, withOnlyOneDiff.other))