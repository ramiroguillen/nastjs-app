import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { dataSourceOptions } from './database/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    CustomerModule,
    OrderModule,
    ProductModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
