import { useEffect, useState } from "react";
import { Card, Typography, Button, Result, Spin } from "antd";
import { MailOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useConfirmEmailMutation } from "../api/accountApiSlice.ts";
import { useSearchParams } from "react-router";

const { Title, Text } = Typography;

export const ConfirmEmailPage = () => {
    const [confirmEmail] = useConfirmEmailMutation();
    const [searchParams] = useSearchParams();

    const encodedToken = searchParams.get("encodedToken");
    const email = searchParams.get("email");

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleConfirm = async () => {
        setStatus("loading");
        try {
            await confirmEmail({
                email: email ?? "",
                encodedToken: encodedToken ?? "",
            }).unwrap();

            setStatus("success");
        } catch {
            setStatus("error");
        }
    };

    useEffect(() => {
        if (email && encodedToken) {
            handleConfirm();
        }
    }, [email, encodedToken]);

    const renderContent = () => {
        if (status === "loading") {
            return (
                <div style={{ textAlign: "center" }}>
                    <Spin size="large" />
                    <Text style={{ display: "block", marginTop: 16 }}>
                        Confirming your email...
                    </Text>
                </div>
            );
        }

        if (status === "success") {
            return (
                <Result
                    status="success"
                    icon={<CheckCircleOutlined />}
                    title="Email Confirmed!"
                    subTitle="Your email has been successfully verified. You can now log in."
                    extra={
                        <Button type="primary" href="/auth">
                            Go to Login
                        </Button>
                    }
                />
            );
        }

        if (status === "error") {
            return (
                <Result
                    status="error"
                    icon={<CloseCircleOutlined />}
                    title="Confirmation Failed"
                    subTitle="The confirmation link is invalid or expired."
                    extra={
                        <Button type="primary" onClick={handleConfirm}>
                            Try Again
                        </Button>
                    }
                />
            );
        }

        return (
            <div style={{ textAlign: "center" }}>
                <MailOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                <Title level={3}>Confirm Your Email</Title>
                <Text type="secondary">
                    Click the button below to verify your email address.
                </Text>
                <div style={{ marginTop: 24 }}>
                    <Button type="primary" size="large" onClick={handleConfirm}>
                        Confirm Email
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <div
            style={{
                minHeight: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f5f5",
                padding: 16,
            }}
        >
            <Card
                style={{
                    maxWidth: 420,
                    width: "100%",
                    borderRadius: 12,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
            >
                {renderContent()}
            </Card>
        </div>
    );
};