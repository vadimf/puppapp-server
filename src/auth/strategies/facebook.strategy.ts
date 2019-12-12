import { UsersService } from '../../users/users.service';
import { Injectable } from '@nestjs/common';
import * as FacebookTokenStrategy from 'passport-facebook-token';
import { use } from 'passport';
import { ConfigService } from '../../config/config.service';
import { Profile } from 'passport-facebook-token';
import { User } from '../../users/interfaces/user.interface';
import { CreateUserFromFacebookDto } from '../../users/dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class FacebookStrategy {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.init();
  }
  
  init() {
    use(
      new FacebookTokenStrategy(
        {
          clientID: this.configService.get('FACEBOOK_ID'),
          clientSecret: this.configService.get('FACEBOOK_SECRET'),
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: Profile,
          done: (err: any, user?: any, info?: any) => void,
        ) => {
          let user;
          
          user = await this.usersService.findOne({
            email: profile._json.email,
          });
          
          if (!user) {
            const userFromFacebookDto: CreateUserFromFacebookDto = {
              email: profile._json.email,
              facebookId: profile.id,
            };
            
            user = await this.usersService.create(userFromFacebookDto);
            await user.save();
          }
          
          const payload: JwtPayload = { email: user.email };
          const jwtToken = await this.jwtService.sign(payload);
          
          return done(null, user, { jwtToken });
        },
      ),
    );
  }
}
