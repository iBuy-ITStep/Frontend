import {Button, Flex, Form, Input, Table } from "antd";
import {useState} from "react";
import Title from "antd/lib/typography/Title";
import type {ColumnsType} from "antd/es/table";
import {
    useBrandsQuery,
    useCreateBrandMutation,
    useDeleteBrandMutation,
    useUpdateBrandMutation
} from "../api/brandApiSlice.ts";
import type {BrandDto} from "../api/dto/BrandDto.ts";

export const AdminBrandPage = () => {
    const [createBrand, {isLoading}] = useCreateBrandMutation();
    const [updateBrand, {isLoading: updateLoading}] = useUpdateBrandMutation();
    const [deleteBrand, {isLoading: deleteLoading}] = useDeleteBrandMutation();
    const {data, refetch} = useBrandsQuery()
    const [editingRow, setEditingRow] = useState<BrandDto>();
    const onCreate = async (dto: BrandDto) => {
        const result = await createBrand(dto)
        refetch()
        console.log("result", result)
    }
    const onUpdate = async (id: number) => {
        if(id === editingRow?.id){
            const result = await updateBrand(editingRow)
            refetch()
            console.log("result", result)
        }

    }

    const onDelete = async (id: number) => {
        const result = await deleteBrand(id)
        console.log("result", result)
        refetch()
    }

    const columns: ColumnsType<BrandDto> = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            render: (_, record:BrandDto  ) =>
            {
                const isEditing = editingRow?.id === record.id;
                return <Input value={isEditing ? editingRow?.name : record.name}
                              onChange={(e) => setEditingRow({...record, name: e.target.value})}
                />
            }
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (_, record: BrandDto) =>
                <>
                    <Button type="primary" loading={updateLoading} onClick={() => onUpdate(record.id!)}>Edit</Button>
                    <Button type="primary" loading={deleteLoading} onClick={() => onDelete(record.id!)}>Delete</Button>
                </>
        }
    ]


    return <Flex vertical>
        <Title>Brand Admin Page</Title>
        <Form name="brand" onFinish={onCreate}>
            <Form.Item<BrandDto>
                name={"name"}
                rules={[{required: true, message: "Name is required"}]}
            >
                <Input placeholder="Name"/>
            </Form.Item>
            <Form.Item label={null}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>

        <Table<BrandDto> columns={columns} dataSource={data} />

    </Flex>
}