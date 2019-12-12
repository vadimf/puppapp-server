import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Req, Render, Res, Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
  
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }
  
  @Post('facebook')
  @UseGuards(AuthGuard('facebook-token'))
  async getTokenAfterFacebookSignIn(@Req() req, @GetUser() user) {
    return { user, accessToken: req.authInfo.jwtToken };
  }
  
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }
  
  @Get('reset-password')
  @Render('reset-password')
  resetPasswordPage(@Query('token') token: string) {
    return { token };
  }
  
  @Post('reset-password')
  async resetPasswordAttempt(@Res() res: Response, @Body() resetPasswordDto: ResetPasswordDto) {
    const viewName = await this.authService.resetPassword(resetPasswordDto);
    return res.render(viewName);
  }
}
