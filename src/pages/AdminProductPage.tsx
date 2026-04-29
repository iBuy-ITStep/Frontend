import { useState } from "react";
import {
    Button,
    Divider,
    Flex,
    Table,
    Modal,
    Form,
    Input,
    InputNumber,
    message, Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";

import { CreateProductForm } from "../forms/CreateProductForm";
import {useProductsQuery, useSetStockQuantityMutation} from "../api/productApiSlice";
import {
    useDeleteProductMutation,
    useUpdateProductMutation,
} from "../api/productApiSlice";

import type { Product } from "../types/Product";
import {selectCategoryAdapter} from "../features/adapters/categoryAdapter.ts";
import {selectBrandsAdapter} from "../features/adapters/brandAdapter.ts";
import {useRowCategoriesQuery} from "../api/categoryApiSlice.ts";
import {useBrandsQuery} from "../api/brandApiSlice.ts";
import {UploadImage} from "../widgets/UploadImage.tsx";

export const AdminProductPage = () => {
    const { data, isLoading, refetch } = useProductsQuery(undefined);
    const {data:categories} = useRowCategoriesQuery();
    const {data: brands} = useBrandsQuery();
    const [deleteProduct] = useDeleteProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [setStock] = useSetStockQuantityMutation()
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [form] = Form.useForm();

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: "Delete product?",
            content: "This action cannot be undone.",
            okText: "Delete",
            okType: "danger",
            onOk: async () => {
                try {
                    await deleteProduct(id).unwrap();
                    refetch()
                    message.success("Product deleted");
                } catch {
                    message.error("Delete failed");
                }
            },
        });
    };


    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        form.setFieldsValue(product);
    };


    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            console.log(values);
            await updateProduct({
                id: editingProduct!.id,
                ...values,
            }).unwrap();

            await setStock({
                quantity: values!.stockQuantity,
                id: editingProduct!.id,
            }).unwrap();
            message.success("Product updated");
            setEditingProduct(null);
            refetch();
        } catch {
            message.error("Update failed");
        }
    };

    // 📊 TABLE COLUMNS
    const columns: ColumnsType<Product> = [
        { title: "ID", dataIndex: "id" },
        // {
        //     title: "Image",
        //     dataIndex: "previewImageId",
        //     render:  (_, record) => {
        //         if (record.previewImageId){
        //             // const result = trigger(record.previewImageId)
        //             // console.log(result)
        //         }
        //         return <>no</>
        //     }
        // },
        {
            title: "Name",
            dataIndex: "name",
            render: (_, record) =>  record.name.sliceIfMoreThen(40, "..."),
        },
        {
            title: "Description",
            dataIndex: "description",
            render: (_, record) =>  record.description.sliceIfMoreThen(40, "..."),
        },
        {
            title: "Price",
            dataIndex: "price",
            render: (_, record) => `$${record.price}`,
        },

        {
            title: "Category",
            render: (_, record) => record.categoryName,
        },
        {
            title: "Brand",
            render: (_, record) => record.brandName,
        },

        {
            title: "Created",
            dataIndex: "dateOfCreation",
            render: (value) =>
                value ? new Date(value).toLocaleDateString() : "-",
        },

        {
            title: "In Stock",
            dataIndex: "inStock",
            render: (_, record) => record.inStock ? "yes" : "no",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            render: (_, record) => record.stockQuantity
        },

        // ⚡ ACTIONS
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Flex gap={8}>
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>

                    <Button danger onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                </Flex>
            ),
        },
    ];

    return (
        <Flex gap={20}>

            {/* CREATE FORM */}
            <Flex vertical>
                <CreateProductForm />
                <UploadImage />
            </Flex>

            <Divider vertical />

            {/* TABLE */}
            <Table<Product>
                rowKey="id"
                loading={isLoading}
                columns={columns}
                dataSource={data?.items ?? []}
                style={{ width: "100%" }}
            />

            {/* EDIT MODAL */}
            <Modal
                open={!!editingProduct}
                title="Edit Product"
                onCancel={() => setEditingProduct(null)}
                onOk={handleUpdate}
                okText="Save"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Name">
                        <Input />
                    </Form.Item>

                    <Form.Item name="description" label="Description">
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <Form.Item name="price" label="Price">
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="categoryId"
                        label="Category"
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder="Select category"
                            options={selectCategoryAdapter(categories ?? [])}
                        />
                    </Form.Item>

                    {/* BRAND */}
                    <Form.Item
                        name="brandId"
                        label="Brand"
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder="Select brand"
                            options={selectBrandsAdapter(brands ?? [])}
                        />
                    </Form.Item>

                    <Form.Item
                        name="newPreviewImageId"
                        label="Preview Image ID"
                    >
                        <Input style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item name="stockQuantity" label="Quantity">
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                </Form>
            </Modal>
        </Flex>
    );
};