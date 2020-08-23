import {ForbiddenException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "../../models/entities/category.entity";
import {ProductRepository} from "../../models/repositories/product.repository";
import {CreateProductDto} from "./dto/create-product.dto";
import {Product} from "../../models/entities/product.entity";
import {Cloudinary} from "../../lib/api/Cloudinary";

@Injectable()
export class ProductService {
  constructor(
      @InjectRepository(ProductRepository)
      private productRepository: ProductRepository
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { title, description, image, price, categoryId } = createProductDto;
    const existingCategory = await this.productRepository.findOne({title});

    if (existingCategory){
      throw new ForbiddenException("Product with this title already exist!")
    }

    const imageUrl = await Cloudinary.upload(image);

    const product =  new Product();
    product.title = title;
    product.description = description;
    product.image = imageUrl;
    product.price = price;
    product.category = await Category.findOne(categoryId);


    await product.save();
    return product;
  }

}
