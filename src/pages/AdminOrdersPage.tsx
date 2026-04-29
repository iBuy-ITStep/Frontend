import {
    Card,
    Flex,
    List,
    Typography,
    Button,
    Tag,
    Spin,
    Empty,
    Pagination,
} from "antd";
import { useAllOrdersQuery, useChangeOrderStatusMutation } from "../api/cartApiSlice.ts";
import { getStatusColorRuAdapter } from "../features/adapters/statusAdapter.ts";
import { useState } from "react";

const { Title, Text } = Typography;

export const AdminOrdersPage = () => {
    const { data: orders, isLoading ,refetch } = useAllOrdersQuery();
    const [changeOrderStatus] = useChangeOrderStatusMutation();

    // 👉 pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const handleChangeOrderStatus = async (orderId: string) => {
        await changeOrderStatus(orderId);
        await refetch();
    };

    if (isLoading) {
        return (
            <Flex justify="center" align="center" style={{ height: "60vh" }}>
                <Spin size="large" />
            </Flex>
        );
    }

    if (!orders || orders.length === 0) {
        return <Empty description="No orders found" />;
    }

    // 👉 slice orders for current page
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedOrders = orders.slice(startIndex, startIndex + pageSize);

    return (
        <Flex vertical gap={16} style={{ padding: 20 }}>
            <Title level={2}>Orders</Title>

            {paginatedOrders.map((order) => (
                <Card
                    key={order.cartId}
                    style={{
                        borderRadius: 12,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                    }}
                >
                    {/* HEADER */}
                    <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
                        <Flex vertical>
                            <Text strong>Order ID</Text>
                            <Text type="secondary">{order.cartId}</Text>
                        </Flex>

                        <Flex align="center" gap={12}>
                            <Tag color={getStatusColorRuAdapter(order.status)}>
                                {order.status}
                            </Tag>

                            <Button
                                type="primary"
                                onClick={() => handleChangeOrderStatus(order.cartId)}
                            >
                                Change Status
                            </Button>
                        </Flex>
                    </Flex>

                    {/* ITEMS */}
                    <List
                        dataSource={order.items}
                        renderItem={(item) => (
                            <List.Item>
                                <Flex justify="space-between" style={{ width: "100%" }}>
                                    <Flex vertical>
                                        <Text strong>{item.productName}</Text>
                                        <Text type="secondary">
                                            ${item.productPrice} × {item.quantity}
                                        </Text>
                                    </Flex>

                                    <Text strong>${item.subtotal}</Text>
                                </Flex>
                            </List.Item>
                        )}
                    />

                    {/* FOOTER */}
                    <Flex justify="space-between" style={{ marginTop: 12 }}>
                        <Text type="secondary">
                            Last update:{" "}
                            {new Date(order.timestampLastUpdate).toLocaleString()}
                        </Text>

                        <Title level={5} style={{ margin: 0 }}>
                            Total: ${order.totalPrice}
                        </Title>
                    </Flex>
                </Card>
            ))}

            {/* 👉 PAGINATION */}
            <Flex justify="center" style={{ marginTop: 16 }}>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={orders.length}
                    onChange={(page, size) => {
                        setCurrentPage(page);
                        setPageSize(size);
                    }}
                    showSizeChanger
                    pageSizeOptions={["5", "10", "20", "50"]}
                />
            </Flex>
        </Flex>
    );
};