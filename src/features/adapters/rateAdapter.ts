import type {Product} from "../../types/Product.ts";

export const ratesToAverageAdapter = (product: Product | undefined): number => {
    if(!product) return 0;
    const totalRates = totalCustomersRatings(product)
    const result =  Number(((product.rating1Count +
        product.rating2Count * 2 +
        product.rating3Count * 3 +
        product.rating4Count * 4 +
        product.rating5Count * 5) / totalRates).toFixed(2));
    return result ?? 0;
}

export const totalCustomersRatings = (product: Product | undefined):number => {
    if(!product) return 0;
    return (product.rating1Count +
        product.rating2Count +
        product.rating3Count +
        product.rating4Count +
        product.rating5Count)
}