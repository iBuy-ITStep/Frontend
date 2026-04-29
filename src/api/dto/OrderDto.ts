import type {Order} from "../../types/Order.ts";

export type OrderDto = {
    currentPage: number
    totalPages: number
    pageSize: number
    hasPreviousPage: boolean
    hasNextPage: boolean
    items: Order[]
}