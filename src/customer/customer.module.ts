import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerEntity } from 'src/database/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
