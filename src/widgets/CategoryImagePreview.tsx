import {useProductsQuery} from "../api/productApiSlice.ts";
import {CustomImage} from "../components/CustomImage.tsx";
import type {CSSProperties} from "react";
import { BiCategory } from "react-icons/bi";
import {Spin} from "antd";
export const CategoryImagePreview = ({id, styles}: {id: number, styles? :CSSProperties}) => {
    const {data, isLoading} = useProductsQuery({
        categoryId: id,
        pageSize: 1,
    })

    if(isLoading){
        return <Spin />
    }

    return (
    <>
        {data && data?.items.length > 0 ?
            <CustomImage id={data.items[0].previewImageId ?? ""} name={data.items[0].categoryName} styles={styles}/>
           : <BiCategory />
        }
    </>
    )
}