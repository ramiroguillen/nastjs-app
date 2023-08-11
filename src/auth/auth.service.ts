import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from 'src/database/entities/user.entity';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserRoles } from 'src/user/types/userRoles.type';
import { createHash, verifyHash } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  /**
   * signup
   */
  public async signup(
    userDto: Partial<UserDTO>,
  ): Promise<{ access_token: string }> {
    try {
      const hash = await createHash(userDto.password);
      const role = UserRoles.USER;
      const user = this.userRepository.create({
        email: userDto.email,
        password: hash,
        role,
      });
      await this.userRepository.save(user);
      return this.signin({
        email: userDto.email,
        password: userDto.password,
      });
    } catch (error) {
      throw new ForbiddenException('Credentials taken');
    }
  }
  /**
   * signin
   */
  public async signin(
    userDto: Partial<UserDTO>,
  ): Promise<{ access_token: string }> {
    try {
      const user = await this.userRepository.findOneBy({
        email: userDto.email,
      });
      if (!user) {
        throw new ForbiddenException('Invalid credentials');
      }
      const passwordsMatches = await verifyHash(
        userDto.password,
        user.password,
      );
      if (!passwordsMatches) {
        throw new ForbiddenException('Invalid credentials');
      }
      return this.signToken(user.id, user.email, user.role);
    } catch (error) {
      throw new Error(error);
    }
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
