import {Entity, BaseEntity, PrimaryColumn, Column, OneToMany} from "typeorm";
import {ProductEntity} from "./ProductEntity";

@Entity("categories")
export class CategoryEntity extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column("varchar")
    title: string;


    @OneToMany(type => ProductEntity, product => product.category)
    products: ProductEntity[];
}
