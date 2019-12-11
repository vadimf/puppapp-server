import { Schema } from 'mongoose';

export const AgeRangeSchema = new Schema({
  minimumAge: { type: Number, default: 18 },
  maximumAge: { type: Number, default: 99 },
}, { _id: false });

export const FileSchema = new Schema({
  url: String,
  mime: String,
  thumbnail: String,
});

export const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  dateOfBirth: Date,
  about: String,
  preferredAgeRange: { type: AgeRangeSchema, default: {} },
  pictures: [FileSchema],
  gender: String,
});
