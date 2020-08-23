import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {typeOrmConfig} from "./config/database/typeorm.config";
import {CategoryModule} from "./modules/category/category.module";
import {ProductModule} from "./modules/product/product.module";

@Module({
  imports: [
      TypeOrmModule.forRoot(typeOrmConfig),
      ConfigModule.forRoot(),
      CategoryModule,
      ProductModule
  ]
})
export class AppModule {}
