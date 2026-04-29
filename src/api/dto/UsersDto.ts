import type {QueryOptions} from "../../types/QueryOptions.ts";
import type {AdminUser} from "../../types/AdminUser.ts";

export type UsersDto = QueryOptions & {
    items: AdminUser[]
}