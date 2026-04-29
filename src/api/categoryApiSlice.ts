import type {ApiCategory, Category} from "../types/Category.ts";
import { categoryToTreeAdapter} from "../features/adapters/categoryAdapter.ts";
import type {CategoryDto} from "./dto/CategoryDto.ts";
import {api} from "./apiSlice.ts";

export const categoryApi = api.injectEndpoints({
    endpoints: builder => ({
        categories: builder.query<Category[], void>({
            query: () => ({
                url: "categories/list",
                method: "GET",
            }),
            transformResponse: (response: ApiCategory[]): Category[] => {
                return categoryToTreeAdapter(response);
            }
        }),
        rowCategories: builder.query<ApiCategory[], void>({
            query: () => ({
                url: "categories/list",
                method: "GET",
            })
        }),
        createCategory: builder.mutation({
            query: (dto: CategoryDto) => ({
                url: "categories",
                method: "POST",
                body: dto
            })
        }),
        updateCategory: builder.mutation({
            query: (dto: CategoryDto) => ({
                url: `categories/${dto.id}`,
                method: "PUT",
                body: dto
            })
        }),
        deleteCategory: builder.mutation({
            query: (id: number) => ({
                url: `categories/${id}`,
                method: "DELETE",
            })
        })
    })
})

export const { useCategoriesQuery, useCreateCategoryMutation, useRowCategoriesQuery, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoryApi;