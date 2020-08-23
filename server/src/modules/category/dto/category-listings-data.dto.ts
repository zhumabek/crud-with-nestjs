import {Category} from "../../../models/entities/category.entity";

export class CategoryListingsDataDto {
    result: Category[]
    total: number;
}