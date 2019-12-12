import {
  IsEmail, IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  readonly password?: string;
  @ValidateIf(o => !o.password)
  @IsString()
  readonly facebookId?: string;
}
