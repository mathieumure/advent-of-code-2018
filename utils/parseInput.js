const fs = require('fs')

module.exports.parseInput = (path, cb) => {
    const input = fs.readFileSync(path, 'utf8');
    const lines = input.split('\n');
    return lines.map(it => {
        return cb(it);
    })
}