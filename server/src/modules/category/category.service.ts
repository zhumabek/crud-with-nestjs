import { Injectable } from '@nestjs/common';
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

    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryRepository.createCategory(createCategoryDto)
    }
}
