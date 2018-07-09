module.exports = bouquetSpecs => ({
  findByFlower(flower) {
    return bouquetSpecs.find(bouquetSpec => bouquetSpec.includesFlower(flower))
  }
})
