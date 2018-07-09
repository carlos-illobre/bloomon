const { expect } = require('chai')

const parseBouquetSpecLine = require('./parseBouquetSpecLine')

describe('parseBouquetSpecLine', function() {

  it('return a bouquetSpec', function() {

    const line = 'AL10a15b5c'
    const bouquetSpec = parseBouquetSpecLine(line)

    expect(bouquetSpec.includesFlower({ name: 'c', size: 'L' })).to.equal(5)
    expect(bouquetSpec.includesFlower({ name: 'a', size: 'L' })).to.equal(10)
    expect(bouquetSpec.includesFlower({ name: 'b', size: 'L' })).to.equal(15)
    expect(bouquetSpec.includesFlower({ name: 'a', size: 'S' })).to.equal(0)
    expect(bouquetSpec.includesFlower({ name: 'z', size: 'L' })).to.equal(0)
    expect(bouquetSpec.getSize()).to.equal('L')
    expect(bouquetSpec.getFlowers()).to.deep.equal({ a: 10, b: 15, c: 5 })

  })

  it('return the line when receive an empty line', function() {

    const line = ''
    const bouquetSpec = parseBouquetSpecLine(line)
    expect(bouquetSpec).to.equal(line)

  })

})
