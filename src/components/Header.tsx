import {Header as AntdHeader} from "antd/es/layout/layout";
import {Link, useLocation, useNavigate} from "react-router";
import {Dropdown, Flex, type MenuProps, Popover, Space} from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import {IbuySearch} from "./IbuySearch.tsx";
import {DownloadApp} from "./DownloadApp.tsx";
import {useSelector} from "react-redux";
import {selectIsSearchVisible} from "../app/slices/headerSlice.ts";
import {CategoryNode} from "./CategoryNode.tsx";
import {useCategoriesQuery} from "../api/categoryApiSlice.ts";
import Text from "antd/es/typography/Text";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {logout, selectIsAuth, selectRoles} from "../app/slices/userSlice.ts";
import {CartDrawer} from "./CartDrawer.tsx";
import {useLogoutMutation} from "../api/accountApiSlice.ts";
import {api} from "../api/apiSlice.ts";

/* TODO:
    4. Search
*/



const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {pathname} = location;
    const isSearchVisible = useSelector(selectIsSearchVisible)
    const {data, isLoading } = useCategoriesQuery();
    const isAuth = useAppSelector(selectIsAuth);
    const dispatch = useAppDispatch();
    const role = useAppSelector(selectRoles);
    const [logoutApi] = useLogoutMutation()
    type MenuItemWithPath = Required<MenuProps>['items'][number] & {
        path?: string;
    };

    const items: MenuItemWithPath[] = isAuth
        ? [
            { key: '1', label: 'My Account', path: 'account' },
            { key: '2', label: 'Your Orders', path: 'orders' },
            {
                key: '3',
                label: 'Logout',
                path: 'logout',
            },
        ]
        : [
            { key: '1', label: 'Login', path: 'auth' },
            { key: '2', label: 'Create Account', path: 'auth' },
            { key: '3', label: 'Your Orders', path: 'orders' },

        ];
    if(role.includes('Admin')){
        items.unshift({key: '4', label: 'Admin', path: 'admin'});
    }

    const onClick: MenuProps["onClick"] = ({ key }) => {
        const item = items.find(t => t?.key === key);
        if (item?.path) {
            if(item.path === "logout"){
                dispatch(logout());
                logoutApi();
                dispatch(api.util.resetApiState())
                navigate("/auth");
                return;
            }
            navigate(`/${item.path}`);
        }
    };

    return (
        <AntdHeader style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.10)',
        }}>
            <Link to="/home" style={{color: "black", fontWeight: 700, fontSize: 24}}>iBuy</Link>

            {!isLoading && pathname != "/home" &&
                <>
                <Popover content={<CategoryNode categories={data} />} style={{padding: 0}}>
                    <a onClick={(e) => e.preventDefault()}
                       style={{color:'black',display: "flex", flexDirection: "row", alignItems : 'center', gap: 3, width: 'fit-content'}} >
                        <HiMenuAlt2 />
                        <Text>Explore</Text>
                        <IoIosArrowDown />
                    </a>
                    </Popover>
                </>
            }
            {(isSearchVisible || pathname != "/home") && <IbuySearch styles={{width: "50%"}} />}

            <Flex align="center" gap={12}>
            {pathname == "/home" && <DownloadApp/>}
            <Dropdown menu={{items, onClick}} >
                <a onClick={(e) => e.preventDefault()}
                   style={{color:'black',display: "flex", flexDirection: "row", alignItems : 'center', gap: 6,}} >
                    <FaUserCircle size={25} />
                    <Space>
                        Account
                    </Space>
                    <IoIosArrowDown />
                </a>
            </Dropdown>
            <CartDrawer />
            </Flex>
        </AntdHeader>
    );
}

export { Header }

