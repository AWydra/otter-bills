import type { ISignUpRequestData } from '@repo/types';
import type { IRequest } from './express';

export interface IDecodedToken {
  id: number;
}

export interface ISignUpRequest extends IRequest {
  body: ISignUpRequestData;
}

export interface ILogInRequest extends IRequest {
  body: {
    email: string;
    password: string;
  };
}
