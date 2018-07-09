const { merge } = require('rxjs')
const { map, scan, filter, first } = require('rxjs/operators')

module.exports = ({ flower$, bouquet$, maxFlowers }) => {

  const flowerCount$ = flower$.pipe(
    map(_ => 1)
  )

  const bouquetFlowerCount$ = bouquet$.pipe(
    map(bouquet => -bouquet.count())
  )

  return merge(flowerCount$, bouquetFlowerCount$).pipe(
    scan((total, count) => total + count, 0),
    filter(count => count == maxFlowers),
    first(),
    map(count => `The facility cannot store more than ${count} flowers`)
  )

}
