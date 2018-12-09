const {parseInput} = require('../utils/parseInput')
const path = require('path')
const _ = require('lodash')

const input = parseInput(path.join(__dirname, 'input.txt'), row => row)

const result = input.reduce((acc, value) => {
    const lettersOccurences = _.countBy(value);
    const hasTwo = _.values(lettersOccurences).includes(2)
    const hasThree = _.values(lettersOccurences).includes(3)
    if (hasTwo) {
        acc.two++
    }
    if (hasThree) {
        acc.three++
    }
    return acc
}, {two: 0, three: 0})

result.checksum = result.two * result.three

console.log({result})