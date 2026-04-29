import {
    Button,
    Flex,
    InputNumber,
    Spin,
    Typography,
} from "antd";
import {
    useCartByUserQuery,
    useRemoveProductFromCartMutation,
    useSetProductCartQuantityMutation,
} from "../api/cartApiSlice";
import { CustomImage } from "./CustomImage.tsx";
import type { ProductCart } from "../types/ProductCart";
import { useProductToolTipQuery } from "../api/productApiSlice";

const { Title, Text } = Typography;

export const CartProductCard = ({ cart }: { cart: ProductCart }) => {
    const [setProductCartQuantity] = useSetProductCartQuantityMutation();
    const [removeProductCart, { isLoading: removeLoading }] =
        useRemoveProductFromCartMutation();

    const { refetch } = useCartByUserQuery();
    const { data: tooltip, isLoading: tooltipLoading } =
        useProductToolTipQuery(cart.productId);

    const setQuantity = (value: number | null) => {
        if (!value) return;

        setProductCartQuantity({
            productId: cart.productId,
            quantity: value,
        });

        refetch();
    };

    const removeProduct = async () => {
        await removeProductCart(cart.productId);
        await refetch();
    };

    if (tooltipLoading) {
        return (
            <Flex justify="center" align="center" style={{ height: 120 }}>
                <Spin />
            </Flex>
        );
    }

    return (
        <Flex
            align="center"
            justify="space-between"
            style={{
                padding: 16,
                border: "1px solid #f0f0f0",
                borderRadius: 8,
                marginBottom: 12,
                background: "#fff",
            }}
        >
            {/* LEFT: IMAGE */}
            <CustomImage
                id={cart.productPreviewImageId}
                name={cart.productName}
                styles={{
                    width: 100,
                    height: 100,
                    objectFit: "contain",
                }}
            />

            {/* CENTER: INFO */}
            <Flex vertical style={{ flex: 1, marginLeft: 16 }}>
                <Text type="secondary">
                    {tooltip?.categoryName} / {tooltip?.brandName}
                </Text>

                <Title level={5} style={{ margin: 0 }}>
                    {cart.productName}
                </Title>

                <Button
                    type="default"
                    danger
                    onClick={removeProduct}
                    loading={removeLoading}
                    style={{ width: "fit-content" }}
                >
                    Remove
                </Button>
            </Flex>

            {/* RIGHT: PRICE + QUANTITY */}
            <Flex
                vertical
                align="flex-end"
                gap={8}
                style={{ minWidth: 120 }}
            >
                <Text strong>${cart.productPrice}</Text>

                <InputNumber
                    value={cart.quantity}
                    min={1}
                    onChange={setQuantity}
                />
            </Flex>
        </Flex>
    );
};