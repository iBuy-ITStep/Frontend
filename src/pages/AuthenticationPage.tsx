import { ConfigProvider, Divider, Flex, Radio, Card, Typography } from "antd";
import { useState } from "react";
import { authenticationPageStyles } from "./css/AuthenticationPage.ts";
import { LoginForm } from "../forms/LoginForm.tsx";
import { RegisterForm } from "../forms/RegisterForm.tsx";

const { Title, Text } = Typography;

export const AuthenticationPage = () => {
    const [mode, setMode] = useState<"login" | "register">("login");

    const handleModeChange = (e: any) => {
        setMode(e.target.value);
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#fa8c16", // orange tone
                },
                components: {
                    Radio: {
                        buttonSolidCheckedBg: "#fa8c16",
                        buttonSolidCheckedHoverBg: "#ffa940",
                    },
                },
            }}
        >
            <Flex style={authenticationPageStyles.container} align="center" justify="center">
                <Card
                    style={{
                        width: 900,
                        borderRadius: 16,
                        overflow: "hidden",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    }}
                    bodyStyle={{ padding: 0 }}
                >
                    <Flex>
                        {/* LEFT SIDE (FORM) */}
                        <Flex
                            vertical
                            style={{ flex: 1, padding: 40 }}
                            justify="center"
                        >
                            <Title level={3} style={{ marginBottom: 4 }}>
                                {mode === "login" ? "Welcome back 👋" : "Create your account 🚀"}
                            </Title>

                            <Text type="secondary" style={{ marginBottom: 24 }}>
                                {mode === "login"
                                    ? "Log in to continue shopping and manage your account."
                                    : "Join IBUY today and start exploring amazing deals."}
                            </Text>

                            <Radio.Group
                                onChange={handleModeChange}
                                value={mode}
                                optionType="button"
                                buttonStyle="solid"
                                style={{
                                    marginBottom: 24,
                                    width: "100%",
                                }}
                            >
                                <Radio.Button value="login" style={{ width: "50%", textAlign: "center" }}>
                                    Login
                                </Radio.Button>
                                <Radio.Button value="register" style={{ width: "50%", textAlign: "center" }}>
                                    Register
                                </Radio.Button>
                            </Radio.Group>

                            {mode === "login" ? <LoginForm /> : <RegisterForm />}

                            <Text style={{ marginTop: 24, textAlign: "center" }}>
                                {mode === "login" ? (
                                    <>
                                        Don’t have an account?{" "}
                                        <a onClick={() => setMode("register")}>Sign up</a>
                                    </>
                                ) : (
                                    <>
                                        Already have an account?{" "}
                                        <a onClick={() => setMode("login")}>Log in</a>
                                    </>
                                )}
                            </Text>
                        </Flex>

                        {/* RIGHT SIDE (INFO PANEL) */}
                        <Divider vertical style={{ height: "auto" }} />

                        <Flex
                            vertical
                            justify="center"
                            style={{
                                flex: 1,
                                padding: 40,
                                background: "#fff7e6",
                            }}
                        >
                            <Title level={2} style={{ marginBottom: 16 }}>
                                IBUY
                            </Title>

                            <Text style={{ marginBottom: 16 }}>
                                Your one-stop marketplace for everything you need.
                            </Text>

                            <Text type="secondary">
                                • Discover great deals daily
                                <br />
                                • Secure and fast checkout
                                <br />
                                • Track your orders
                                <br />
                                • Personalized recommendations
                            </Text>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        </ConfigProvider>
    );
};