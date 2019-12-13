import {
  IsEmail, IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../../utils/constants';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  @MinLength(MIN_PASSWORD_LENGTH)
  @MaxLength(MAX_PASSWORD_LENGTH)
  readonly password?: string;
  @ValidateIf(o => !o.password)
  @IsString()
  readonly facebookId?: string;
}
