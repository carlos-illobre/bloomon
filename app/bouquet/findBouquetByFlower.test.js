const { expect } = require('chai')
const findBouquetByFlower = require('./findBouquetByFlower.js')

describe('findBouquetByFlower', function() {

  it('returns a bouquet that needs the flower and a new bouquet array without the found bouquet', function() {

    const flowerMock = {}

    const bouquetsMock = [{
      id: 1,
      needsFlower(flower) {
        expect(flower).to.equal(flowerMock)
        return false
      }
    }, {
      id: 2,
      needsFlower(flower) {
        expect(flower).to.equal(flowerMock)
        return true
      }
    }, {
      id: 3,
      needsFlower(flower) {
        expect(flower).to.equal(flowerMock)
        return false
      }
    }, {
      id: 4,
      needsFlower(flower) {
        expect(flower).to.equal(flowerMock)
        return true
      }
    }]

    const { bouquets, bouquet } = findBouquetByFlower(bouquetsMock, flowerMock)

    expect(bouquet).to.equal(bouquetsMock[1])
    expect(bouquets.length).to.equal(3)
    expect(bouquets[0]).to.equal(bouquetsMock[0])
    expect(bouquets[1]).to.equal(bouquetsMock[2])
    expect(bouquets[2]).to.equal(bouquetsMock[3])

  })

  it('returns null as bouquet and a copy of the full bouquets array if none of the bouquets needs the flower', function() {

    const flowerMock = {}

    const bouquetsMock = [{
      id: 1,
      needsFlower(flower) {
        expect(flower).to.equal(flowerMock)
        return false
      }
    }, {
      id: 2,
      needsFlower(flower) {
        expect(flower).to.equal(flowerMock)
        return false
      }
    }, {
      id: 3,
      needsFlower(flower) {
        expect(flower).to.equal(flowerMock)
        return false
      }
    }, {
      id: 4,
      needsFlower(flower) {
        expect(flower).to.equal(flowerMock)
        return false
      }
    }]

    const { bouquets, bouquet } = findBouquetByFlower(bouquetsMock, flowerMock)

    expect(bouquet).to.not.exist
    expect(bouquets.length).to.equal(4)
    expect(bouquets[0]).to.equal(bouquetsMock[0])
    expect(bouquets[1]).to.equal(bouquetsMock[1])
    expect(bouquets[2]).to.equal(bouquetsMock[2])
    expect(bouquets[3]).to.equal(bouquetsMock[3])

  })

})
