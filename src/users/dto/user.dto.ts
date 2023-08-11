import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { UserRoles } from '../types/userRoles.type';

export class UserDTO {
  @IsOptional()
  id!: string;
  @IsNotEmpty()
  email!: string;
  @IsNotEmpty()
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
