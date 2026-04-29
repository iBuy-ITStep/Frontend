import type {ProductDto} from "./dto/ProductDto.ts";
import type {ProductQuery} from "./dto/ProductQuery.ts";
import type {Product} from "../types/Product.ts";
import {api} from "./apiSlice.ts";

export const productApi = api.injectEndpoints({
    endpoints: builder => ({
        products: builder.query<ProductDto, ProductQuery | undefined>({
            query: (dto: ProductQuery) => ({
                url: "products",
                method: "GET",
                params: {...dto}
            }),
        }),
        productById: builder.query<Product, number>({
            query: (id: number)=>({
                url: `products/${id}`,
                method: "GET"
            })
        }),
        productToolTip: builder.query<Partial<Product>, number>({
           query: (id: number) => ({
               url: `products/${id}/tooltip`,
               method: "GET"
           })
        }),
        createProduct: builder.mutation({
            query: (body: Partial<Product>) => ({
                url: "products",
                method: "POST",
                body
            })
        }),
        deleteProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
        }),

        updateProduct: builder.mutation<
            Product,
            Partial<Product> & { id: number }> ({
            query: ({ id, ...body }) => ({
                url: `/products/${id}`,
                method: "PUT",
                body,
            }),
        }),

        setStockQuantity: builder.mutation({
            query: ({id, quantity}: { id: number, quantity: number }) => ({
                url: `products/${id}/stock`,
                method: "PUT",
                body: {
                    Quantity: quantity
                }
            })
        })
    })
})

export const {
    useProductsQuery,
    useLazyProductsQuery,
    useProductToolTipQuery,
    useProductByIdQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useSetStockQuantityMutation,
} = productApi;