import type {ApiErrorResponse} from "../../types/ApiErrorResponse.ts";

export const isApiError = (error: unknown): error is ApiErrorResponse => {
    return (
        typeof error === "object" &&
        error !== null &&
        "data" in error
    );
}