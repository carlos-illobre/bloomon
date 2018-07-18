const { expect } = require('chai')
const { from } = require('rxjs')

const createFlower$ = require(`${process.env.PWD}/app/createFlower$.js`)
const createBouquetSpecStore$ = require(`${process.env.PWD}/app/createBouquetSpecStore$.js`)
const createProductionFacility$ = require(`${process.env.PWD}/app/createProductionFacility$.js`)
const createFlowerStorage$ = require('./createFlowerStorage$.js')

describe('createFlowerStorage$', function() {

  it('return full storage error', function(done) {

    const line$ = from([
      'AL1v',
      'AL1a1b',
      'BL1a2b',
      '',
      'vL',
      'aL',
      'aL',
      'aL',
      'aL',
      'aL'
    ])

    const flower$ = createFlower$({ line$ })
    const bouquetSpecStore$ = createBouquetSpecStore$({ line$ })
    const productionFacility$ = createProductionFacility$({ bouquetSpecStore$, flower$ })

    createFlowerStorage$({ flower$, productionFacility$, maxFlowers: 5 })
      .subscribe(message => {
        expect(message).to.equal('The facility cannot store more than 5 flowers')
        done()
      })

  })

})
