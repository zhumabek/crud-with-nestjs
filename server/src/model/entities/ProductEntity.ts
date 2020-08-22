import {Entity, BaseEntity, PrimaryColumn, Column, ManyToOne} from "typeorm";
import {CategoryEntity} from "./CategoryEntity";

@Entity("products")
export class ProductEntity extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column("varchar", { length: 20 })
    title: string;

    @Column("varchar", { length: 200 })
    description: string;

    @Column("text")
    image: string;

    @Column("integer")
    price: number;

    @ManyToOne(type => CategoryEntity, category => category.products)
    category: CategoryEntity;
}
