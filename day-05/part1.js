const {parseInput} = require('../utils/parseInput')
const path = require('path')

const input = parseInput(path.join(__dirname, 'input.txt'), row => row)[0]

let nbTransformation = 0
let chain = input


const interval = 'a'.charCodeAt(0) - 'A'.charCodeAt(0)
const isRevertPolarity = (a, b) => {
    const aCode = a.charCodeAt(0)
    const bCode = b.charCodeAt(0)
    if (aCode > bCode) {
        return isRevertPolarity(b, a)
    }
    return (bCode - aCode) === interval
}

let hasChanged = false
do {
    // console.log(chain)
    let withTransformation = ''
    const baseChain= chain.split('')
    for(let i=0; i<baseChain.length; i++) {
        const current = baseChain[i]
        if (i + 1 === baseChain.length) {
            withTransformation += current
            break
        }
        const next = baseChain[i+1]
        if (isRevertPolarity(current, next)) {
            i++;
            continue;
        }
        withTransformation += current
    }
    hasChanged = chain !== withTransformation
    chain = withTransformation
}
while(hasChanged)

console.log(chain.length)