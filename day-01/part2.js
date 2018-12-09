const {parseInput} = require('../utils/parseInput')
const path = require('path')

const input = parseInput(path.join(__dirname, 'input2.txt'), row => {
    return parseInt(row);
})

const valueReached = [0]
let firstValueReachedTwice = null
let initialValue = 0

while(firstValueReachedTwice === null) {
    initialValue = input.reduce((acc, value) => {
        const nextValue = acc + value
        if (valueReached.includes(nextValue) && firstValueReachedTwice === null) {
            firstValueReachedTwice = nextValue;
        }
        valueReached.push(nextValue)
        return nextValue;
    }, initialValue)
}

console.log({firstValueReachedTwice})