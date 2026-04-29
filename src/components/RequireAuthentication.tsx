import {useDispatch} from "react-redux";
import {Outlet} from "react-router";
import {useLayoutEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import type {LoginResultDto} from "../api/dto/LoginResultDto.ts";
import {selectIsAuth, setUser} from "../app/slices/userSlice.ts";
import {useAppSelector} from "../app/hooks.ts";
import {useRefreshMutation} from "../api/accountApiSlice.ts";
import type { Result} from "../types/ApiResult.ts";
import {Spin} from "antd";
import {useCartByUserQuery} from "../api/cartApiSlice.ts";

export const RequireAuthentication = () => {
    // const location = useLocation();

    const dispatch = useDispatch();
    const [refreshToken] = useRefreshMutation();
    const [loading, setLoading] = useState(true);
    const isAuth = useAppSelector(selectIsAuth);
    const hasRun = useRef(false);
    const {refetch} = useCartByUserQuery()
    useLayoutEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        const auth = async () => {
            if (!isAuth) {
                const token = Cookies.get("refreshToken");
                const sub = Cookies.get("AccessToken");
                if (sub && token) {
                    const result: Result<LoginResultDto> = await refreshToken({AccessToken: sub, refreshToken: token});
                    if (result.data) {
                        refetch()
                        const response = result.data!;
                        dispatch(setUser({token: response.token!, refreshToken: response.refreshToken}))
                    }
                }
            }
            setLoading(false);
        }
        auth().catch((err) => {console.log("ath err: ", err)});
    }, [isAuth, refreshToken, dispatch])

    // return (
    //     loading ? <Spin description={"Loading..."} fullscreen/> :
    //         isAuth ?
    //             <Outlet/> : <Navigate to={
    //                 // `/auth?returnUrl=${location.pathname}`
    //             "/home"
    //             } state={{from: location}} replace/>
    // )
    return (
        loading ? <Spin /> : <Outlet />
    )
}