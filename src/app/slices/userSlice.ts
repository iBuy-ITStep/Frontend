import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {User} from "../../types/User.ts";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import type {RootState} from "../store.ts";
import type {LoginResultDto} from "../../api/dto/LoginResultDto.ts";


const initialState: User = {
    nameid: "",
    unique_name: "",
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    role: [],
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<LoginResultDto>) => {
            console.log("payload",action.payload);
            const decodeToken = jwtDecode<User>(action.payload.token)
            state.nameid = decodeToken?.nameid
            state.unique_name = decodeToken?.unique_name
            // state.role = decodeToken?.role
            console.log("stat.roles", decodeToken?.role)

            if (decodeToken?.role) {
                if (Array.isArray(decodeToken.role)) {
                    state.role = decodeToken.role;
                } else {
                    state.role = [decodeToken.role];
                }
            }
            state.token = action.payload.token
            state.refreshToken = action.payload.refreshToken
            console.log("refreshtoken", action.payload.refreshToken!)
            Cookies.set("AccessToken", action.payload.token!, {
                expires: 7,
            });
            Cookies.set("refreshToken", action.payload.refreshToken!, {
                expires: 7,
            });
            Cookies.set("nameid", state.nameid, {
                expires: 7,
            });
            state.isAuthenticated = true
            console.log("finish")
        },
        logout: () => {
            Cookies.remove("refreshToken");
            return initialState;
        }

    }
})

export const {setUser, logout} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const selectAccessToken = (state: RootState) => state.user.token;
export const selectIsAuth = (state: RootState) => state.user.isAuthenticated;
export const selectRoles = (state: RootState) => state.user.role;
export default userSlice.reducer;
