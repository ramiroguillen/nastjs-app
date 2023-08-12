import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AuthDTO {
  @IsOptional()
  id!: string;
  @IsNotEmpty()
  @IsEmail()
  email!: string;
  @IsNotEmpty()
  @IsString()
  password!: string;
  @IsNotEmpty()
  firstName!: string;
  @IsNotEmpty()
  lastName!: string;
  @IsNotEmpty()
  address!: string;
  @IsDate()
  @IsOptional()
  createdAt!: Date;
  @IsDate()
  @IsOptional()
  updatedAt!: Date;
}
