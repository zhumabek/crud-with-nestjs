import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {Category} from "../../models/entities/category.entity";

@Controller("categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryService.createCategory(createCategoryDto)
    }

    @Get(":id")
    getCategoryById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
        return this.categoryService.getCategoryById(id)
    }

    @Get()
    getCategories(): Promise<Category[]> {
        return this.categoryService.getCategories()
    }

    @Put(":id")
    @UsePipes(ValidationPipe)
    updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() createCategoryDto: CreateCategoryDto
    ): Promise<Category> {
        return this.categoryService.updateCategory(id, createCategoryDto)
    }

    @Delete(":id")
    deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.categoryService.deleteCategory(id)
    }

}
