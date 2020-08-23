import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {Category} from "../../models/entities/category.entity";
import {CategoryListingsDataDto} from "./dto/category-listings-data.dto";

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
    getCategories(
        @Query('page') page: number | undefined,
        @Query('limit') limit: number | undefined,
    ): Promise<CategoryListingsDataDto> {
        return this.categoryService.getCategories(page, limit)
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
