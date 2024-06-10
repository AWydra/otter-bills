import type { Request } from 'express';
import type { Types } from 'mongoose';

export interface IRequest extends Request {
  userId: Types.ObjectId;
  cookies: {
    jwt: string;
  };
}
