const { expect } = require('chai')

const createBouquetSpecStore = require(`${process.env.PWD}/app/bouquetSpecStore/createBouquetSpecStore.js`)
const parseBouquetSpecLine = require(`${process.env.PWD}/app/bouquetSpec/parseBouquetSpecLine.js`)

const addFlowerToBouquets = require('./addFlowerToBouquets.js')

describe('addFlowerToBouquets', function() {

  it('return a bouquet', function() {

    const bouquets = []

    const bouquetSpecStore = createBouquetSpecStore(['BL1b2c', 'BL2a1c', 'ZL1p'].map(parseBouquetSpecLine))

    const flowerA = { name: 'a', size: 'L' }
    const flowerB = { name: 'b', size: 'L' }
    const flowerC = { name: 'c', size: 'L' }

    const result1 = addFlowerToBouquets({ bouquets }, [bouquetSpecStore, flowerA])
    expect(result1.bouquets.length).to.equal(1)
    expect(result1.bouquets[0].needsFlower(flowerA)).to.equal(1)
    expect(result1.bouquets[0].needsFlower(flowerB)).to.equal(0)
    expect(result1.bouquets[0].needsFlower(flowerC)).to.equal(1)
    expect(result1.bouquet).to.not.exist
    
    const result2 = addFlowerToBouquets(result1, [bouquetSpecStore, flowerA])
    expect(result2.bouquets.length).to.equal(1)
    expect(result2.bouquets[0].needsFlower(flowerA)).to.equal(0)
    expect(result2.bouquets[0].needsFlower(flowerB)).to.equal(0)
    expect(result2.bouquets[0].needsFlower(flowerC)).to.equal(1)
    expect(result2.bouquet).to.not.exist

    const result3 = addFlowerToBouquets(result2, [bouquetSpecStore, flowerA])
    expect(result3.bouquets.length).to.equal(2)
    expect(result3.bouquets[0].needsFlower(flowerA)).to.equal(0)
    expect(result3.bouquets[0].needsFlower(flowerB)).to.equal(0)
    expect(result3.bouquets[0].needsFlower(flowerC)).to.equal(1)
    expect(result3.bouquets[1].needsFlower(flowerA)).to.equal(1)
    expect(result3.bouquets[1].needsFlower(flowerB)).to.equal(0)
    expect(result3.bouquets[1].needsFlower(flowerC)).to.equal(1)
    expect(result3.bouquet).to.not.exist

    const result4 = addFlowerToBouquets(result3, [bouquetSpecStore, flowerB])
    expect(result4.bouquets.length).to.equal(3)
    expect(result4.bouquets[0].needsFlower(flowerA)).to.equal(0)
    expect(result4.bouquets[0].needsFlower(flowerB)).to.equal(0)
    expect(result4.bouquets[0].needsFlower(flowerC)).to.equal(1)
    expect(result4.bouquets[1].needsFlower(flowerA)).to.equal(1)
    expect(result4.bouquets[1].needsFlower(flowerB)).to.equal(0)
    expect(result4.bouquets[1].needsFlower(flowerC)).to.equal(1)
    expect(result4.bouquets[2].needsFlower(flowerA)).to.equal(0)
    expect(result4.bouquets[2].needsFlower(flowerB)).to.equal(0)
    expect(result4.bouquets[2].needsFlower(flowerC)).to.equal(2)
    expect(result4.bouquet).to.not.exist
    
    const result5 = addFlowerToBouquets(result4, [bouquetSpecStore, flowerC])
    expect(result5.bouquets.length).to.equal(2)
    expect(result5.bouquets[0].needsFlower(flowerA)).to.equal(1)
    expect(result5.bouquets[0].needsFlower(flowerB)).to.equal(0)
    expect(result5.bouquets[0].needsFlower(flowerC)).to.equal(1)
    expect(result5.bouquets[1].needsFlower(flowerA)).to.equal(0)
    expect(result5.bouquets[1].needsFlower(flowerB)).to.equal(0)
    expect(result5.bouquets[1].needsFlower(flowerC)).to.equal(2)
    expect(result5.bouquet.isComplete()).to.be.true

    const result6 = addFlowerToBouquets(result5, [bouquetSpecStore, flowerC])
    expect(result6.bouquets.length).to.equal(2)
    expect(result6.bouquets[0].needsFlower(flowerA)).to.equal(0)
    expect(result6.bouquets[0].needsFlower(flowerB)).to.equal(0)
    expect(result6.bouquets[0].needsFlower(flowerC)).to.equal(2)
    expect(result6.bouquets[1].needsFlower(flowerA)).to.equal(1)
    expect(result6.bouquets[1].needsFlower(flowerB)).to.equal(0)
    expect(result6.bouquets[1].needsFlower(flowerC)).to.equal(0)
    expect(result6.bouquet).to.not.exist

    const result7 = addFlowerToBouquets(result6, [bouquetSpecStore, { name: 'h', size: 'S' }])
    expect(result7.bouquets.length).to.equal(2)
    expect(result7.bouquets[0].needsFlower(flowerA)).to.equal(0)
    expect(result7.bouquets[0].needsFlower(flowerB)).to.equal(0)
    expect(result7.bouquets[0].needsFlower(flowerC)).to.equal(2)
    expect(result7.bouquets[1].needsFlower(flowerA)).to.equal(1)
    expect(result7.bouquets[1].needsFlower(flowerB)).to.equal(0)
    expect(result7.bouquets[1].needsFlower(flowerC)).to.equal(0)
    expect(result7.bouquet).to.not.exist

    const result8 = addFlowerToBouquets(result7, [bouquetSpecStore, { name: 'p', size: 'L' }])
    expect(result8.bouquets.length).to.equal(2)
    expect(result8.bouquets[0].needsFlower(flowerA)).to.equal(0)
    expect(result8.bouquets[0].needsFlower(flowerB)).to.equal(0)
    expect(result8.bouquets[0].needsFlower(flowerC)).to.equal(2)
    expect(result8.bouquets[1].needsFlower(flowerA)).to.equal(1)
    expect(result8.bouquets[1].needsFlower(flowerB)).to.equal(0)
    expect(result8.bouquets[1].needsFlower(flowerC)).to.equal(0)
    expect(result5.bouquet.isComplete()).to.be.true

  })

})
