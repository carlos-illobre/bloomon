const { expect } = require('chai')
const { from } = require('rxjs')

const createFlower$ = require('./createFlower$')

describe('createFlower$', function() {

  it('return a flower when receive a flower line', function(done) {

    const line$ = from(['cL'])

    createFlower$({ line$ })
      .subscribe(flower => {
        expect(flower).to.deep.equal({ name: 'c', size: 'L' })
        done()
      })

  })

  it('ignore empty lines and bouquetSpec lines', function(done) {

    const line$ = from(['DL20b', '', 'aS'])

    createFlower$({ line$ })
      .subscribe(flower => {
        expect(flower).to.deep.equal({ name: 'a', size: 'S' })
        done()
      })

  })

})
