const { takeWhile, reduce, map } = require('rxjs/operators')
const createBouquetSpecStore = require('./createBouquetSpecStore.js')

module.exports = ({ bouquetSpec$ }) => bouquetSpec$.pipe(
  takeWhile(bouquetSpec => bouquetSpec),
  reduce((bouquetSpecs, bouquetSpec) => bouquetSpecs.concat([bouquetSpec]), []),
  map(createBouquetSpecStore)
)
