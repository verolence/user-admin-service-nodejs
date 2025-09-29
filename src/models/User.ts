import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  birthDate: Date;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isActive: boolean;
}

const UserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  isActive: { type: Boolean, default: true },
});

export const User = mongoose.model<IUser>('User', UserSchema);
