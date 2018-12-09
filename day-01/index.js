const {parseInput} = require('../utils/parseInput')
const path = require('path')

const input = parseInput(path.join(__dirname, 'input.txt'), row => {
    return parseInt(row);
})

const sum = input.reduce((acc, value) => acc + value, 0)
console.log({sum})