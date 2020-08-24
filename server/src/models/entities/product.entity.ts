import {Entity, BaseEntity, Column, ManyToOne, PrimaryGeneratedColumn, JoinTable} from "typeorm";
import {Category} from "./category.entity";

@Entity("products")
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { unique: true, length: 20 })
    title: string;

    @Column("varchar", { length: 200 })
    description: string;

    @Column("text")
    image: string;

    @Column("varchar")
    imagePublicId: string;

    @Column("integer")
    price: number;

    @ManyToOne(type => Category, category => category.products, {
        eager: true
    })
    @JoinTable()
    category: Category;
}
