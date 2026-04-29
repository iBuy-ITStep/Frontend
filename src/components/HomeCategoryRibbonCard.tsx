import {Avatar, Flex} from "antd";
import Text from "antd/es/typography/Text";
import type {CSSProperties} from "react";
import {Link} from "react-router";
import {CategoryImagePreview} from "../widgets/CategoryImagePreview.tsx";

export const HomeCategoryRibbonCard =
    ({text, styles, id}: {text: string,id: number, styles?: CSSProperties}) =>
    {
    return (
        <Link to={`/category/${id}`}>
            <Flex vertical style={{...styles, margin: 4}} align="center" gap={5}>
                <Avatar icon={<CategoryImagePreview id={id} />} size={100} style={{padding: 10, backgroundColor: "white"}} />
                <Text style={{fontSize: 21}}>{text}</Text>
            </Flex>
        </Link>)
}