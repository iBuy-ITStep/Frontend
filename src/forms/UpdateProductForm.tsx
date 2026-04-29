import {Form, type FormInstance, Input, InputNumber} from "antd";
import type {ProductDto} from "../api/dto/ProductDto.ts";

export const UpdateProductForm = ({form}: {form: FormInstance<ProductDto["items"]>} ) => {
    return <Form form={form} layout="vertical">
        <Form.Item name="name" label="Name">
            <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item name="price" label="Price">
            <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="quantity" label="Quantity">
            <InputNumber style={{ width: "100%" }} />
        </Form.Item>
    </Form>
}