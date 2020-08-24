import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ProductRepository} from "../../models/repositories/product.repository";
import {ProductDto} from "./dto/product.dto";
import {Product} from "../../models/entities/product.entity";
import {Cloudinary} from "../../lib/api/Cloudinary";
import {CategoryRepository} from "../../models/repositories/category.repository";
import {ProductListingsData} from "./dto/product-listings-data.dto";

@Injectable()
export class ProductService {
  constructor(
      @InjectRepository(ProductRepository)
      private productRepository: ProductRepository,
      private categoryRepository: CategoryRepository,
      private cloudinaryApi: Cloudinary
  ) {}

  async createProduct(createProductDto: ProductDto): Promise<Product> {
    const { title, description, image, price, categoryId } = createProductDto;
    const existingProduct = await this.productRepository.findOne({title});

    if (existingProduct){
      throw new ForbiddenException("Product with this title already exist!")
    }

    const { imageUrl, publicId } = await this.cloudinaryApi.upload(image);

    const product =  new Product();
    product.title = title;
    product.description = description;
    product.image = imageUrl;
    product.imagePublicId = publicId;
    product.price = price;
    product.category = await this.categoryRepository.findOne(categoryId);


    await product.save();
    return product;
  }

  async getProductById(id: number): Promise<Product> {
    const product =  await this.productRepository.findOne(id);
    if(!product){
      throw new NotFoundException("Product with this id not found!");
    }

    return product;
  }

  async getProducts( page = 1, limit = 10 ): Promise<ProductListingsData> {
    const [result, total] = await this.productRepository.findAndCount({
      take: limit,
      skip: page > 0 ? (page - 1) * limit : 0
    });

    return { result, total };
  }

  async updateProduct(id: number, updateProductDto: ProductDto): Promise<Product> {
    const { title, description, image, price, categoryId } = updateProductDto;
    const product = await this.getProductById(id);

    if (!product){
      throw new NotFoundException("Product with this id not found!")
    }

    if (image !== product.image){
      const {imageUrl, publicId} = await this.cloudinaryApi.update(product.imagePublicId, image);

      product.image = imageUrl;
      product.imagePublicId = publicId;
    }


    product.title = title;
    product.description = description;
    product.price = price;
    product.category = await this.categoryRepository.findOne(categoryId);
    await product.save();
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    const product =  await this.productRepository.delete(id);
    if(!product){
      throw new NotFoundException("Product was not deleted!");
    }
  }
}
