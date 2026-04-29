import { useResetPasswordMutation } from "../api/accountApiSlice.ts";
import { Button, Form, Input, Card, Typography, message } from "antd";
import { useSearchParams, useNavigate } from "react-router";
import { useState } from "react";

const { Title, Text } = Typography;

export const ResetPasswordPage = () => {
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);

    const email = searchParams.get("email") ?? "";
    const encodedToken = searchParams.get("encodedToken") ?? "";

    const onFinish = async (values: {
        newPassword: string;
        confirmPassword: string;
    }) => {
        try {
            await resetPassword({
                email,
                encodedToken,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
            }).unwrap();

            setSuccess(true);
            message.success("Password successfully reset");
        } catch {
            message.error("Failed to reset password. The link may be invalid or expired.");
        }
    };

    if (success) {
        return (
            <Card style={{ maxWidth: 420, margin: "80px auto", textAlign: "center" }}>
                <Title level={3}>Password updated ✅</Title>
                <Text type="secondary">
                    Your password has been successfully reset.
                </Text>

                <Button
                    type="primary"
                    style={{ marginTop: 20 }}
                    onClick={() => navigate("/auth")}
                >
                    Go to Login
                </Button>
            </Card>
        );
    }

    return (
        <Card style={{ maxWidth: 420, margin: "80px auto" }}>
            <Title level={3}>Reset your password</Title>
            <Text type="secondary">
                Enter a new password for your account.
            </Text>

            <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 20 }}>
                <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                        { required: true, message: "Please enter a new password" },
                        { min: 6, message: "Password must be at least 6 characters" },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Enter new password" />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["newPassword"]}
                    hasFeedback
                    rules={[
                        { required: true, message: "Please confirm your password" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("newPassword") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Passwords do not match"));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm new password" />
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={isLoading} block>
                    Reset Password
                </Button>
            </Form>
        </Card>
    );
};