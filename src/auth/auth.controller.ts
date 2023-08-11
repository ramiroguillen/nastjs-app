import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserDTO } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  /**
   * signup
   */
  @Post('signup')
  public signup(@Body() user: UserDTO) {
    return this.authService.signup(user);
  }
}
