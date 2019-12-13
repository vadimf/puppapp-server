import { File, Gender } from '../interfaces/user.interface';
import { IsArray, IsDateString, IsEnum, IsNotEmptyObject, IsString, Max, Min, MinLength } from 'class-validator';
import { MAX_PREFERRED_AGE, MIN_NAME_LENGTH, MIN_PREFERRED_AGE } from '../../utils/constants';

class PreferredAgeDto {
  @Min(MIN_PREFERRED_AGE)
  @Max(MAX_PREFERRED_AGE)
  minimumAge: number;
  @Min(MIN_PREFERRED_AGE)
  @Max(MAX_PREFERRED_AGE)
  maximumAge: number;
}

export class UpdateUserDto {
  @IsString()
  @MinLength(MIN_NAME_LENGTH)
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
