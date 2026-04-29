import type {Product} from "../../types/Product.ts";
import type {Brand} from "../../types/Brand.ts";

export const filterProductsByBrands = (products: Product[], brands: Brand[]): Product[] => {
    if (brands.length === 0) return products;

    const result: Product[] = []
    for (const brand of brands) {
        for (const product of products) {
            if (brand.id === product.brandId) {
                result.push(product);
            }
        }
    }
    return result;
}