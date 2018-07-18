module.exports = ({ flowers }, [bouquetSpecs, { name, size }]) => {

  flowers[size][name] = {
    name,
    size,
    count: flowers[size][name] ? flowers[size][name].count + 1 : 1
  }

  const bouquetSpec = bouquetSpecs
    .filter(bouquetSpec => bouquetSpec.getSize() == size)
    .find(bouquetSpec => bouquetSpec.canCreateWith(Object.values(flowers[size])))

  if (bouquetSpec) {
    bouquetSpec.getFlowers()
      .map(flower => flowers[size][name].count -= flower.quantity)
  }

  return {
    flowers,
    bouquetSpec
  }

}
