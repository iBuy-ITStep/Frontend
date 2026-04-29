import {Outlet} from "react-router";
import {Layout as AntdLayout} from "antd";
import {Header} from "../components/Header.tsx";
import {Footer} from "../components/Footer.tsx";

export const Layout = () => {
    return (
        <>
            <AntdLayout>
                <Header />
                <Outlet/>
                <Footer/>
            </AntdLayout>
        </>
    )
}