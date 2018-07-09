const { expect } = require('chai')
const { from } = require('rxjs')

const createBouquetSpec$ = require(`${process.env.PWD}/app/bouquetSpec/createBouquetSpec$.js`)
const createBouquetSpecStore$ = require('./createBouquetSpecStore$')

describe('createBouquetSpecStore$', function() {

  it('return a bouquetSpecStore when receives all the bouquetSpecs', function(done) {

    const line$ = from([
      'BL15b1c',
      'BS10b5c',
      '',
      'cL',
      'bL',
      'aS',
      'aS'
    ])

    const bouquetSpec$ = createBouquetSpec$({ line$ })

    createBouquetSpecStore$({ bouquetSpec$ })
      .subscribe(bouquetSpecStore => {
        const flower = { name: 'c', size: 'S' }
        expect(bouquetSpecStore.findByFlower(flower).includesFlower(flower)).to.equal(5)
        expect(bouquetSpecStore.findByFlower({ name: 'z', size: 'L' })).to.not.exist
        done()
      })

  })

})
