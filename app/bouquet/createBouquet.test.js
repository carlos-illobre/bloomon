const { expect } = require('chai')
const createBouquet = require('./createBouquet.js')
const parseBouquetSpecLine = require(`${process.env.PWD}/app/bouquetSpec/parseBouquetSpecLine.js`)

describe('createBouquet', function() {

  it('return a bouquet that needs a flower', function() {

    const bouquetSpec = parseBouquetSpecLine('AL10a15b5c')
    const bouquet = createBouquet(bouquetSpec)

    expect(bouquet.needsFlower({ name: 'b', size: 'L' })).to.equal(15)
    expect(bouquet.needsFlower({ name: 'b', size: 'S' })).to.equal(0)
    expect(bouquet.needsFlower({ name: 'z', size: 'L' })).to.equal(0)

  })

  it('add a flower to the bouquet', function() {

    const bouquetSpec = parseBouquetSpecLine('AL34a19b')
    const bouquet = createBouquet(bouquetSpec)
    const flower = { name: 'a', size: 'L' }

    expect(bouquet.addFlower(flower).needsFlower(flower)).to.equal(33)

  })

  it('does not add a flower to the bouquet if the flower has the wrong size', function() {

    const bouquetSpec = parseBouquetSpecLine('AL34a19b')
    const bouquet = createBouquet(bouquetSpec)
    const flower = { name: 'a', size: 'S' }

    expect(bouquet.addFlower(flower).needsFlower(flower)).to.equal(0)

  })

  it('does not add a flower to the bouquet if the flower has the wrong name', function() {

    const bouquetSpec = parseBouquetSpecLine('AL34a19b')
    const bouquet = createBouquet(bouquetSpec)
    const flower = { name: 'z', size: 'L' }

    expect(bouquet.addFlower(flower).needsFlower(flower)).to.equal(0)

  })

  it('return an incomplete bouquet', function() {

    const bouquetSpec = parseBouquetSpecLine('AL2a1b')
    const bouquet = createBouquet(bouquetSpec)

    expect(bouquet.isComplete()).to.be.false
    expect(bouquet.addFlower({ name: 'a', size: 'L' }).isComplete()).to.be.false
    expect(bouquet.addFlower({ name: 'a', size: 'L' }).isComplete()).to.be.false
    expect(bouquet.addFlower({ name: 'a', size: 'L' }).isComplete()).to.be.false
    expect(bouquet.addFlower({ name: 'b', size: 'S' }).isComplete()).to.be.false
    expect(bouquet.addFlower({ name: 'b', size: 'L' }).isComplete()).to.be.true
    expect(bouquet.addFlower({ name: 'b', size: 'L' }).isComplete()).to.be.true
    expect(bouquet.addFlower({ name: 'a', size: 'L' }).isComplete()).to.be.true

  })

  it('count the flowers', function() {

    const bouquetSpec = parseBouquetSpecLine('AL2a1b')
    const bouquet = createBouquet(bouquetSpec)

    expect(bouquet.count()).to.equal(0)
    expect(bouquet.addFlower({ name: 'a', size: 'L' }).count()).to.equal(1)
    expect(bouquet.addFlower({ name: 'a', size: 'L' }).count()).to.equal(2)
    expect(bouquet.addFlower({ name: 'a', size: 'S' }).count()).to.equal(2)
    expect(bouquet.addFlower({ name: 'a', size: 'L' }).count()).to.equal(2)
    expect(bouquet.addFlower({ name: 'b', size: 'L' }).count()).to.equal(3)

  })

  it('return the string representation', function() {
    const line = 'AL2a1b'
    const bouquetSpec = parseBouquetSpecLine(line)
    const bouquet = createBouquet(bouquetSpec)
    expect(bouquet.toString()).to.equal(line)
  })

})
