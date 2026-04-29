import type {Category} from "../../types/Category.ts";

export const findCategoryById = (categories: Category[], id: number): Category | undefined => {
    for (const category of categories) {
        if (category.id === id) {
            return category;
        }

        if (category.children?.length) {
            const found = findCategoryById(category.children, id);
            if (found) return found;
        }
    }

    return undefined;
}

export const findParentCategoryById = (categories: Category[], id: number, parentId=0): number => {
    if(!categories) return -2;
    for (const category of categories) {
        if(category.id === id){
            return parentId;
        }
        if (category.children?.length) {
            return findParentCategoryById(category.children, id, category.id);
        }
    }
    return -1;
}

export const findAllParentsCategoryById = (
    categories: Category[],
    category: Category
): Partial<Category>[] => {
    const result: Partial<Category>[] = [{
        id: category.id,
        parentId: category.parentId,
        name: category.name,
    }];
    if (!category) return result;
    let current = category;

    while (current.parentId !== 0) {
        const parent = findCategoryById(categories, current.parentId);

        if (!parent) break;

        result.push({
            id: parent.id,
            parentId: parent.parentId,
            name: parent.name,
        });
        current = parent;
    }

    return result.sort((a, b) => {
        if(a.id && b.id) return a.id - b.id;
        return 0;
    });
};