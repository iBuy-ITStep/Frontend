import {useImageByIdQuery} from "../api/imageApiSlice.ts";
import {Image} from "antd";
import type {CSSProperties} from "react";

export type ProductImageProps = {
    id: string
    name: string
    styles?: CSSProperties
}

export const CustomImage = ({id, name, styles}: ProductImageProps) => {
    const {data: imageUrl} = useImageByIdQuery(id);
    return (
        <Image src={imageUrl} style={styles} alt={name} preview={false} />
    )
}