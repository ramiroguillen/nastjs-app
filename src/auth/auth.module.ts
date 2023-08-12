import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/database/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CustomerEntity } from 'src/database/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, CustomerEntity]),
    JwtModule.register({}),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
