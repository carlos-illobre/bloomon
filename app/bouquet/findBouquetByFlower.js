module.exports = (bouquets, flower) => bouquets.reduce(({ bouquets, bouquet }, item) => {

  const isMatch = !bouquet && item.needsFlower(flower)
  return {
    bouquets: isMatch ? bouquets : bouquets.concat([item]),
    bouquet: isMatch ? item : bouquet
  }

}, { bouquets: [] })
