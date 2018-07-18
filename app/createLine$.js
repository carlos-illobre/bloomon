const { fromEvent } = require('rxjs')

const reader = require('readline')
  .createInterface({
    input: process.stdin
  })

reader.setPrompt('')
process.stdin.setEncoding('utf8')

module.exports = fromEvent(reader, 'line')
