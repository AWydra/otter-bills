import { Types } from 'mongoose';

export interface IAxiosErrorData<T = string> {
  field?: T;
  message: string;
}

export interface ISignUpRequestData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface IUserResponseData {
  id: string;
  name: string;
  surname: string;
  email: string;
}
