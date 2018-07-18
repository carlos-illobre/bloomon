const { expect } = require('chai')

const parseBouquetSpecLine = require('./parseBouquetSpecLine')

describe('parseBouquetSpecLine', function() {

  it('return a bouquetSpec', function() {

    const line = 'AL10a15b5c'
    const bouquetSpec = parseBouquetSpecLine(line)

    expect(bouquetSpec.getLine()).to.equal(line)
    expect(bouquetSpec.getSize()).to.equal('L')
    expect(bouquetSpec.getFlowers()).to.deep.equal([{
      name: 'a',
      quantity: 10,
      size: 'L'
    }, {
      name: 'b',
      quantity: 15,
      size: 'L'
    }, {
      name: 'c',
      quantity: 5,
      size: 'L'
    }])

  })

  it('return the line when receive an empty line', function() {

    const line = ''
    const bouquetSpec = parseBouquetSpecLine(line)
    expect(bouquetSpec).to.equal(line)

  })

})
