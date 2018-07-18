const { merge } = require('rxjs')
const { map, scan, filter, first } = require('rxjs/operators')

module.exports = ({ flower$, productionFacility$, maxFlowers }) => {

  const flowerCount$ = flower$.pipe(
    map(_ => 1)
  )

  const bouquetFlowerCount$ = productionFacility$.pipe(
    map(bouquet => -bouquet.total())
  )

  return merge(flowerCount$, bouquetFlowerCount$).pipe(
    scan((total, count) => total + count, 0),
    filter(count => count == maxFlowers),
    first(),
    map(count => `The facility cannot store more than ${count} flowers`)
  )

}
