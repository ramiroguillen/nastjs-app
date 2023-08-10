import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

import { UserEntity } from '../../database/entities/user.entity';

export class CustomerDTO {
  @IsOptional()
  id!: string;
  @IsNotEmpty()
  firstName!: string;
  @IsNotEmpty()
  lastName!: string;
  @IsNotEmpty()
  address!: string;
  @IsNotEmpty()
  user!: UserEntity;
  @IsDate()
  @IsOptional()
  createdAt!: Date;
  @IsDate()
  @IsOptional()
  updatedAt!: Date;
}
