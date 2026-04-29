import {
    Checkbox,
    Col,
    Flex, Pagination, type PaginationProps,
    Row, Spin,
} from "antd";
import Title from "antd/lib/typography/Title";
import Text from "antd/es/typography/Text";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { PriceRange } from "../widgets/PriceRange";
import { ShopCategoryCard } from "../components/ShopCategoryCard";
import { ProductCard } from "../components/ProductCard";
import { CategoryBreadCrumb } from "../widgets/CategoryBreadCrumb";

import { useCategoriesQuery } from "../api/categoryApiSlice";
import {useProductsQuery} from "../api/productApiSlice";

import type { Category } from "../types/Category";
import type { Product } from "../types/Product";
import type { Brand } from "../types/Brand";

import { findCategoryById } from "../shared/tools/search";
import { mapBrandByProducts } from "../shared/tools/map";
import type {ProductQuery} from "../api/dto/ProductQuery.ts";
import {ratesToAverageAdapter} from "../features/adapters/rateAdapter.ts";

export const CategoriesPage = () => {

    const { data: categories, isLoading } = useCategoriesQuery();
    const { categoryId } = useParams();
    const [queryOptions, setQueryOptions] = useState<ProductQuery>({
        categoryId: Number(categoryId),
        currentPage: 1,
    });
    const { data: products, isLoading: productsLoading} = useProductsQuery(queryOptions);
    const [selectedCategory, setSelectedCategory] =
        useState<Category | undefined>();

    const brands = mapBrandByProducts(products?.items ?? []);

    const [selectedBrands, setSelectedBrands] = useState<Brand[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const [priceBounds, setPriceBounds] = useState<{
        min: number;
        max: number;
    }>();

    const [selectedPrice, setSelectedPrice] = useState<[number, number]>([0, 0]);

    const setProductPriceRange = () => {
        if (products?.items?.length) {
            const min = Math.min(...products.items.map((p) => p.price));
            const max = Math.max(...products.items.map((p) => p.price));

            setPriceBounds({ min, max });
            setSelectedPrice([min, max]);
        }
    };

    const applyFilters = (
        brands: Brand[],
        price: [number, number]
    ) => {
        return (products?.items ?? []).filter((p) => {
            const inBrand =
                brands.length === 0 ||
                brands.some((b) => b.id === p.brandId);

            const inPrice =
                p.price >= price[0] && p.price <= price[1];

            return inBrand && inPrice;
        });
    };

    const onPaginationChange : PaginationProps["onChange"] = async (pageNumber, size) => {
       setQueryOptions({
           ...queryOptions,
           currentPage: pageNumber,
           pageSize: size,
       })
    }
    useEffect(() => {
        if (products?.items) {
            setFilteredProducts(products.items);
            setProductPriceRange();
        }
    }, [products]);

    useEffect(() => {
        if (!isLoading && categories) {
            const found = findCategoryById(
                categories,
                Number(categoryId)
            );
            setSelectedCategory(found);
        }
    }, [categoryId, categories, isLoading]);
    // update product on categoryId changed
    useEffect(() => {
        setQueryOptions(prev => ({
            ...prev,
            categoryId: Number(categoryId),
        }))
    }, [categoryId]);

    const onBrandChanged = (id: number) => {
        setSelectedBrands((prev) => {
            const exists = prev.some((b) => b.id === id);

            const updated = exists
                ? prev.filter((b) => b.id !== id)
                : [...prev, brands.find((b) => b.id === id)!];

            setFilteredProducts(applyFilters(updated, selectedPrice));

            return updated;
        });
    };

    useEffect(() => {
        setFilteredProducts(applyFilters(selectedBrands, selectedPrice));
    }, [selectedPrice]);

    return (
        <Flex style={{ width: "100%", height: "100%", padding: 16, gap: 16 }} align="stretch">

            {/* LEFT PANEL */}
            {isLoading ? (
                <Flex style={{ width: 260 }} align="center" justify="center">
                    <Spin description="Loading filters..." />
                </Flex>
            ) : (
                <Flex
                    vertical
                    style={{
                        width: 260,
                        padding: 16,
                        background: "#fff",
                        borderRadius: 12,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                        height: "fit-content",
                    }}
                    gap={16}
                >
                    {/* PRICE */}
                    <Flex vertical gap={8}>
                        <Text strong style={{ fontSize: 14 }}>
                            Price Range
                        </Text>

                        {priceBounds && (
                            <PriceRange
                                min={priceBounds.min}
                                max={priceBounds.max}
                                value={selectedPrice}
                                onChange={setSelectedPrice}
                            />
                        )}
                    </Flex>

                    {/* BRANDS */}
                    <Flex vertical gap={8}>
                        <Text strong style={{ fontSize: 14 }}>
                            Brands
                        </Text>

                        <Flex vertical style={{ maxHeight: 200, overflowY: "auto" }}>
                            {brands.map((brand) => (
                                <Checkbox
                                    key={brand.id}
                                    onChange={() => onBrandChanged(brand.id)}
                                    style={{ marginBottom: 6 }}
                                >
                                    {brand.name}
                                </Checkbox>
                            ))}
                        </Flex>
                    </Flex>
                </Flex>
            )}

            <Flex vertical style={{ flex: 1, gap: 16 }}>

                {selectedCategory && (
                    <CategoryBreadCrumb
                        categories={categories ?? []}
                        current={selectedCategory}
                    />
                )}

                <Title level={2} style={{ margin: 0 }}>
                    {selectedCategory?.name}
                </Title>

                {/* SUBCATEGORIES */}
                {selectedCategory && selectedCategory?.children?.length > 0 && (
                    <Flex gap={12} wrap="wrap">
                        {selectedCategory.children.map((c) => (
                            <ShopCategoryCard
                                key={c.id}
                                name={c.name}
                                link={c.id}
                            />
                        ))}
                    </Flex>
                )}

                {
                    productsLoading ? (<Flex style={{minHeight: 300}} align="center" justify="center">
                    <Spin description="Loading products..."/>
                </Flex>
                    ) : (
                    <Row gutter={[16, 16]}>
                {filteredProducts.map((product) => (
                    <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                        <ProductCard
                            product={{
                                id: product.id,
                                imageId: product.previewImageId ?? "",
                                title: product.name,
                                description: product.description,
                                price: product.price,
                                rate: ratesToAverageAdapter(product),
                            }}
                        />
                    </Col>
                ))}
            </Row>
            )}

                {/* PAGINATION */}
                {products && (
                    <Flex justify="center" style={{ marginTop: 16 }}>
                        <Pagination
                            showSizeChanger
                            defaultCurrent={products.currentPage}
                            total={products.pageSize * products.totalPages}
                            defaultPageSize={products.pageSize}
                            onChange={onPaginationChange}
                            pageSizeOptions={["5", "10", "25", "50", "100"]}
                        />
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
};