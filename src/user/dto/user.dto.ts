import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRoles } from '../types/userRoles.type';

export class UserDTO {
  @IsOptional()
  id!: string;
  @IsNotEmpty()
  @IsEmail()
  email!: string;
  @IsNotEmpty()
  @IsString()
  password!: string;
  @IsNotEmpty()
  role!: UserRoles;
  @IsDate()
  @IsOptional()
  createdAt!: Date;
  @IsDate()
  @IsOptional()
  updatedAt!: Date;
}
