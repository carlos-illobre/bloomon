const { expect } = require('chai')
const parseBouquetSpecLine = require(`${process.env.PWD}/app/bouquetSpec/parseBouquetSpecLine.js`)
const createBouquetSpecStore = require('./createBouquetSpecStore.js')

describe('createBouquetStore', function() {

  it('return a bouquet spec', function() {

    const bouquetSpecs = [
      'BL15b52c',
      'BS10b5c'
    ].map(parseBouquetSpecLine)

    const bouquetSpecStore = createBouquetSpecStore(bouquetSpecs)

    const flower = { name: 'c', size: 'L' }

    expect(bouquetSpecStore.findByFlower(flower).includesFlower(flower)).to.equal(52)
    expect(bouquetSpecStore.findByFlower({ name: 'z', size: 'L' })).to.not.exist

  })

})
