import type { Types } from 'mongoose';

export interface IUserModel {
  id: Types.ObjectId;
  name: string;
  surname: string;
  email: string;
  password: string;
}
