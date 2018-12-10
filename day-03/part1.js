const {parseInput} = require('../utils/parseInput')
const path = require('path')

const reg = /#(?<id>\d{1,4}) @ (?<x>\d{1,3}),(?<y>\d{1,3}): (?<width>\d{1,3})x(?<height>\d{1,3})/

const input = parseInput(path.join(__dirname, 'input.txt'), row => {
    // #790 @ 137,108: 28x29
    const {id, x, y, width, height} = reg.exec(row).groups;
    return {
        id: parseInt(id),
        x: parseInt(x),
        y: parseInt(y),
        width: parseInt(width),
        height: parseInt(height)
    }
})

let maxX = 0
let maxY = 0
input.forEach(it => {
    if (it.x + it.width > maxX) { maxX = it.x + it.width}
    if (it.y + it.height > maxY) { maxY = it.y + it.height}
})

const isInSquare = (x, y, square) => {
    const inX = x >= square.x && x < (square.x + square.width)
    const inY = y >= square.y && y < (square.y + square.height)
    return inX && inY
}

const getNbClaimed = (x, y, input) => {
    let count = 0;
    for (let i = 0; i < input.length; i++) {
        const square = input[i];
        if (isInSquare(x, y, square)) {
            count++;
        }
    }
    return count
}

let inchesClaimedSeveralTime = 0
for (let x = 0; x < maxX; x++) {
    for (let y = 0; y < maxY; y++) {
        const nbClaimed = getNbClaimed(x, y, input)
        if( nbClaimed > 1) {
            inchesClaimedSeveralTime++
        }
    }
}

console.log({inchesClaimedSeveralTime})