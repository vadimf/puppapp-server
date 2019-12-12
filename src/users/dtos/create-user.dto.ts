import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  readonly password: string;
}

export class CreateUserFromFacebookDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly facebookId: string;
}
