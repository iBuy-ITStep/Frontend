import type {QueryOptions} from "../../types/QueryOptions.ts";

export type ProductQuery = QueryOptions & {
    categoryId?: number;
    brandId?: number;
}