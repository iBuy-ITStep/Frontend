import {api} from "./apiSlice.ts";
import type {UsersDto} from "./dto/UsersDto.ts";
import type {AdminUser} from "../types/AdminUser.ts";
import type {Role} from "../types/Role.ts";
import type {RegisterDto} from "./dto/RegisterDto.ts";

export const adminApi = api.injectEndpoints({
    endpoints: builder => ({
        users: builder.query<UsersDto, void>({
            query: () => ({
                url: "admin/users",
                method: "GET",
            }),
        }),
        userById: builder.query<AdminUser, string>({
            query: (id: string) => ({
                url: `admin/users/${id}`,
                method: "GET"
            })
        }),
        roles: builder.query<Role[], void>({
            query: () => ({
                url: "admin/roles",
                method: "GET"
            })
        }),
        createNewUser: builder.mutation({
            query: (dto: Partial<RegisterDto>) => ({
                url: "admin/users",
                method: "POST",
                body: dto,
            })
        }),
        updateUserEmail: builder.mutation({
            query: ({id, newEmail}:{newEmail: string, id: string}) => ({
                url: `admin/users/${id}`,
                method: "PUT",
                body: {newEmail},
            })
        }),
        updateUserRoles: builder.mutation({
            query: ({id, roles}:{id: string, roles: Role[]}) => ({
                url: `admin/users/${id}/roles`,
                method: "PUT",
                body: {roles}
            })
        }),
        deleteUser: builder.mutation({
            query: (id: string) => ({
                url: `admin/users/${id}`,
                method: "DELETE"
            })
        })
    })
})

export const {
    useUsersQuery,
    useUserByIdQuery,
    useRolesQuery,
    useCreateNewUserMutation,
    useUpdateUserEmailMutation,
    useUpdateUserRolesMutation,
    useDeleteUserMutation,
} = adminApi;