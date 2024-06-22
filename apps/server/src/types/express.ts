import type { Request } from 'express';

export interface IRequest extends Request {
  userId: number;
  cookies: {
    jwt: string;
  };
}
