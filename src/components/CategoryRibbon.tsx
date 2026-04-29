import { Button, Flex } from "antd";
import { useState } from "react";
import { useCategoriesQuery } from "../api/categoryApiSlice.ts";
import type { Category } from "../types/Category.ts";
import { categoryRibbon } from "./css/categoryRibbon.ts";
import { CategoryNode } from "./CategoryNode.tsx";

export const CategoryRibbon = () => {
    const [open, setOpen] = useState(true);
    const [currentCategory, setCurrentCategory] = useState<Category | undefined>(undefined);
    const { data, isLoading } = useCategoriesQuery();

    const onCategoryHover = (category: Category) => {
        setOpen(true);
        setCurrentCategory(category);
    };

    return (
        <Flex
            vertical
            style={{
                position: "relative",
                background: "#fff",
                borderBottom: "1px solid #f0f0f0",
            }}
            onMouseLeave={() => setOpen(false)}
        >
            {/* TOP CATEGORY BAR */}
            <Flex
                style={{
                    padding: "8px 12px",
                    gap: 4,
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                }}
            >
                {!isLoading &&
                    data?.map((item) => {
                        const active = currentCategory?.id === item.id;

                        return (
                            <Button
                                key={item.id}
                                type="text"
                                onMouseEnter={() => onCategoryHover(item)}
                                style={{
                                    borderRadius: 6,
                                    padding: "4px 10px",
                                    background: active ? "#fff7e6" : "transparent",
                                    color: active ? "#fa8c16" : undefined,
                                    fontWeight: active ? 600 : 400,
                                    transition: "all 0.2s ease",
                                }}
                            >
                                {item.name}
                            </Button>
                        );
                    })}
            </Flex>

            {open && currentCategory && (
                <div
                    style={{
                        height: 2,
                        background: "#fa8c16",
                        width: "100%",
                        transition: "0.2s",
                    }}
                />
            )}

            {open && currentCategory && currentCategory?.children?.length > 0 && (
                <div
                    style={{
                        ...categoryRibbon.subCategoriesDiv,
                        background: "#fff",
                        padding: 16,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                        borderRadius: 8,
                        marginTop: 8,
                    }}
                >
                    <CategoryNode categories={currentCategory.children} />
                </div>
            )}
        </Flex>
    );
};