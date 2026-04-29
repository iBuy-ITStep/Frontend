import type { ProductCart } from "../types/ProductCart";
import {
    Button,
    Flex,
    InputNumber,
    Typography,
} from "antd";
import { CustomImage } from "./CustomImage.tsx";
import {
    useCartByUserQuery,
    useRemoveProductFromCartMutation,
    useSetProductCartQuantityMutation,
} from "../api/cartApiSlice";

const { Text } = Typography;

export const ProductCartDrawerCard = ({
                                          cart,
                                      }: {
    cart: ProductCart;
}) => {
    const [setProductCartQuantity] = useSetProductCartQuantityMutation();
    const [removeProductCart, { isLoading: removeLoading }] =
        useRemoveProductFromCartMutation();

    const { refetch } = useCartByUserQuery();

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

    return (
        <Flex
            gap={12}
            style={{
                padding: 12,
                borderBottom: "1px solid #f0f0f0",
            }}
        >
            {/* IMAGE */}
            <CustomImage
                id={cart.productPreviewImageId}
                name={cart.productName}
                styles={{
                    width: 70,
                    height: 70,
                    objectFit: "contain",
                }}
            />

            {/* INFO */}
            <Flex vertical style={{ flex: 1 }} gap={4}>
                {/* NAME */}
                <Text strong style={{ lineHeight: 1.2 }}>
                    {cart.productName}
                </Text>

                {/* PRICE */}
                <Text type="secondary">
                    ${cart.productPrice}
                </Text>

                {/* QUANTITY + REMOVE */}
                <Flex justify="space-between" align="center">
                    <InputNumber
                        size="small"
                        value={cart.quantity}
                        min={1}
                        onChange={setQuantity}
                    />

                    <Button
                        type="default"
                        danger
                        size="small"
                        loading={removeLoading}
                        onClick={removeProduct}
                    >
                        Remove
                    </Button>
                </Flex>

                {/* TOTAL */}
                <Text strong>
                    Total: ${(cart.productPrice * cart.quantity).toFixed(2)}
                </Text>
            </Flex>
        </Flex>
    );
};