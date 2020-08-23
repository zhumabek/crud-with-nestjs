import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductRepository} from "../../models/repositories/product.repository";
import {CategoryRepository} from "../../models/repositories/category.repository";
import {ProductController} from "./product.controller";
import {ProductService} from "./product.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository, CategoryRepository])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
