import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductRepository} from "../../model/repositories/ProductRepository";
import {CategoryRepository} from "../../model/repositories/CategoryRepository";
import {ProductController} from "./product.controller";
import {ProductService} from "./product.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository, CategoryRepository ])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
