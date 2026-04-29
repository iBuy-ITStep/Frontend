import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import type {SerializedError} from "@reduxjs/toolkit";
import type {CustomError} from "./CustomError.ts";

export type Result<T> = {
    succeeded?: boolean;
    data?: T | null;
    error? : CustomError | FetchBaseQueryError | SerializedError

}

export type ApiResult<T> = Result<T>
    | { data: { succeeded?: boolean; data?: T | null; error?: string | null }; error?: undefined }
    | { data?: undefined; error: FetchBaseQueryError | SerializedError }