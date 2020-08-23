import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateCategoryDto} from "./dto/create-category.dto";
import {Category} from "../../models/entities/category.entity";
import {CategoryRepository} from "../../models/repositories/category.repository";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryRepository)
        private categoryRepository: CategoryRepository
    ) {}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const { title } = createCategoryDto;
        const existingCategory = await this.categoryRepository.findOne({title});

        if (existingCategory){
            throw new ForbiddenException("Category with this title already exist!")
        }

        const category =  new Category();
        category.title = title;
        await category.save();
        return category;
    }

    async getCategoryById(id: number): Promise<Category> {
        const category =  await this.categoryRepository.findOne(id)
        if(!category){
            throw new NotFoundException("Category with this id not found!");
        }

        return category;
    }

    async getCategories(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async updateCategory(id: number, createCategoryDto: CreateCategoryDto): Promise<Category> {
        const { title } = createCategoryDto;
        const category = await this.getCategoryById(id);

        category.title = title;
        await category.save();
        return category;
    }

    async deleteCategory(id: number): Promise<void> {
        const category =  await this.categoryRepository.delete(id);
        if(!category){
            throw new NotFoundException("Category was not deleted!");
        }
    }
}
