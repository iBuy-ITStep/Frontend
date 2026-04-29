import { Flex, Image, Rate } from "antd";
import Title from "antd/lib/typography/Title";
import Text from "antd/es/typography/Text";
import { useImageByIdQuery } from "../api/imageApiSlice.ts";
import { Link } from "react-router";

interface ProductCardProps {
    id: number;
    imageId: string;
    title: string;
    description: string;
    price: number;
    rate: number;
}

export const ProductCard = ({ product }: { product: ProductCardProps }) => {
    const { data: imageUrl } = useImageByIdQuery(product.imageId);

    return (
        <Link
            to={"/products/" + product.id}
            style={{ textDecoration: "none" }}
        >
            <Flex
                vertical
                justify="space-between"
                style={{
                    width: "100%",
                    height: "100%",
                    background: "#fff",
                    borderRadius: 12,
                    padding: 12,
                    border: "1px solid #f0f0f0",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                }}
                className="product-card"
            >
                <div
                    style={{
                        width: "100%",
                        // height: 180,
                        overflow: "hidden",
                        borderRadius: 10,
                        marginBottom: 8,
                    }}
                >
                    <Image
                        src={imageUrl}
                        alt={product.title}
                        preview={false}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                        }}
                        className="product-image"
                    />
                </div>

                <Text strong style={{ fontSize: 14 }}>
                    {product.title.sliceIfMoreThen(40, "...")}
                </Text>

                <Text type="secondary" style={{ fontSize: 12 }}>
                    {product.description.sliceIfMoreThen(50, "...")}
                </Text>

                <Rate disabled defaultValue={product.rate} style={{ fontSize: 14 }} />

                <Title level={5} style={{ margin: 0 }}>
                    ${product.price}
                </Title>
            </Flex>

            <style>
                {`
                .product-card:hover {
                    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
                    transform: translateY(-3px);
                }

                .product-card:hover .product-image {
                    transform: scale(1.05);
                }
                `}
            </style>
        </Link>
    );
};