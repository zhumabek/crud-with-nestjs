import {EntityRepository, Repository} from "typeorm";
import {Category} from "../entities/category.entity";
import {CreateCategoryDto} from "../../modules/category/dto/create-category.dto";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const { title } = createCategoryDto;

        const category =  new Category();
        category.title = title;
        await category.save();
        return category;
    }
}