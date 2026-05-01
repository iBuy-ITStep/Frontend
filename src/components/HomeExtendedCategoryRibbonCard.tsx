import {Flex} from "antd";
import Text from "antd/es/typography/Text";
import {hecrdStyles} from "./css/homeExtendedCategoryRibbonCardStyles.ts";
import type {Category} from "../types/Category.ts";
import {CategoryImagePreview} from "../widgets/CategoryImagePreview.tsx";

export const HomeExtendedCategoryRibbonCard = ({category} : { category: Category }) => {

    return (
        <Flex>
                <Flex vertical style={hecrdStyles.container} >
                    <Text style={{fontWeight: 700, fontSize: 18, marginBottom:10}}>{category.name}</Text>
                    <div style={hecrdStyles.divGrid}>
                        {category?.children.map((c, i) => (
                            <Flex key={i} vertical>
                               <CategoryImagePreview id={c.id} styles={hecrdStyles.cardImage} />
                                <Flex vertical>
                                <Text style={{fontWeight: 700}}>{c.name.sliceIfMoreThen(20, "...")}</Text>
                                </Flex>
                            </Flex>
                        ))}
                    </div>
                </Flex>
        </Flex>
    )
}

//cardImage