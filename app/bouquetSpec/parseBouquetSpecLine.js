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

    includesFlower(flower) {
      const index = species.indexOf(flower.name)
      return flower.size == size && index != -1 ? quantities[index] : 0
    },

    getSize() {
      return size
    },

    getFlowers() {
      return species.reduce((flowers, specie, index) => ({
        ...flowers,
        [specie]: quantities[index]
      }), {})
    },

    toString() {
      return line
    }

  }

}
