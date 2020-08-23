import {Entity, BaseEntity, Column, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product.entity";

@Entity("categories")
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { unique: true })
    title: string;


    @OneToMany(type => Product, product => product.category)
    products: Product[];
}
