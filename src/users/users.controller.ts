import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from './user.interface';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  @Get('profile')
  getProfile(@GetUser() user: User) {
    return user;
  }
}
