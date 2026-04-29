import type {CartDto} from "./dto/CartDto.ts";
import type {OrderDto} from "./dto/OrderDto.ts";
import {api} from "./apiSlice.ts";
import type {Order} from "../types/Order.ts";

export const cartApi = api.injectEndpoints({
    endpoints: builder => ({
        cartByUser: builder.query<CartDto, void>({
            query: () => ({
                url: "cart",
                method: "GET",
            }),
        }),
        ordersByUser: builder.query<OrderDto, void>({
            query: () => ({
                url: "cart/orders",
                method: "GET"
            })
        }),
        allOrders: builder.query<Order[], void>({
            query: () => ({
                url: "cart/orders/all",
                method: "GET",
            }),
        }),
        addProductToCart: builder.mutation<void, {productId: number, quantity: number}>({
            query: (dto) => ({
                url: "cart/items",
                method: "POST",
                body: dto
            })
        }),
        decrementProductQuantity: builder.mutation({
            query: (id: number) => ({
                url: `cart/items/${id}/one`,
                method: "DELETE"
            })
        }),
        removeProductFromCart: builder.mutation({
            query:  (id: number) => ({
                url: `cart/items/${id}`,
                method: "DELETE"
            })
        }),
        setProductCartQuantity: builder.mutation({
            query: (p: {productId: number, quantity: number}) => ({
                url: `cart/items/${p.productId}`,
                method: "PUT",
                body: {
                    quantity: p.quantity
                }
            })
        }),
        checkout: builder.mutation<void,void>({
            query: () => ({
                url: "cart/checkout",
                method: "POST"
            })
        }),
        changeOrderStatus: builder.mutation({
            query: (id: string) => ({
                url: `cart/orders/${id}/status`,
                method: "PUT"
            })
        }),
    })
})

export const {
    useCartByUserQuery,
    useAllOrdersQuery,
    useOrdersByUserQuery,
    useAddProductToCartMutation,
    useDecrementProductQuantityMutation,
    useRemoveProductFromCartMutation,
    useSetProductCartQuantityMutation,
    useCheckoutMutation,
    useChangeOrderStatusMutation,
} = cartApi;