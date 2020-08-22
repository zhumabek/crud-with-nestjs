import {EntityRepository, Repository} from "typeorm";
import {ProductEntity} from "../entities/ProductEntity";

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {

}