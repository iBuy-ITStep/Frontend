export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    previewImageId?: string;
    newPreviewImageId?: string;
    dateOfCreation: Date;
    categoryId: number;
    categoryName: string;
    brandId: number;
    brandName: string;
    inStock: boolean;
    stockQuantity: number;
    rating1Count:number,
    rating2Count:number,
    rating3Count:number,
    rating4Count:number,
    rating5Count:number,
}