import {
    Form,
    Input,
    InputNumber,
    Button,
    Select,
    message,
} from "antd";
import {useCreateProductMutation, useProductsQuery} from "../api/productApiSlice.ts";
import {useRowCategoriesQuery} from "../api/categoryApiSlice.ts";
import {useBrandsQuery} from "../api/brandApiSlice.ts";
import {selectCategoryAdapter} from "../features/adapters/categoryAdapter.ts";
import {selectBrandsAdapter} from "../features/adapters/brandAdapter.ts";

export const CreateProductForm = () => {
    const {data:categories} = useRowCategoriesQuery();
    const {data: brands} = useBrandsQuery();
    const {refetch} = useProductsQuery(undefined);
    const [form] = Form.useForm();
    const [createProduct, { isLoading }] = useCreateProductMutation();

    const onFinish = async (values: any) => {
        try {
            await createProduct({
                name: values.name,
                description: values.description,
                price: values.price,
                categoryId: values.categoryId,
                brandId: values.brandId,
                previewImageId: values.previewImageId,
            }).unwrap();

            message.success("Product created");
            form.resetFields();
            refetch()
        } catch (e) {
            message.error("Failed to create product");
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
        >
            {/* NAME */}
            <Form.Item
                name="name"
                label="Product Name"
                rules={[{ required: true }]}
            >
                <Input placeholder="MacBook Pro 15.4" />
            </Form.Item>

            {/* DESCRIPTION */}
            <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true }]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>

            {/* PRICE */}
            <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true }]}
            >
                <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
                name="previewImageId"
                label="Preview Image ID"
            >
                <Input style={{ width: "100%" }} />
            </Form.Item>

            {/* CATEGORY */}
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

            {/* SUBMIT */}
            <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
            >
                Create Product
            </Button>
        </Form>
    );
};