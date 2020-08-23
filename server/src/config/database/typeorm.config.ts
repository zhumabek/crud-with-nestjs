import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {Category} from "../../models/entities/category.entity";
import {Product} from "../../models/entities/product.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.NODE_ENV === "production" ? process.env.DB_HOST : 'localhost',
    port: 5432,
    username: process.env.NODE_ENV === "production" ? process.env.DB_USER : 'postgres',
    password: process.env.NODE_ENV === "production" ? process.env.DB_SECRET : 'postgres',
    database: process.env.NODE_ENV === "production" ? process.env.DB_NAME : 'crud-app-with-nest',
    entities: [Category, Product],
    synchronize: true,
}