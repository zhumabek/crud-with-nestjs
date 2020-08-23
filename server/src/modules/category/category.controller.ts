import {Body, Controller, Post} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {Category} from "../../models/entities/category.entity";

@Controller("categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryService.createCategory(createCategoryDto)
    }
}
