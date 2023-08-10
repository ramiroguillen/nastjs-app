import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  /**
   * signup
   */
  @Post('signup')
  public signup(@Body() dto: AuthDTO) {
    console.log(dto);
    return this.authService.signup();
  }
}
