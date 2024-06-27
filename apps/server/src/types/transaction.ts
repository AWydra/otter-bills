import type { ICreateTransactionRequestData } from '@repo/types';
import type { IRequest } from './express';

export interface ICreateTransactionRequest extends IRequest {
  body: ICreateTransactionRequestData;
}

export interface ITransactionParticipant {
  id: number;
  amount: number;
  splitsReceipt: boolean;
  totalAmount: number;
}
