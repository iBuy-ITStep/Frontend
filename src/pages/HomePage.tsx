import {CategoryRibbon} from "../components/CategoryRibbon.tsx";
import {Carousel, Col, Flex, Row} from "antd";
import {homeStyles} from "./css/HomeStyles.ts";
import {IbuySearch} from "../components/IbuySearch.tsx";
import {HomeCategoryRibbonCard} from "../components/HomeCategoryRibbonCard.tsx";
import anywhere from "../assets/images/home-anywhere.png"
import Text from "antd/es/typography/Text";
import {HomeExtendedCategoryRibbonCard} from "../components/HomeExtendedCategoryRibbonCard.tsx";
import {useEffect, useRef} from "react";
import { useInView } from "motion/react";
import {useDispatch} from "react-redux";
import {setSearchIsVisible} from "../app/slices/headerSlice.ts";
import {NewlyProductsCard} from "../components/NewlyProductsCard.tsx";
import {DealMediumBanner} from "../components/DealMediumBanner.tsx";
import {useCategoriesQuery} from "../api/categoryApiSlice.ts";
import {CustomImage} from "../components/CustomImage.tsx";
import {homeBannerImages} from "../data/images.ts";
import {useProductsQuery} from "../api/productApiSlice.ts";
/* TODO:
*   1. Add events images to carousel
*
* */

export const HomePage = () => {
    const searchRef = useRef(null);
    const isSearchInView = useInView(searchRef, { initial: true });
    const dispatch = useDispatch();

    const { data } = useCategoriesQuery();
    const { data: products } = useProductsQuery({ pageSize: 6 });

    useEffect(() => {
        dispatch(setSearchIsVisible(!isSearchInView));
    }, [isSearchInView]);

    return (
        <Flex vertical style={{ background: "#f5f5f5" }}>
            <CategoryRibbon />

            <Flex vertical>
                <Carousel autoplay arrows dots={false} style={{width:'90%', margin:'auto'}}>
                    {homeBannerImages.map((banner, i) => (
                        <div style={{width: "100%"}} key={i} >
                            <CustomImage id={banner} name={banner} styles={{borderRadius: 10}}/>
                        </div>
                    ))}
                </Carousel>

                <div ref={searchRef} style={homeStyles.search}>
                    <IbuySearch />
                </div>
            </Flex>

            <div style={{ margin: "40px auto", width: "100%" }}>
                <Carousel autoplay dots={false} slidesToShow={5}>
                    {data?.map((cat) => (
                        <HomeCategoryRibbonCard
                            key={cat.id}
                            text={cat.name}
                            styles={homeStyles.ribbonCard}
                            id={cat.id}
                        />
                    ))}
                </Carousel>
            </div>

            {/* BANNER */}
            <div style={{ position: "relative"}}>
                <Text style={homeStyles.anywhereText}>
                    International Shopping Platform for Imported Products Across Anywhere
                </Text>
                <img src={anywhere} style={{ width: "100%", borderRadius: 12 }} />
            </div>

            {/* EXTENDED CATEGORIES */}
            <div style={{ margin: "40px 0", width: "100%" }}>
                <Carousel autoplay slidesToShow={4} dots={false}>
                    {data
                        ?.filter((c) => c.children.length > 0)
                        .map((cat) => (
                            <HomeExtendedCategoryRibbonCard category={cat} key={cat.id} />
                        ))}
                </Carousel>
            </div>

            {/* 🔥 FIXED LAST GRID */}
            {products?.items && (
                <div
                    style={{
                        margin: "40px 20px",
                        background: "#fff",
                        padding: 20,
                        borderRadius: 16,
                    }}
                >
                    {/* HEADER */}
                    <Row justify="space-between" style={{ marginBottom: 16 }}>
                        <Col>
                            <Text strong style={{ fontSize: 18 }}>
                                Newly Launched Products
                            </Text>
                        </Col>
                        <Col>
                            <Text strong style={{ fontSize: 18 }}>
                                Explore More Deals
                            </Text>
                        </Col>
                    </Row>

                    {/* GRID */}
                    <Row gutter={[12, 12]}>
                        {/* LEFT GRID */}
                        <Col xs={24} md={12}>
                            <Row gutter={[12, 12]}>
                                {products.items.slice(0, 2).map((p, i) => (
                                    <Col span={12} key={i}>
                                        <NewlyProductsCard
                                            title={p.name}
                                            src={p.previewImageId ?? ""}
                                            description={p.description}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Col>

                        {/* RIGHT BIG BANNER */}
                        <Col xs={24} md={12}>
                            <DealMediumBanner />
                        </Col>
                    </Row>

                    {/* BOTTOM ROW */}
                    <Row gutter={[12, 12]} style={{ marginTop: 12 }}>
                        {products.items.slice(2, 6).map((p, i) => (
                            <Col xs={12} md={6} key={i}>
                                <NewlyProductsCard
                                    title={p.name}
                                    src={p.previewImageId ?? ""}
                                    description={p.description}
                                />
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
        </Flex>
    );
}