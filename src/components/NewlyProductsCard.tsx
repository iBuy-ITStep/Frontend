import { TbRosetteDiscountFilled } from "react-icons/tb";
import {Flex} from "antd";
import {newlyProductsCardStyle} from "./css/newlyProductsCardStyle.ts";
import Text from "antd/es/typography/Text";
import {CustomImage} from "./CustomImage.tsx";

export const NewlyProductsCard = ({src, title, description}: {src: string, title: string, description: string}) => {
    return (
        <Flex vertical justify="space-between" align="start" style={newlyProductsCardStyle.container} gap={6}>
            <TbRosetteDiscountFilled color={"red"} size={25} />
            <CustomImage id={src} name={src} styles={{...newlyProductsCardStyle.image}}/>
            <Text style={newlyProductsCardStyle.title}>{title.sliceIfMoreThen(40)}</Text>
            <Text>{description.sliceIfMoreThen(40)}</Text>
        </Flex>
    )
}