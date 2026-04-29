import { Flex } from "antd";
import Text from "antd/es/typography/Text";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router";

export const ShopCategoryCard = ({
                                     name,
                                     link,
                                 }: {
    name: string;
    link: number;
}) => {
    return (
        <Link
            to={`/category/${link}`}
            style={{ textDecoration: "none" }}
        >
            <Flex
                vertical
                justify="space-between"
                style={{
                    border: "1px solid #f0f0f0",
                    borderRadius: 12,
                    padding: 16,
                    width: 160,
                    height: 90,
                    background: "#fff",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                }}
                className="category-card"
            >
                <Text strong style={{ fontSize: 14 }}>
                    {name}
                </Text>

                <Flex justify="flex-end">
                    <FaChevronRight
                        size={14}
                        style={{
                            opacity: 0.6,
                            transition: "transform 0.2s ease",
                        }}
                        className="arrow"
                    />
                </Flex>
            </Flex>

            <style>
                {`
                .category-card:hover {
                    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
                    transform: translateY(-2px);
                }

                .category-card:hover .arrow {
                    transform: translateX(4px);
                    opacity: 1;
                }
                `}
            </style>
        </Link>
    );
};