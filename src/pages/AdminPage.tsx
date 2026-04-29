import {Flex, Tabs, type TabsProps} from "antd";
import {Outlet, useLocation, useNavigate} from "react-router";

type TabsPropsWithMode = Required<TabsProps>["items"][number] & {
    mode: "product" | "category" | "brand" | "image" | "users" | "orders";
}

const tabData: TabsPropsWithMode[] = [
    {
        key:"1",
        label: "Product",
        mode: "product"
    },
    {
        key: "2",
        label: "Category",
        mode: "category"
    },
    {
        key: "3",
        label: "Brand",
        mode: "brand"
    },
    {
        key: "4",
        label: "Images",
        mode: "image"
    },
    {
        key: "5",
        label: "Users",
        mode: "users"
    },
    {
        key: "6",
        label: "Orders",
        mode: "orders"
    }
]

export const AdminPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const activeKey = () => {
        const mode = location.pathname.split("/")[2] || "product";
        return tabData.find(t => t.mode === mode)?.key;
    }
    const onTabChange = (k: string) => {
        const mode = tabData.find(m => m.key === k);
        if (mode) {
            navigate(`${mode.mode}`);
        }
    }
    return (
        <Flex>
            <Tabs
                activeKey={activeKey()}
                tabPlacement={"start"}
                items={tabData}
                onChange={onTabChange}
            />
            <Outlet  />
        </Flex>
    )
}