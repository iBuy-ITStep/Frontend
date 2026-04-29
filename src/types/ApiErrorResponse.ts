import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";
export type ApiErrorData = {
    code: string
    description: string
}
export type ApiErrorResponse = FetchBaseQueryError &{
    data: ApiErrorData[]
}