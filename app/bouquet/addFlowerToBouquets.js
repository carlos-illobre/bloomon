const findBouquetByFlower = require('./findBouquetByFlower.js')
const createBouquet = require('./createBouquet.js')

module.exports = (prev, [bouquetSpecStore, flower]) => {
    
  const { bouquets, bouquet } = findBouquetByFlower(prev.bouquets, flower)
  if (bouquet) {
    const isComplete = bouquet.addFlower(flower).isComplete()
    return {
      bouquets: isComplete ? bouquets : bouquets.concat([bouquet]),
      bouquet: isComplete ? bouquet : null
    }
  }

  const bouquetSpec = bouquetSpecStore.findByFlower(flower)
  if (!bouquetSpec) return {
    bouquets,
    bouquet: null
  }

  const newBouquet = createBouquet(bouquetSpec).addFlower(flower)
  return {
    bouquets: newBouquet.isComplete() ? bouquets : bouquets.concat([newBouquet]),
    bouquet: newBouquet.isComplete() ? newBouquet : null
  }

}

