const { combineLatest } = require('rxjs')
const { scan, map, filter } = require('rxjs/operators')
const addFlowerToBouquets = require('./addFlowerToBouquets.js')

module.exports = ({ bouquetSpecStore$, flower$ }) => combineLatest(bouquetSpecStore$, flower$).pipe(
  scan(addFlowerToBouquets, { bouquets: [] }),
  map(({ bouquet }) => bouquet),
  filter(bouquet => bouquet)
)
