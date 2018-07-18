const { map, filter } = require('rxjs/operators')

module.exports = ({ line$ }) => line$.pipe(
  filter(line => line),
  filter(line => line.length == 2),
  map(line => ({
    name: line[0],
    size: line[1]
  }))
)
