const { takeWhile, reduce, map } = require('rxjs/operators')
const parseBouquetSpecLine = require('./parseBouquetSpecLine.js')

module.exports = ({ line$ }) => line$.pipe(
  takeWhile(line => line),
  map(parseBouquetSpecLine),
  reduce((bouquetSpecs, bouquetSpec) => bouquetSpecs.concat([bouquetSpec]), []),
)
