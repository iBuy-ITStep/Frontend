import { useRegisterMutation } from "../api/accountApiSlice.ts";
import { Button, Form, Input, Modal, Typography } from "antd";
import { useNavigate } from "react-router";
import type { RegisterDto } from "../api/dto/RegisterDto.ts";
import type {ApiErrorResponse} from "../types/ApiErrorResponse.ts";

const { Text } = Typography;

export function RegisterForm() {
    const [register, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: RegisterDto) => {
            data.clientUri = window.location.origin + "/confirm-email";
            const result = await register(data);
            if (result?.error) {
                const error = result.error as ApiErrorResponse;
                Modal.error({
                    title: "Something went wrong",
                    content: error.data.map(e => `${e.description}\n`),
                });
            }else{
                Modal.success({
                    title: "📩 Check your email",
                    content: (
                        <>
                            <p>
                                We’ve sent you a confirmation link.
                            </p>
                            <Text type="secondary">
                                Please verify your email address to activate your account.
                            </Text>
                        </>
                    ),
                    okText: "Go to Login",
                    onOk: () => navigate("/auth"),
                });
            }
    };

    return (
        <>
            <Form
                name="register"
                layout="vertical"
                onFinish={onSubmit}
                style={{ width: "100%" }}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter your email" },
                        { type: "email", message: "Enter a valid email address" },
                    ]}
                >
                    <Input size="large" placeholder="you@example.com" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    hasFeedback
                    rules={[
                        { required: true, message: "Please enter your password" },
                        { min: 6, message: "Password must be at least 6 characters" },
                    ]}
                >
                    <Input.Password size="large" placeholder="Create a password" />
                </Form.Item>

                <Form.Item
                    name="passwordConfirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        { required: true, message: "Please confirm your password" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("Passwords do not match")
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password size="large" placeholder="Repeat your password" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        block
                        size="large"
                    >
                        Create Account
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}