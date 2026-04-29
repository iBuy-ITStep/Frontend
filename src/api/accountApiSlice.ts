import type {LoginDto} from "./dto/LoginDto.ts";
import type {RegisterDto} from "./dto/RegisterDto.ts";
import {api} from "./apiSlice.ts";
import type {ConfirmEmailDto} from "./dto/ConfirmEmailDto.ts";
import type {ForgotPasswordDto} from "./dto/ForgotPasswordDto.ts";
import type {ResetPasswordDto} from "./dto/ResetPasswordDto.ts";


export const accountApi = api.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (dto: LoginDto) => ({
                url: "account/login",
                method: "POST",
                body: dto
            })
        }),
        register: builder.mutation({
            query: (dto: RegisterDto) => ({
                url: "account/register",
                method: "POST",
                body: dto
            })
        }),
        confirmEmail: builder.mutation({
            query: (dto: ConfirmEmailDto) => ({
                url: "account/confirm-email",
                method: "POST",
                params: {...dto}
            })
        }),
        forgotPassword: builder.mutation({
            query: (dto: ForgotPasswordDto) => ({
                url: "account/forgot-password",
                method: "POST",
                body: dto
            })
        }),
        resetPassword: builder.mutation({
            query: (dto: ResetPasswordDto) => ({
                url: "account/reset-password",
                method: "POST",
                body: dto
            })
        }),
        refresh: builder.mutation({
            query: ({AccessToken, refreshToken}: { AccessToken: string, refreshToken: string }) => ({
                url: "account/refresh-token",
                method: "POST",
                body: {AccessToken, refreshToken}
            })
        }),
        logout: builder.mutation<void,void>({
            query: () => ({
                url: "account/logout",
                method: "POST"
            })
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshMutation,
    useLogoutMutation,
    useConfirmEmailMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = accountApi;