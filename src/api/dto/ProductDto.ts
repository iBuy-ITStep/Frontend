import type {Product} from "../../types/Product.ts";

export type ProductDto = {
    items: Product[];
    currentPage: number;
    totalPages: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}