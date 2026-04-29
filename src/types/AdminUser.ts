import type {Role} from "./Role.ts";

export type AdminUser = {
    id: string,
    email: string,
    emailConfirmed: boolean,
    roles: Role[]
}
