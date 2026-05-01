import {Button, Flex, Form, Input, Table } from "antd";
import {
    useCategoriesQuery,
    useCreateCategoryMutation, useDeleteCategoryMutation,
    useRowCategoriesQuery,
    useUpdateCategoryMutation
} from "../api/categoryApiSlice.ts";
import type {CategoryDto} from "../api/dto/CategoryDto.ts";
import {useState} from "react";
import {categoriesToDataTableAdapter} from "../features/adapters/categoryAdapter.ts";
import Title from "antd/lib/typography/Title";
import type {ColumnsType} from "antd/es/table";

type RecordCategoryType = {
    id: number;
    name: string;
    parentId: number;
    parentName?: string;
}

export const AdminCategoryPage = () => {
    const [createCategory, {isLoading}] = useCreateCategoryMutation();
    const [updateCategory, {isLoading: updateLoading}] = useUpdateCategoryMutation();
    const [deleteCategory, {isLoading: deleteLoading}] = useDeleteCategoryMutation();
    const {data, refetch} = useRowCategoriesQuery()
    const {refetch: categoryRefetch} = useCategoriesQuery();
    const [editingRow, setEditingRow] = useState<CategoryDto>();
    const onCreate = async (dto: CategoryDto) => {
        if (!dto.parentId) dto.parentId = 0;
        const result = await createCategory(dto)
        refetch()
        console.log("result", result)
    }
    const onUpdate = async (id: number) => {
        if(id === editingRow?.id){
            const result = await updateCategory(editingRow)
            refetch()
            categoryRefetch()
            console.log("result", result)
        }

    }

    const onDelete = async (id: number) => {
        const result = await deleteCategory(id)
        console.log("result", result)
        refetch()
        categoryRefetch()
    }

    const columns: ColumnsType<RecordCategoryType> = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            render: (_, record:RecordCategoryType  ) =>
            {
                return <Input value={record.name}
                              onChange={(e) => setEditingRow({...record, name: e.currentTarget.value})}
                />
            }
        },
        {
            title: "Parent ID",
            dataIndex: "parentId",
            render: (_:string, record:RecordCategoryType) =>
            {
                return <Input value={record.parentId}
                              onChange={(e) => setEditingRow({...record, parentId: Number(e.currentTarget.value)})}
                />
            },
            sorter: (a,b) => a.parentId - b.parentId,
            defaultSortOrder: "ascend",
        },
        {
            title: "Parent Name",
            dataIndex: "parentName",

        },
        {
            title: "Actions",
            dataIndex: "edit",
            render: (_:string, record: RecordCategoryType) =>
                <>
                    <Button type="primary" loading={updateLoading} onClick={() => onUpdate(record.id)}>Edit</Button>
                    <Button type="primary" loading={deleteLoading} onClick={() => onDelete(record.id)}>Delete</Button>
                </>
        }
    ]


    return <Flex vertical>
        <Title>Category Admin Page</Title>
        <Form name="category" onFinish={onCreate}>
            <Form.Item<Partial<CategoryDto>> name={"parentId"}>
                <Input placeholder="Parent Id"/>
            </Form.Item>
            <Form.Item<Partial<CategoryDto>>
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

        <Table<RecordCategoryType> columns={columns} dataSource={categoriesToDataTableAdapter(data ? data : [])} />

    </Flex>
}