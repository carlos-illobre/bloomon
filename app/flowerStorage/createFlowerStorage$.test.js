const { expect } = require('chai')
const { from } = require('rxjs')

const createBouquetSpec$ = require(`${process.env.PWD}/app/bouquetSpec/createBouquetSpec$.js`)
const createBouquetSpecStore$ = require(`${process.env.PWD}/app/bouquetSpecStore/createBouquetSpecStore$.js`)
const createFlower$ = require(`${process.env.PWD}/app/flower/createFlower$.js`)
const createBouquet$ = require(`${process.env.PWD}/app/bouquet/createBouquet$.js`)
const createFlowerStorage$ = require('./createFlowerStorage$.js')

describe('createFlowerStorage$', function() {

  it('return full storage error', function(done) {

    const line$ = from([
      'AL1a1b',
      'BL1a2b',
      '',
      'aL',
      'aL',
      'aL',
      'aL',
      'aL'
    ])

    const flower$ = createFlower$({ line$ })
    const bouquetSpec$ = createBouquetSpec$({ line$ })
    const bouquetSpecStore$ = createBouquetSpecStore$({ bouquetSpec$ })
    const bouquet$ = createBouquet$({ bouquetSpecStore$, flower$ })

    createFlowerStorage$({ flower$, bouquet$, maxFlowers: 5 })
      .subscribe(message => {
        expect(message).to.equal('The facility cannot store more than 5 flowers')
        done()
      })

  })

})
