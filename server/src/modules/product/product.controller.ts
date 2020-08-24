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
import { ProductService } from './product.service';
import {ProductDto} from "./dto/product.dto";
import {Product} from "../../models/entities/product.entity";
import {Category} from "../../models/entities/category.entity";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(@Body() createProductDto: ProductDto): Promise<Product> {
    return this.productService.createProduct(createProductDto)
  }

  @Get(":id")
  getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.getProductById(id)
  }

  @Put(":id")
  @UsePipes(ValidationPipe)
  updateProduct(
      @Param('id', ParseIntPipe) id: number,
      @Body() productDto: ProductDto
  ): Promise<Product> {
    return this.productService.updateProduct(id, productDto)
  }
}
