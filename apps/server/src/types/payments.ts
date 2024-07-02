import type { ICreatePaymentRequestData } from '@repo/types';
import type { IRequest } from './express';

export interface ICreatePaymentRequest extends IRequest {
  body: ICreatePaymentRequestData;
}
