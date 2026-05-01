import {Button, Flex, message, Upload, InputNumber, Checkbox} from "antd";
import type { UploadProps } from "antd";
import { FaUpload } from "react-icons/fa6";
import { useState } from "react";
import {useAllImagesQuery, useUploadImageMutation, useUploadPreviewImageMutation} from "../api/imageApiSlice.ts";
import {useLazyProductByIdQuery, useUpdateProductMutation} from "../api/productApiSlice.ts";

export const UploadImage = () => {
    const [productId, setProductId] = useState<number | null>(null);
    const [uploadImage, { isLoading }] = useUploadImageMutation();
    const [uploadPreviewImage, { isLoading: isLoadingPreveiw }] = useUploadPreviewImageMutation();
    const [isPreview, setIsPreview] = useState(false);
    const {refetch} = useAllImagesQuery()
    const [trigger] = useLazyProductByIdQuery();
    const [updateProduct] = useUpdateProductMutation();
    const handleAction = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            if (isPreview) {

                const image = await uploadPreviewImage({file:formData, productId}).unwrap();
                if(productId) {
                    const data = await trigger(productId).unwrap();

                    if(data){
                       await updateProduct({
                            ...data,
                           newPreviewImageId: image.id,
                        }).unwrap();
                    }
                }
            }else{
                await uploadImage({file:formData, productId}).unwrap();
            }
            await refetch()
            message.success("Image uploaded successfully");
        } catch (error) {
            message.error("Upload failed");
        }
    };

    const uploadProps: UploadProps = {
        // beforeUpload может возвращать Upload.LIST_IGNORE,
        // чтобы файл не добавлялся в список, если ID не введен
        beforeUpload: (file) => {
            // Вызываем функцию загрузки сразу
            handleAction(file);

            return false; // Останавливаем стандартную отправку antd
        },
        showUploadList: false, // Скрываем список, так как загрузка мгновенная
    };

    return (
        <Flex vertical gap={12} style={{ maxWidth: 400, margin: "20px auto" }}>
            <InputNumber
                placeholder="Product ID"
                style={{ width: '100%' }}
                value={productId}
                onChange={(value) => setProductId(value)}
            />
            <Checkbox onChange={() => setIsPreview(!isPreview)}>Is Preview</Checkbox>
            <Upload {...uploadProps}>
                <Button
                    icon={<FaUpload />}
                    loading={isLoading && isLoadingPreveiw}
                >
                    {isLoading && isLoadingPreveiw ? "Uploading..." : "Select & Upload Image"}
                </Button>
            </Upload>
        </Flex>
    );
};
