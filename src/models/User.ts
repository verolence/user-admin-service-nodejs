import mongoose, { Schema, Document } from 'mongoose';

// интерфейс IUser описывает структуру объекта в TypeScript, чтобы редактор и компилятор проверяли типы
export interface IUser extends Document {
  fullName: string;
  birthDate: Date;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isActive: boolean;
}

// схема UserSchema задаёт правила хранения в MongoDB: какие поля есть, их типы, обязательность, уникальность, значения по умолчанию
const UserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  isActive: { type: Boolean, default: true },
});

// модель User - объект, через который ведется работа с базой: создание пользователей, их поиск, обновление, удаление
export const User = mongoose.model<IUser>('User', UserSchema);
