const DEFAULT_MAX_FLOWERS = 256

const line$ = require('./createLine$.js')
const flower$ = require('./createFlower$.js')({ line$ })
const bouquetSpecStore$ = require('./createBouquetSpecStore$.js')({ line$ })
const productionFacility$ = require('./createProductionFacility$.js')({ bouquetSpecStore$, flower$ })
const flowerStorage$ = require('./createFlowerStorage$.js')({
  flower$,
  productionFacility$,
  DEFAULT_MAX_FLOWERS
})

productionFacility$
  .subscribe(bouquet => console.log(bouquet.getLine()))

flowerStorage$
  .subscribe(message => {
    process.on('exit', (code) => console.log(message))
    process.exitCode = 1
  })
