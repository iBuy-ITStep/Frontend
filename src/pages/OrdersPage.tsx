import { Card, Flex, Spin, Tag, Typography, Divider } from "antd";
import { useOrdersByUserQuery } from "../api/cartApiSlice";
import {CustomImage} from "../components/CustomImage.tsx";
import {Link} from "react-router";

const { Title, Text } = Typography;

export const OrdersPage = () => {
    const { data, isLoading } = useOrdersByUserQuery();

    if (isLoading) {
        return (
            <Flex justify="center" align="center" style={{ height: "50vh" }}>
                <Spin size="large" />
            </Flex>
        );
    }

    return (
        <Flex vertical style={{ width: "100%", padding: 24 }} gap={16}>
            <Title level={3}>My Orders</Title>
            {data?.items && data?.items?.map((order) => (
                <Card
                    key={order.cartId}
                    style={{ borderRadius: 12 }}
                    title={
                        <Flex justify="space-between" align="center">
                            <Text strong>Order #{order.cartId.slice(0, 8)}</Text>
                            <Tag color={order.isOrder ? "green" : "orange"}>
                                {order.status}
                            </Tag>
                        </Flex>
                    }
                >
                    {/* ORDER META */}
                    <Flex justify="space-between">
                        <Text type="secondary">
                            Updated: {new Date(order.timestampLastUpdate).toLocaleString()}
                        </Text>
                        <Text type="secondary">
                            Items: {order.distinctProductCount}
                        </Text>
                    </Flex>

                    <Divider />

                    {/* PRODUCTS */}
                    <Flex vertical gap={12}>
                        {order.items.map((item) => (
                            <Flex
                                key={item.productId}
                                justify="space-between"
                                align="center"
                                style={{
                                    padding: 10,
                                    borderRadius: 8,
                                    background: "#fafafa",
                                }}
                            >
                                <Link to={"/products/" + item.productId}>
                                    <Flex align="center" gap={12}>
                                    <CustomImage
                                        id={item.productPreviewImageId}
                                        name={item.productName}
                                        styles={{ borderRadius: 6, objectFit: "cover", width: 70, height: 70 }}
                                    />

                                    <Flex vertical>
                                        <Text strong>{item.productName}</Text>
                                        <Text type="secondary">
                                            Qty: {item.quantity}
                                        </Text>
                                    </Flex>
                                </Flex>
                                </Link>

                                <Flex vertical align="end">
                                    <Text>${item.productPrice}</Text>
                                    <Text type="secondary">
                                        Subtotal: ${item.subtotal}
                                    </Text>
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>

                    <Divider />

                    {/* TOTAL */}
                    <Flex justify="space-between" align="center">
                        <Text strong>Total</Text>
                        <Title level={5} style={{ margin: 0 }}>
                            ${order.totalPrice}
                        </Title>
                    </Flex>
                </Card>
            ))}
        </Flex>
    );
};