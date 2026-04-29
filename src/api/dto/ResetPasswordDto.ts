export type ResetPasswordDto = {
    email: string
    encodedToken: string
    newPassword: string
    confirmPassword: string
}