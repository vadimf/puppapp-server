import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../utils/constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:
    [UsersModule, PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    ],
  providers:
    [AuthService, JwtStrategy],
  controllers:
    [AuthController],
  exports: [
    JwtStrategy,
    PassportModule,
  ],
})

export class AuthModule {
}
