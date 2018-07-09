const { map } = require('rxjs/operators')
const parseBouquetSpecLine = require('./parseBouquetSpecLine.js')

module.exports = ({ line$ }) => line$.pipe(
  map(parseBouquetSpecLine)
)

