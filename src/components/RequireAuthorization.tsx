import {useAppSelector} from "../app/hooks.ts";
import {useLayoutEffect, useState} from "react";
import {Spin} from "antd";
import {Outlet} from "react-router";
import {ForbiddenPage} from "../pages/ForbiddenPage.tsx";
import {selectRoles} from "../app/slices/userSlice.ts";

export function RequireAuthorization({allowedRoles}:{allowedRoles: string[]}) {
    const roles = useAppSelector(selectRoles);
    const [loading, setLoading] = useState(true);
    useLayoutEffect(() => {
        console.log(roles);
        console.log(roles.find(role => allowedRoles.includes(role)) );
        if (roles) {
            setLoading(false);
        }
    }, [roles])
    return (
        <>
            {loading ? <Spin fullscreen/> :
                roles.find(role => allowedRoles.includes(role))  ? <Outlet/> : <ForbiddenPage/>
            }
        </>
    )
}