import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

import { OrderStatus } from '../types/orderStatus.type';

export class OrderDTO {
  @IsOptional()
  id!: string;
  @IsOptional()
  notes?: string;
  @IsNotEmpty()
  total!: number;
  @IsNotEmpty()
  status!: OrderStatus;
  @IsNotEmpty()
  payment!: boolean;
  @IsDate()
  @IsOptional()
  createdAt!: Date;
  @IsDate()
  @IsOptional()
  updatedAt!: Date;
}
