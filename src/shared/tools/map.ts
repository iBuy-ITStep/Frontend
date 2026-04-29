import type {Product} from "../../types/Product.ts";
import type {Brand} from "../../types/Brand.ts";

export const mapBrandByProducts = (products: Product[]): Brand[] => {
    const map = new Map<number, Brand>();

    products.forEach((product) => {
        if (!map.has(product.brandId)) {
            map.set(product.brandId, {
                id: product.brandId,
                name: product.brandName,
            });
        }
    });

    return Array.from(map.values());
};