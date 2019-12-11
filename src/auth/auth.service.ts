import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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
}
