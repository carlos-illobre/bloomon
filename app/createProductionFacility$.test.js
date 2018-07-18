const { expect } = require('chai')
const { from } = require('rxjs')
const { reduce } = require('rxjs/operators')

const createFlower$ = require(`${process.env.PWD}/app/createFlower$.js`)
const createBouquetSpecStore$ = require(`${process.env.PWD}/app/createBouquetSpecStore$.js`)
const createProductionFacility$ = require('./createProductionFacility$.js')

describe('createProductionFacility$', function() {

  it('return a bouquet', function(done) {

    const line$ = from([
      'AS1a1b1c',
      'BS1a1d1e',
      '',
      'aS',
      'aS',
      'bS',
      'cS',
      'dS',
      'eS'
    ])

    const expected = [
      'AS1a1b1c',
      'BS1a1d1e'
    ]

    const flower$ = createFlower$({ line$ })
    const bouquetSpecStore$ = createBouquetSpecStore$({ line$ })

    createProductionFacility$({ bouquetSpecStore$, flower$ }).pipe(
      reduce((actual, bouquet) => actual.concat([bouquet]), [])
    )
      .subscribe(bouquets => {
        expect(bouquets.map(bouquet => bouquet.getLine())).to.deep.equal(expected)
        done()
      })

  })

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
    const bouquetSpecStore$ = createBouquetSpecStore$({ line$ })

    createProductionFacility$({ bouquetSpecStore$, flower$ })
      .subscribe(bouquet => {
        expect(bouquet.getLine()).to.equal('AL1a1b')
        done()
      })

  })

})
