import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

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

export interface User extends Document {
  _id: ObjectId;
  email: string;
  name: string;
  password: string;
  salt: string;
  dateOfBirth: Date;
  about: string;
  preferredAgeRange: { minimumAge: number; maximumAge: number };
  pictures: File[];
  gender: Gender;
  validatePassword: (password: string) => Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
  resetPasswordTokens: string[];
}
