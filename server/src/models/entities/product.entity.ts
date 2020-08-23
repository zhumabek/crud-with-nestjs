import {Entity, BaseEntity, Column, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./category.entity";

@Entity("products")
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 20 })
    title: string;

    @Column("varchar", { length: 200 })
    description: string;

    @Column("text")
    image: string;

    @Column("integer")
    price: number;

    @ManyToOne(type => Category, category => category.products)
    category: Category;
}
