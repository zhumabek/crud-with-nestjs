import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsNumber()
    price: number;

    @IsNumber()
    categoryId: number
}