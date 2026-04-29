export type ApiCategory = {
    id: number;
    name: string;
    parentId: number;
}

export type Category = {
    id: number;
    name: string;
    parentId: number;
    children: Array<Category>;
}

export type CategoryAntdMenuItem = {
    id: number;
    label: string;
    children?: CategoryAntdMenuItem[];
}