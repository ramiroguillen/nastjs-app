import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class ProductDTO {
  @IsOptional()
  id!: string;
  @IsNotEmpty()
  title!: string;
  @IsNotEmpty()
  price!: number;
  @IsOptional()
  description!: string;
  @IsOptional()
  stock!: number;
  @IsDate()
  @IsOptional()
  createdAt!: Date;
  @IsDate()
  @IsOptional()
  updatedAt!: Date;
}
