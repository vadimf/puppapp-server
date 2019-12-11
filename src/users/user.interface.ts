export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export interface File {
  url: string;
  mime: string;
  thumbnail: string;
}

export interface User {
  email: string;
  name: string;
  password: string;
  dateOfBirth: Date;
  about: string;
  preferredAgeRange: { minimumAge: number; maximumAge: number };
  pictures: File[];
  gender: Gender;
  validatePassword: (password: string) => Promise<boolean>;
}
