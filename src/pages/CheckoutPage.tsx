import {
    Button,
    Col,
    Divider,
    Flex,
    Form,
    Input,
    Radio,
    Row,
    Steps,
    Card,
    Typography,
} from "antd";
import { useState } from "react";
import {
    useCartByUserQuery,
    useCheckoutMutation, useOrdersByUserQuery,
} from "../api/cartApiSlice";
import {useNavigate} from "react-router";

const { Title, Text } = Typography;

const DeliveryOptions = ({
                             title,
                             text,
                             price,
                         }: {
    title: string;
    text: string;
    price: number;
}) => {
    return (
        <Flex justify="space-between" style={{ width: "100%" }}>
            <Flex vertical>
                <Text strong>{title}</Text>
                <Text type="secondary">{text}</Text>
            </Flex>

            <Text strong>${price.toFixed(2)}</Text>
        </Flex>
    );
};

export const CheckoutPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const { data,refetch } = useCartByUserQuery();
    const {refetch: orderRefetch} = useOrdersByUserQuery()
    const [shippingCost, setShippingCost] = useState(0);
    const [checkout] = useCheckoutMutation();
    const navigate = useNavigate();
    const fastOrder = (data?.totalPrice ?? 0) * 0.1
    const standardOrder = (data?.totalPrice ?? 0) * 0.05

    return (
        <Flex vertical style={{ width: "100%", padding: 24 }} gap={20}>
            {/* STEPS */}
            <Steps
                current={currentStep}
                items={[
                    { title: "Shipping" },
                    { title: "Delivery" },
                    { title: "Payment" },
                ]}
            />

            <Flex gap={24} align="flex-start" justify="space-between">
                {/* LEFT SIDE */}
                <Flex vertical style={{ width: "60%"}} gap={16}>
                    {/* STEP 1 */}
                    {currentStep === 0 && (
                        <Card>
                            <Title level={4}>Shipping Address</Title>
                            <Divider />

                            <Form layout="vertical">
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="Full Name">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Phone">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item label="Email">
                                    <Input />
                                </Form.Item>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="State">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Zip Code">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>

                            <Button
                                type="primary"
                                block
                                onClick={() => setCurrentStep(1)}
                            >
                                Continue
                            </Button>
                        </Card>
                    )}

                    {/* STEP 2 */}
                    {currentStep === 1 && (
                        <Card>
                            <Title level={4}>Shipping Method</Title>
                            <Divider />

                            <Radio.Group
                                style={{ width: "100%" }}
                                onChange={(e) => {
                                    setShippingCost(e.target.value)
                                }}
                                options={[
                                    {
                                        value: fastOrder,
                                        label: (
                                            <DeliveryOptions
                                                title="Express Shipping"
                                                text="5–9 business days"
                                                price={(data?.totalPrice ?? 0) * 0.1}
                                            />
                                        ),
                                    },
                                    {
                                        value: standardOrder,
                                        label: (
                                            <DeliveryOptions
                                                title="Standard Shipping"
                                                text="10–15 business days"
                                                price={(data?.totalPrice ?? 0) * 0.05}
                                            />
                                        ),
                                    },
                                ]}
                            />

                            <Divider />

                            <Button
                                type="primary"
                                block
                                onClick={() => setCurrentStep(2)}
                            >
                                Continue
                            </Button>
                        </Card>
                    )}

                    {/* STEP 3 */}
                    {currentStep === 2 && (
                        <Card>
                            <Title level={4}>Payment</Title>
                            <Divider />

                            <Form layout="vertical">
                                <Form.Item label="Card Number" name="cardNumber">
                                    <Input placeholder="1234 5678 9012 3456" />
                                </Form.Item>

                                <Form.Item label="Card Holder" name="cardHolder">
                                    <Input />
                                </Form.Item>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="Expiry">
                                            <Input placeholder="MM/YY" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="CVV">
                                            <Input.Password />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Button
                                    type="primary"
                                    block
                                    onClick={async () => {
                                        await checkout()
                                        refetch()
                                        orderRefetch()
                                        navigate("/orders")
                                    }}
                                >
                                    Pay Now
                                </Button>
                            </Form>
                        </Card>
                    )}
                </Flex>

                {/* RIGHT SIDE - SUMMARY */}
                <Card style={{ width: 320 }} title="Order Summary">
                    <Flex justify="space-between">
                        <Text>Subtotal</Text>
                        <Text>${data?.totalPrice ?? 0}</Text>
                    </Flex>

                    <Flex justify="space-between">
                        <Text>Shipping</Text>
                        <Text>${shippingCost}</Text>
                    </Flex>


                    <Flex justify="space-between" align="end">
                        <Title level={5}>Grand Total</Title>
                        <Title level={5}>
                            ${(data?.totalPrice ?? 0) + shippingCost}
                        </Title>
                    </Flex>
                </Card>
            </Flex>
        </Flex>
    );
};