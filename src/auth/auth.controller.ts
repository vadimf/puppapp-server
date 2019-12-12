import { Controller, Get, UseGuards, Request, Post, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { GetUser } from './decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  
  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
  
  @Post('/login')
  async login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }
  
  @Post('/facebook')
  @UseGuards(AuthGuard('facebook-token'))
  async getTokenAfterFacebookSignIn(@Req() req, @GetUser() user) {
    return { user, accessToken: req.authInfo.jwtToken };
  }
}
