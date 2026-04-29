import type {BrandDto} from "../../api/dto/BrandDto.ts";

export const selectBrandsAdapter = (data: BrandDto[]) => {
    return data?.map((c) => {
        return {
            value: c.id,
            label: c.name,
        }
    })
}