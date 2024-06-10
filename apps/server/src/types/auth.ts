import type { Types } from 'mongoose';
import type { IRequest } from './express';

export interface IDecodedToken {
  id: Types.ObjectId;
}

export interface ISignUpRequest extends IRequest {
  body: {
    email: string;
    password: string;
  };
}

export interface ILogInRequest extends IRequest {
  body: {
    email: string;
    password: string;
  };
}
