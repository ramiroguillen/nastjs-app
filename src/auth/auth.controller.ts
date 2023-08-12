import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserDTO } from 'src/user/dto/user.dto';
import { AuthDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  /**
   * signUp
   */
  @Post('signup')
  public async signUp(
    @Body() authDto: AuthDTO,
  ): Promise<{ access_token: string }> {
    return await this.authService.signUp(authDto);
  }
  /**
   * signIn
   */
  @Post('signin')
  public async signIn(
    @Body() userDto: Partial<UserDTO>,
  ): Promise<{ access_token: string }> {
    if (userDto.email && userDto.password) {
      return await this.authService.signIn(userDto);
    }
  }
}
