import type {ProductCart} from "../../types/ProductCart.ts";

export const cartTotalProductQuantityAdapter = (data: ProductCart[]): number => {
    let result = 0;
    for (const p of data) {
        result += p.quantity;
    }
    return result;
}