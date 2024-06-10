import type { Types } from 'mongoose';

export interface IUserModel {
  id: Types.ObjectId;
  email: string;
  password: string;
}
