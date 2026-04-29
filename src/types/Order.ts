import type {ProductCart} from "./ProductCart.ts";
import type {OrderStatus} from "./OrderStatus.ts";

export type Order = {
    cartId: string;
    timestampLastUpdate: Date;
    distinctProductCount: number;
    maxDistinctProducts: number;
    isOrder: boolean;
    status: OrderStatus;
    items: ProductCart[]
    totalPrice: number;
}