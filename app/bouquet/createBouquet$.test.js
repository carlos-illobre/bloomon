const { expect } = require('chai')
const { from } = require('rxjs')

const createBouquetSpec$ = require(`${process.env.PWD}/app/bouquetSpec/createBouquetSpec$.js`)
const createBouquetSpecStore$ = require(`${process.env.PWD}/app/bouquetSpecStore/createBouquetSpecStore$.js`)
const createFlower$ = require(`${process.env.PWD}/app/flower/createFlower$.js`)
const createBouquet$ = require('./createBouquet$.js')

describe('createBouquet$', function() {

  it('return a bouquet', function(done) {

    const line$ = from([
      'AL10g1b',
      'AL1a1b',
      'BL1b1c',
      '',
      'cL',
      'aS',
      'aL',
      'bL'
    ])

    const flower$ = createFlower$({ line$ })
    const bouquetSpec$ = createBouquetSpec$({ line$ })
    const bouquetSpecStore$ = createBouquetSpecStore$({ bouquetSpec$ })

    createBouquet$({ bouquetSpecStore$, flower$ })
      .subscribe(bouquet => {
        expect(bouquet.isComplete()).to.be.true
        done()
      })

  })

})
