import {Flex, Table, Typography, Card, Tag, Spin, Empty, Button} from "antd";
import { UploadImage } from "../widgets/UploadImage.tsx";
import type { ColumnsType } from "antd/es/table";
import type { ImageDetailsDto } from "../api/dto/ImageDetailsDto.ts";
import {useAllImagesQuery, useDeleteImageMutation} from "../api/imageApiSlice.ts";
import { CustomImage } from "../components/CustomImage.tsx";
import { useState } from "react";
import Text from "antd/es/typography/Text";

const { Title } = Typography;

export const AdminImagePage = () => {
    const { data: images, isLoading, refetch } = useAllImagesQuery();
    const [deleteImage] = useDeleteImageMutation();
    // 👉 pagination state
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(8);

    const columns: ColumnsType<ImageDetailsDto> = [
        {
            title: "ID",
            dataIndex: "id",
            width:200,
            render: (text, _) => <Text copyable>{text}</Text>
        },
        {
            title: "Preview",
            dataIndex: "isPreview",
            width: 120,
            render: (_, record) =>
                record.isPreview ? <Tag color="green">Yes</Tag> : <Tag>No</Tag>,
        },
        {
            title: "File Name",
            dataIndex: "originalFileName",
            ellipsis: true,
        },
        {
            title: "Uploaded",
            dataIndex: "uploadedAt",
            width: 200,
            render: (_, record) =>
                new Date(record.uploadedAt).toLocaleString(),
        },
        {
            title: "Image",
            width: 120,
            render: (_, record) => (
                <CustomImage
                    id={record.id}
                    name={record.originalFileName}
                />
            ),
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => <Button
                type="primary"
                danger
                onClick={async() => {
                    await deleteImage(record.id);
                    await refetch();
                }}
            >Delete</Button>
        }
    ];

    return (
        <Flex
            vertical
            gap={20}
            style={{
                padding: 24,
                maxWidth: 1200,
                margin: "0 auto",
            }}
        >
            <Title level={2} style={{ margin: 0 }}>
                Image Management
            </Title>

            {/* UPLOAD */}
            <Card
                title="Upload New Image"
                style={{ borderRadius: 12 }}
            >
                <UploadImage />
            </Card>

            {/* TABLE */}
            <Card
                title="All Images"
                style={{ borderRadius: 12 }}
            >
                {isLoading ? (
                    <Flex justify="center" align="center" style={{ height: 200 }}>
                        <Spin />
                    </Flex>
                ) : !images || images.length === 0 ? (
                    <Empty description="No images uploaded yet" />
                ) : (
                    <Table
                        columns={columns}
                        dataSource={images}
                        rowKey="id"
                        pagination={{
                            current,
                            pageSize,
                            total: images.length,
                            showSizeChanger: true,
                            pageSizeOptions: ["5", "8", "16", "32"],
                            onChange: (page, size) => {
                                setCurrent(page);
                                setPageSize(size);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            },
                        }}
                    />
                )}
            </Card>
        </Flex>
    );
};