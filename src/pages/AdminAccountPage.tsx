import {
    useCreateNewUserMutation,
    useDeleteUserMutation,
    useRolesQuery,
    useUpdateUserEmailMutation,
    useUpdateUserRolesMutation,
    useUsersQuery,
} from "../api/adminApiSlice";

import {
    Button,
    Card,
    Flex,
    Form,
    Input,
    message,
    Select,
    Space,
    Table,
    Tag,
} from "antd";

import Title from "antd/lib/typography/Title";
import type {ColumnsType} from "antd/es/table";
import type {RegisterDto} from "../api/dto/RegisterDto";
import type {AdminUser} from "../types/AdminUser";
import { useState } from "react";
import type {Role} from "../types/Role.ts";

export const AdminAccountPage = () => {
    const { data: users, isLoading , refetch: usersRefetch} = useUsersQuery();
    const { data: roles } = useRolesQuery();

    const [createUser] = useCreateNewUserMutation();
    const [updateEmail] = useUpdateUserEmailMutation();
    const [updateRoles] = useUpdateUserRolesMutation();
    const [deleteUser] = useDeleteUserMutation();

    const [editingEmail, setEditingEmail] = useState<Record<string, string>>({});
    // ✅ create user
    const onCreate = async (dto: Partial<RegisterDto>) => {
        try {
            await createUser(dto).unwrap();
            await usersRefetch();
            message.success("User created");
        } catch {
            message.error("Failed to create user");
        }
    };

    // ✅ save email
    const handleSaveEmail = async (user: AdminUser) => {
        try {
            await updateEmail({
                id: user.id,
                newEmail: editingEmail[user.id] ?? user.email,
            }).unwrap();
            await usersRefetch();
            message.success("Email updated");
        } catch(err) {
            message.error("Update failed");
            console.log(err)
        }
    };

    // ✅ delete
    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id).unwrap();
            await usersRefetch();
            message.success("User deleted");
        } catch {
            message.error("Delete failed");
        }
    };

    const handleRolesUpdate = async (id:string,value: Role[]) => {
        try{
            await updateRoles({id: id, roles: value});
            await usersRefetch();
            message.success("Roles updated");
        }catch(err) {
            message.error("Failed to update roles");
            console.log(err)
        }

    }

    const columns: ColumnsType<AdminUser> = [
        {
            title: "Email",
            dataIndex: "email",
            render: (_, record) => (
                <Space>
                    <Input
                        value={editingEmail[record.id] ?? record.email}
                        onChange={(e) =>
                            setEditingEmail((prev) => ({
                                ...prev,
                                [record.id]: e.target.value,
                            }))
                        }
                        style={{ width: 220 }}
                    />
                    <Button size="small" onClick={() => handleSaveEmail(record)}>
                        Save
                    </Button>
                </Space>
            ),
        },
        {
            title: "Confirmed",
            dataIndex: "emailConfirmed",
            render: (_, record) => (
                <Tag color={record.emailConfirmed ? "green" : "red"}>
                    {record.emailConfirmed ? "Yes" : "No"}
                </Tag>
            ),
        },
        {
            title: "Roles",
            dataIndex: "roles",
            render: (_, record) => (
                <Select
                    mode="multiple"
                    style={{ minWidth: 200 }}
                    defaultValue={record.roles}
                    options={roles?.map((r) => ({
                        value: r.name,
                        label: r.name,
                    }))}
                    onChange={(value) => handleRolesUpdate(record.id, value)}
                />
            ),
        },
        {
            title: "Actions",
            render: (_, record) => (
                <Button danger onClick={() => handleDelete(record.id)}>
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <Flex vertical gap={24} style={{ padding: 24 }}>
            <Title level={3}>Admin Users</Title>

            {/* CREATE USER */}
            <Card title="Create New User" style={{ maxWidth: 400 }}>
                <Form layout="vertical" onFinish={onCreate}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true },
                            { type: "email", message: "Invalid email" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                        Create User
                    </Button>
                </Form>
            </Card>

            {/* USERS TABLE */}
            <Card title="Users">
                <Table<AdminUser>
                    loading={isLoading}
                    rowKey="id"
                    columns={columns}
                    dataSource={users?.items}
                />
            </Card>
        </Flex>
    );
};