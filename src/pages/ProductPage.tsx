import {
    Carousel,
    Flex,
    Spin,
    Typography,
    Tag,
    Rate,
    Button,
    Divider, Progress, message,
} from "antd";
import { useParams } from "react-router";

import { useProductByIdQuery } from "../api/productApiSlice";
import { useImagesByProductIdQuery } from "../api/imageApiSlice";
import { CustomImage } from "../components/CustomImage.tsx";
import {ratesToAverageAdapter, totalCustomersRatings} from "../features/adapters/rateAdapter.ts";
import {useAddProductToCartMutation, useCartByUserQuery} from "../api/cartApiSlice.ts";
import {useAppSelector} from "../app/hooks.ts";
import {selectIsAuth} from "../app/slices/userSlice.ts";
import {useSetRateToProductMutation} from "../api/ratingApiSlice.ts";

const { Title, Text } = Typography;

export const ProductPage = () => {
    const { productId } = useParams();

    const { data: product, isLoading, refetch: refetchProduct } =
        useProductByIdQuery(Number(productId));

    const { data: images, isLoading: imagesLoading } =
        useImagesByProductIdQuery(Number(productId));

    const [addToProductToCart, {isLoading: addLoading}] = useAddProductToCartMutation();
    const {refetch} = useCartByUserQuery()
    const isAuth = useAppSelector(selectIsAuth)
    const [rateProduct] = useSetRateToProductMutation()
    const total = totalCustomersRatings(product) || 1;
    const ratings = [
        { label: "5", count: product?.rating5Count ?? 0 },
        { label: "4", count: product?.rating4Count ?? 0 },
        { label: "3", count: product?.rating3Count ?? 0 },
        { label: "2", count: product?.rating2Count ?? 0 },
        { label: "1", count: product?.rating1Count ?? 0 },
    ];

    const addToCart = async () => {
        if (!productId) return;
        await addToProductToCart({
            productId: Number(productId),
            quantity: 1,
        })
        refetch();
    }

    const handleRateChange = async (e: number) => {
        if(!productId) return;
        const result = await rateProduct({id: Number(productId), score: e})
        if(result?.error){
            message.info("Order a product before rate!")
        }
        await refetchProduct()
    }

    if (isLoading) {
        return (
            <Flex justify="center" align="center" style={{ height: "60vh" }}>
                <Spin size="large" />
            </Flex>
        );
    }

    return (
        <Flex
            gap={40}
            style={{
                width: "100%",
                padding: 24,
            }}
            align="flex-start"
        >
            <Flex style={{ width: 450 }} vertical>
                {imagesLoading ? (
                    <Spin />
                ) : (
                    <Carousel
                        arrows
                        dotPlacement="start"
                        style={{
                            background: "#ececec",
                            borderRadius: 8,
                            padding: 40,
                        }}
                    >
                        {images?.map((img) => (
                            <div key={img.id}>
                                <CustomImage id={img.id} name={img.originalFileName} styles={{borderRadius: 10}}/>
                            </div>
                        ))}
                    </Carousel>
                )}
            </Flex>

            <Flex vertical style={{ flex: 1 }} gap={12}>
                <Title level={2}>{product?.name}</Title>

                <Text type="secondary">
                    {product?.categoryName} / {product?.brandName}
                </Text>

                <Divider />

                <Title level={3} style={{ margin: 0 }}>
                    ${product?.price}
                </Title>

                {product?.inStock ? (
                    <Tag color="green">
                        In Stock ({product.stockQuantity})
                    </Tag>
                ) : (
                    <Tag color="red">Out of Stock</Tag>
                )}

                <Divider />

                <Text>{product?.description}</Text>

                <Divider />

                {/* RATING */}
                <Flex align="center" justify="space-between" gap={10}>
                    <Title level={2}>Customer Ratings</Title>
                    <Flex align="center" gap={15}>
                        <Rate
                            value={ratesToAverageAdapter(product)}
                            onChange={handleRateChange}

                        />
                        <Title level={5} >{ratesToAverageAdapter(product) > 0 ? ratesToAverageAdapter(product) : "No rating"}</Title>
                    </Flex>
                </Flex>
                <Flex
                    vertical
                    style={{
                        width: "100%",
                        background: "#fff",
                        padding: 16,
                        borderRadius: 12,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                    gap={12}
                >
                    {/* HEADER */}
                    <Title level={5} style={{ margin: 0 }}>
                        {total}{" "}
                        <Text type="secondary">customer ratings</Text>
                    </Title>

                    {/* RATINGS */}
                    {ratings.map((r) => {
                        const percent = Math.round((r.count / total) * 100);

                        return (
                            <Flex key={r.label} align="center" gap={10}>
                                <Text style={{ width: 50 }}>{r.label} ★</Text>

                                <Progress
                                    percent={percent}
                                    showInfo={false}
                                    strokeColor="#faad14"
                                    style={{ flex: 1 }}
                                />

                                <Text style={{ width: 40, textAlign: "right" }}>
                                    {percent}%
                                </Text>
                            </Flex>
                        );
                    })}
                </Flex>

                <Divider />

                <Flex gap={12}>
                    {isAuth ?
                        <>
                            <Button type="primary" size="large" onClick={addToCart} loading={addLoading} disabled={product?.stockQuantity == 0}>
                                Add to Cart
                            </Button>

                        </>
                    : <Title level={3}>Login to shopping</Title>
                    }
                </Flex>
            </Flex>
        </Flex>
    );
};