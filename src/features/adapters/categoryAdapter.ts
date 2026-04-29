import type {ApiCategory, Category} from "../../types/Category.ts";

const recurs = (cat: Array<Category>, sub: ApiCategory) => {
    for (let p of cat) {
        if (sub.parentId == p.id){
            p.children.push({
                id: sub.id,
                name: sub.name,
                parentId: sub.parentId,
                children: []
            })
            return;
        }
        else if (p.children?.length > 0) {
            recurs(p.children, sub)
        }
    }
}

export const categoryToTreeAdapter = (cat:ApiCategory[]) => {
    let result: Array<Category> = []
    cat = cat.sort((a, b) => a.parentId - b.parentId)

    for(let category of cat){
        if(category.parentId === 0){
            result.push({
                id: category.id,
                name: category.name,
                parentId: category.parentId,
                children: []
            })
        }else {
            recurs(result, category)
        }
    }
    return result;
}

export const categoriesToDataTableAdapter = (data: ApiCategory[]) => {
    const result = []
    if(data){
        for (const category of data) {
            result.push({
                key: category.id,
                id: category.id,
                name: category.name,
                parentId: category.parentId,
                parentName: data.find(c => c.id === category.parentId)?.name,

            })
        }
    }
    return result
}

export const selectCategoryAdapter = (data: ApiCategory[]) => {
    return data?.map((c) => {
        return {
            value: c.id,
            label: c.name,
        }
    })
}