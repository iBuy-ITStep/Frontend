import { Button, Form, Input, Card, Typography, message } from "antd";
import { useState } from "react";
import {useForgotPasswordMutation} from "../api/accountApiSlice.ts";

const { Title, Text } = Typography;

export const ForgotPasswordPage = () => {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [forgotPassword] = useForgotPasswordMutation();
    const onFinish = async (values: { email: string }) => {
        setLoading(true);
        try {
            const clientUri = window.location.origin + "/reset-password";
            await forgotPassword({email: values.email, clientUri})
            setSent(true);
            message.success("Reset link sent to your email");
        } catch {
            message.error("Failed to send reset link");
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <Card style={{ maxWidth: 420, margin: "80px auto", textAlign: "center" }}>
                <Title level={3}>Check your email 📩</Title>
                <Text type="secondary">
                    We’ve sent a password reset link. Please check your inbox.
                </Text>
            </Card>
        );
    }

    return (
        <Card style={{ maxWidth: 420, margin: "80px auto" }}>
            <Title level={3}>Forgot password?</Title>
            <Text type="secondary">
                Enter your email and we’ll send you a reset link.
            </Text>

            <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 16 }}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter your email" },
                        { type: "email", message: "Invalid email format" },
                    ]}
                >
                    <Input placeholder="you@example.com" />
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={loading} block>
                    Send reset link
                </Button>
            </Form>
        </Card>
    );
};