import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from 'src/database/entities/user.entity';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { UserRoles } from 'src/user/types/userRoles.type';
import { createHash, verifyHash } from 'src/utils/bcrypt';
import { UserDTO } from 'src/user/dto/user.dto';
import { CustomerEntity } from 'src/database/entities/customer.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  /**
   * signUp
   */
  public async signUp(authDto: AuthDTO): Promise<{ access_token: string }> {
    const hash = await createHash(authDto.password);
    const role = UserRoles.USER;
    const newUser = this.userRepository.create({
      email: authDto.email,
      password: hash,
      role,
    });
    const user = await this.userRepository.save(newUser);
    if (!user) {
      throw new ForbiddenException('Something bad happened', {
        cause: new Error(),
        description: 'Cannot save new user',
      });
    }
    const newCustomer = this.customerRepository.create({
      firstName: authDto.firstName,
      lastName: authDto.lastName,
      address: authDto.address,
      user,
    });
    const customer = await this.customerRepository.save(newCustomer);
    if (!customer) {
      throw new ForbiddenException('Something bad happened', {
        cause: new Error(),
        description: 'Cannot save new customer',
      });
    }
    return this.signIn({
      email: authDto.email,
      password: authDto.password,
    });
  }
  /**
   * signIn
   */
  public async signIn(
    userDto: Partial<UserDTO>,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOneBy({
      email: userDto.email,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passwordsMatches = await verifyHash(userDto.password, user.password);
    if (!passwordsMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.signToken(user.id, user.email, user.role);
  }
  /**
   * signToken
   */
  public async signToken(
    id: string,
    email: string,
    role: UserRoles,
  ): Promise<{ access_token: string }> {
    const payload = { sub: id, email, role };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret,
    });
    return { access_token: token };
  }
}
