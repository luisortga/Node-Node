interface Customers {
  client: string
  cuenta: number
}

class first implements Customers {
  client: string = 'luis'
  cuenta: number = 16

  constructor() {}
}

const TAX_RATE = 0.21

/**
 * Calculate price with Iva
 * @param price - price of product only number positive
 * @returns - price with IVA
 */

function calculatePriceWithTax(price: number): number {
  return price + price * TAX_RATE
}

function findAffordableProducts(prices: number[], maxBudget: number): number[] {
  const isAffordable = (price: number) =>
    calculatePriceWithTax(price) <= maxBudget

  const byPriceDescending = (a: number, b: number) =>
    calculatePriceWithTax(b) - calculatePriceWithTax(a)

  return prices.filter(isAffordable).sort(byPriceDescending)
}

const finalPrice: number[] = findAffordableProducts([12, 16], 18)
console.log(finalPrice)
