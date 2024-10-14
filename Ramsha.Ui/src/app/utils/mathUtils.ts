export const getDiscountPercentage = (basePrice: number, finalPrice: number) =>
    `${((1 - (finalPrice / basePrice)) * 100).toFixed(0)}% OFF`;