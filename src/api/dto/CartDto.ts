import type {ProductCart} from "../../types/ProductCart.ts";

export type CartDto = {
    cartId: number,
    distinctProductCount: number
    maxDistinctProducts: number
    isOrder: boolean
    status: string
    items: ProductCart[]
    totalPrice: number
}