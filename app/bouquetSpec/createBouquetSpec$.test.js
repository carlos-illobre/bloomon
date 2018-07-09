const { expect } = require('chai')
const { from } = require('rxjs')
const { first } = require('rxjs/operators')

const createBouquetSpec$ = require('./createBouquetSpec$')

describe('createBouquetSpec$', function() {

  it('return a bouquetSpec when receive a bouquetSpec line', function(done) {

    const line$ = from(['AL10a15b5c'])

    createBouquetSpec$({ line$ })
      .pipe(first())
      .subscribe(bouquetSpec => {
        expect(bouquetSpec.getFlowers()).to.deep.equal({
          a: 10,
          b: 15,
          c: 5
        })
        expect(bouquetSpec.getSize()).to.equal('L')
        done()
      })

  })

  it('return null when receive an empty line', function(done) {

    const line$ = from([''])

    createBouquetSpec$({ line$ })
      .pipe(first())
      .subscribe(bouquetSpec => {
        expect(bouquetSpec).to.equal('')
        done()
      })

  })

})
