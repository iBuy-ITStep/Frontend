import type {Brand} from "../types/Brand.ts";
import type {BrandDto} from "./dto/BrandDto.ts";
import {api} from "./apiSlice.ts";

export const brandApi = api.injectEndpoints({
    endpoints: builder => ({
        brands: builder.query<Brand[], void>({
            query: () => ({
                url: "brands/list",
                method: "GET",
            }),
        }),
        createBrand: builder.mutation({
            query: (dto: BrandDto) => ({
                url: "brands",
                method: "POST",
                body: dto
            })
        }),
        updateBrand: builder.mutation({
            query: (dto: BrandDto) => ({
                url: `brands/${dto.id}`,
                method: "PUT",
                body: dto
            })
        }),
        deleteBrand: builder.mutation({
            query: (id: number) => ({
                url: `brands/${id}`,
                method: "DELETE",
            })
        }),
    })
})

export const { useBrandsQuery, useCreateBrandMutation, useUpdateBrandMutation, useDeleteBrandMutation } = brandApi;