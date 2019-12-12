import { IsString, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly confirmPassword: string;
  @IsString()
  readonly token: string;
}
