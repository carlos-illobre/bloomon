const { combineLatest } = require('rxjs')
const { scan, map, filter } = require('rxjs/operators')
const addFlowerToProductionFacility = require('./addFlowerToProductionFacility.js')

module.exports = ({ bouquetSpecStore$, flower$ }) => combineLatest(bouquetSpecStore$, flower$).pipe(
  scan(addFlowerToProductionFacility, {
    flowers: {
      L: {},
      S: {},
      s: {}
    }
  }),
  map(({ bouquetSpec }) => bouquetSpec),
  filter(bouquetSpec => bouquetSpec),
)
