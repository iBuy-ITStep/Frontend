export type User = {
    nameid: string,
    unique_name: string,
    role: string[],
    token?: string | null,
    refreshToken?: string | null
    isAuthenticated: boolean,
}