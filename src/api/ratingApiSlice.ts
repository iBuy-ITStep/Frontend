import {api} from "./apiSlice.ts";

export const ratingApi = api.injectEndpoints({
    endpoints: builder => ({
        ratingsByProductId: builder.query<number, number>({
            query: (id:number) => ({
                url: `ratings/${id}/my`,
                method: "GET",
            })
        }),
        setRateToProduct: builder.mutation({
            query: ({id, score}:{id: number, score: number}) => ({
                url: `ratings/${id}`,
                method: "POST",
                body: { score }
            })
        })
    })
})

export const {
    useRatingsByProductIdQuery,
    useSetRateToProductMutation

} = ratingApi;