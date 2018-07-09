const DEFAULT_MAX_FLOWERS = 256

const { fromEvent } = require('rxjs')

const reader = require('readline')
  .createInterface({
    input: process.stdin
  })

reader.setPrompt('')
process.stdin.setEncoding('utf8')

const line$ = fromEvent(reader, 'line')
const flower$ = require('./flower/createFlower$.js')({ line$ })
const bouquetSpec$ = require('./bouquetSpec/createBouquetSpec$.js')({ line$ })
const bouquetSpecStore$ = require('./bouquetSpecStore/createBouquetSpecStore$.js')({ bouquetSpec$ })
const bouquet$ = require('./bouquet/createBouquet$.js')({ bouquetSpecStore$, flower$ })
const flowerStorage$ = require('./flowerStorage/createFlowerStorage$.js')({ flower$, bouquet$, DEFAULT_MAX_FLOWERS })

bouquet$
  .subscribe(bouquet => console.log(bouquet.toString()))

flowerStorage$
  .subscribe(message => {
    process.on('exit', (code) => console.log(message))
    process.exitCode = 1
  })
