import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  signup(user: UserDTO) {
    return user;
  }
}
