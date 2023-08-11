import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserDTO } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  /**
   * signup
   */
  @Post('signup')
  public async signup(
    @Body() userDto: Partial<UserDTO>,
  ): Promise<{ access_token: string }> {
    if (userDto.email && userDto.password) {
      return await this.authService.signup(userDto);
    }
  }
  /**
   * signin
   */
  @Post('signin')
  public async signin(
    @Body() userDto: Partial<UserDTO>,
  ): Promise<{ access_token: string }> {
    if (userDto.email && userDto.password) {
      return await this.authService.signin(userDto);
    }
  }
}
