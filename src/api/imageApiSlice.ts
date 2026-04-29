import type {ImageDto} from "./dto/ImageDto.ts";
import type {ImageUploadResultDto} from "./dto/ImageUploadResultDto.ts";
import {api} from "./apiSlice.ts";
import type {ImageDetailsDto} from "./dto/ImageDetailsDto.ts";

export const imageApi = api.injectEndpoints({
    endpoints: builder => ({
        imageById: builder.query<string, string>({
            query: (id:string) => ({
                url: `images/${id}`,
                method: "GET",
                responseHandler: (response) => response.blob()
            }),
            transformResponse: (blob: Blob) => {
                return URL.createObjectURL(blob);
            }
        }),
        allImages: builder.query<ImageDetailsDto[], void>({
            query: () => ({
                url: "images/my-images",
                method: "GET"
            })
        }),
        imagesByProductId: builder.query<ImageUploadResultDto[], number>({
            query: (id: number) =>({
                url: `images/product/${id}`,
                method: "GET",
            }),
        }),

        uploadImage: builder.mutation<any, ImageDto>({
            query: (formData) => ({
                url: "images/upload",
                method: "POST",
                body: formData.file,
                params: formData.productId ?  {
                    productId: formData.productId
                } : {}
            })
        }),
        uploadPreviewImage: builder.mutation<any, ImageDto>({
            query: (formData) => ({
                url: "images/upload/preview",
                method: "POST",
                body: formData.file,
                params: formData.productId ?  {
                    productId: formData.productId
                } : {}
            })
        }),
        deleteImage: builder.mutation({
            query: (id: string) => ({
                url: `images/${id}`,
                method: "DELETE"
            })
        })
    })
})

export const { useImageByIdQuery,
    useUploadImageMutation,
    useUploadPreviewImageMutation,
    useImagesByProductIdQuery,
    useAllImagesQuery,
    useDeleteImageMutation,
} = imageApi;