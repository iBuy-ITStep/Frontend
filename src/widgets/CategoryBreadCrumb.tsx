import type {Category} from "../types/Category.ts";
import {Breadcrumb} from "antd";
import {findAllParentsCategoryById} from "../shared/tools/search.ts";
import {Link} from "react-router";

export const CategoryBreadCrumb = ({categories, current}: {categories: Category[], current: Category}) => {
    const cats = findAllParentsCategoryById(categories, current)
    const items = cats.map((c: Partial<Category>, i) => {
        return {
            key: c.id,
            title: i === cats.length - 1 ? c.name : <Link to={`/category/${c?.id ?? 0}`}>{c.name}</Link>,
        }
    })
    return(
        <Breadcrumb
            items={items}
        />
    )
}