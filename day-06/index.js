const fs = require('fs');
const _ = require('lodash')
const Point = require('./Point')
const input = fs.readFileSync('./input.txt', 'utf8');

const parseInput = inputText => {
    const lines = input.split('\n');
    return lines.map(it => {
        const [xText, yText] = it.split(', ');
        const x = parseInt(xText, 10)
        const y = parseInt(yText, 10)
        return new Point({x, y});
    })
}

const coord = parseInput(input)

let minX = Number.MAX_SAFE_INTEGER
let minY = Number.MAX_SAFE_INTEGER
let maxX = Number.MIN_SAFE_INTEGER
let maxY = Number.MIN_SAFE_INTEGER

coord.forEach(point => {
    const {x, y}  = point
    if (x < minX) {
        minX = x
    }
    if (y < minY) {
        minY = y
    }
    if(x > maxX) {
        maxX = x
    }
    if(y> maxY) {
        maxY = y
    }
})

const manathanDistance = (pointA, pointB) => {
    return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y)
}

const getClosestPoint = (point, reperePoints) => {
    let minManathan = Number.MAX_SAFE_INTEGER;
    let index = -1
    let moreThanOne = false
    for (let i = 0; i < reperePoints.length; i++) {
        const element = reperePoints[i];
        const distance = manathanDistance(point, element)
        if(distance === minManathan) {
            moreThanOne = true
        }
        if (distance < minManathan) {
            minManathan = distance
            index = i
            moreThanOne = false
        }
        
    }
    return moreThanOne ? -1 : index
}

const grid = []

for(let i=0; i<maxX; i++) {
    grid[i] = grid[i] || []
    for(let j=0; j<maxY; j++) {
        const currentPoint = new Point({x: i, y: j})
        grid[i][j] = getClosestPoint(currentPoint, coord)
    }
}

const excluded = []

const addToExcluded = value => {
    if (!excluded.includes(value) && value!==-1) {
        excluded.push(value)
    }
}

for(let i=0; i< maxX; i++) {
    const itemFirstLine = grid[0][i]
    const itemLastLine = grid[maxX - 1][i]
    addToExcluded(itemFirstLine)
    addToExcluded(itemLastLine)
}
for(let i=0; i< maxY; i++) {
    const itemFirstLine = grid[i][0]
    const itemLastLine = grid[i][maxY -1]
    addToExcluded(itemFirstLine)
    addToExcluded(itemLastLine)
}

const items = _.countBy(_.flattenDeep(grid))
delete items[-1]
excluded.forEach(ex => {
    delete items[ex]
})

const nextVal = _.reduce(items, (stack, value, key) => {
    console.log({stack})
    if (!stack || stack.value < value) {
        return {key, value}
    }
    return stack
}, null)

console.log(items)

console.log(nextVal)
