import { Schema } from 'mongoose';
import { Gender } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';

export const AgeRangeSchema = new Schema(
  {
    minimumAge: { type: Number, default: 18 },
    maximumAge: { type: Number, default: 99 },
  },
  { _id: false },
);

export const FileSchema = new Schema({
  url: String,
  mime: String,
  thumbnail: String,
});

export const UserSchema = new Schema({
  facebookId: String,
  email: { type: String, unique: true },
  password: String,
  salt: String,
  name: { type: String, default: null },
  dateOfBirth: { type: Date, default: null },
  about: { type: String, default: null },
  preferredAgeRange: { type: AgeRangeSchema, default: {} },
  pictures: [FileSchema],
  gender: { type: String, default: Gender.MALE },
}, {
  timestamps: true,
});

UserSchema.methods.validatePassword = async function(
  password: string,
): Promise<boolean> {
  const hash = await bcrypt.hash(password, this.salt);
  return hash === this.password;
};

UserSchema.methods.toJSON = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    dateOfBirth: this.dateOfBirth,
    about: this.about,
    preferredAgeRange: this.preferredAgeRange,
    pictures: this.pictures,
    gender: this.gender,
  };
};
