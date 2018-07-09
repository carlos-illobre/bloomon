module.exports = bouquetSpec => {

  const flowerSpecs = bouquetSpec.getFlowers()

  const flowers = Object.keys(flowerSpecs)
    .reduce((prev, flowerName) => ({
      ...prev,
      [flowerName]: 0
    }), {})

  return {

    needsFlower(flower) {
      return flower.size == bouquetSpec.getSize() && Number.isInteger(flowers[flower.name])
        ? flowerSpecs[flower.name] - flowers[flower.name] : 0
    },

    addFlower(flower) {
      if (this.needsFlower(flower)) {
        flowers[flower.name] += 1
      }
      return this
    },

    isComplete() {
      return !Object.keys(flowerSpecs)
        .find(flowerName => this.needsFlower({
          name: flowerName,
          size: bouquetSpec.getSize()
        }))
    },

    count() {
      return Object.values(flowers).reduce((count, quantity) => count + quantity, 0)
    },

    toString() {
      return bouquetSpec.toString()
    }

  }

}
