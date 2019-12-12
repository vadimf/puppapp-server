import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { MailerService } from '@nest-modules/mailer';
import { ConfigService } from '../config/config.service';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
  }
  
  async signUp(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
  
  async login(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const email = await this.usersService.validateUserPassword(createUserDto);
    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);
    
    return { accessToken };
  }
  
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    
    const user = await this.usersService.findOne({ email });
    if (!user) {
      throw new NotFoundException('Email not found');
    }
    
    const resetPasswordToken = randomStringGenerator();
    user.resetPasswordTokens = [
      ...user.resetPasswordTokens,
      resetPasswordToken,
    ];
    
    await user.save();
    
    await this.mailerService.sendMail({
      to: email,
      subject: 'Forgot your password?',
      template: 'forgot-password-email',
      context: {
        resetPasswordUri: `${this.configService.get(
          'API_URI',
        )}/auth/reset-password?token=${resetPasswordToken}`,
      },
    });
  }
  
  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<string> {
    const { password, confirmPassword, token } = resetPasswordDto;
    
    if (password === confirmPassword) {
      const user = await this.usersService.findOne({ resetPasswordTokens: token });
      user.set({ password });
      await user.save();
    } else {
      throw new BadRequestException('Passwords don\'t match');
    }
    
    return 'reset-password-successful';
  }
}
