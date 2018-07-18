module.exports = line => {

  if (!line) return line

  const size = line[1]
  const species = line.slice(2).split(/[0-9]/).filter(specie => specie)
  const quantities = line
    .slice(2)
    .split(/[a-z]/)
    .filter(quantity => quantity)
    .map(quantity => parseInt(quantity))

  return {

    getSize() {
      return size
    },

    canCreateWith(flowers) {
      return !species
        .map(specie => flowers.find(flower => flower.size == size && flower.name == specie) || {
          name: specie,
          count: 0
        })
        .map((flower, index) => ({
          ...flower,
          quantity: quantities[index]
        }))
        .find(({ quantity, count }) => quantity > count)
    },

    getFlowers() {
      return species.map((specie, index) => ({
        name: specie,
        size,
        quantity: quantities[index]
      }), [])
    },

    getLine() {
      return line
    },

    total() {
      return quantities.reduce((sum, quantity) => sum + quantity, 0)
    }

  }

}
