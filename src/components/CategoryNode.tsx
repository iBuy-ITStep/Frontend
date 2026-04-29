import { Flex } from "antd";
import { type CSSProperties, useState } from "react";
import Text from "antd/es/typography/Text";
import type { Category } from "../types/Category.ts";
import { Link } from "react-router";
import { FaChevronRight } from "react-icons/fa6";

export const CategoryNode = ({
                                 categories,
                                 styles,
                             }: {
    categories: Category[] | undefined;
    styles?: CSSProperties;
}) => {
    const [activeCategory, setActiveCategory] = useState<Category | null>(null);

    return (
        <Flex style={{ position: "relative" ,...styles }} >
            <Flex vertical style={{ minWidth: 220, borderRight: "1px solid #f0f0f0" }}>
                {categories?.map((category) => {
                    const isActive = activeCategory?.id === category.id;
                    const hasChildren = category.children?.length > 0;

                    return (
                        <Link
                            key={category.id}
                            to={`/category/${category.id}`}
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                            onMouseEnter={() => setActiveCategory(category)}
                        >
                            <Flex
                                align="center"
                                justify="space-between"
                                style={{
                                    padding: "10px 16px",
                                    cursor: "pointer",
                                    background: isActive ? "#fafafa" : "transparent",
                                    transition: "all 0.2s ease",
                                    borderLeft: isActive ? "3px solid #fa8c16" : "3px solid transparent",
                                }}
                            >
                                <Text strong={isActive}>{category.name}</Text>

                                {hasChildren && (
                                    <FaChevronRight
                                        size={12}
                                        style={{
                                            opacity: isActive ? 1 : 0.4,
                                            transition: "0.2s",
                                        }}
                                    />
                                )}
                            </Flex>
                        </Link>
                    );
                })}
            </Flex>

            {activeCategory && activeCategory.children?.length > 0 && (
                <Flex
                    vertical
                    style={{
                        minWidth: 240,
                        padding: 12,
                        background: "#ffffff",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    }}
                    onMouseLeave={() => setActiveCategory(null)}
                >
                    <CategoryNode categories={activeCategory.children} />
                </Flex>
            )}
        </Flex>
    );
};