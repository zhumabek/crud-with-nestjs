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
import {ProductListingsData} from "./dto/product-listings-data.dto";

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

  @Get()
  getProducts(
      @Query('page') page: number | undefined,
      @Query('limit') limit: number | undefined,
  ): Promise<ProductListingsData> {
    return this.productService.getProducts(page, limit)
  }

  @Put(":id")
  @UsePipes(ValidationPipe)
  updateProduct(
      @Param('id', ParseIntPipe) id: number,
      @Body() productDto: ProductDto
  ): Promise<Product> {
    return this.productService.updateProduct(id, productDto)
  }

  @Delete(":id")
  deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productService.deleteProduct(id)
  }
}
