import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtGuard)
  @Get('me')
  /**
   * getCurrentUser
   */
  public async getCurrentUser(@Req() req: Request) {
    return req.user;
  }
}
