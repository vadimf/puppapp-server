import { File, Gender } from '../interfaces/user.interface';
import { IsArray, IsDateString, IsEnum, IsNotEmptyObject, IsString, Max, Min, MinLength } from 'class-validator';

class PreferredAgeDto {
  @Min(0)
  @Max(99)
  minimumAge: number;
  @Min(0)
  @Max(99)
  maximumAge: number;
}

export class UpdateUserDto {
  @IsString()
  @MinLength(2)
  name: string;
  @IsDateString()
  dateOfBirth: Date;
  @IsString()
  about: string;
  @IsNotEmptyObject()
  preferredAgeRange: PreferredAgeDto;
  @IsArray()
  pictures: File[];
  @IsEnum(Gender)
  gender: Gender;
}
