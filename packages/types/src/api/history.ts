import { PaymentMethod } from './payment';

export enum HistoryItemType {
  TRANSACTION = 'transaction',
  PAYMENT = 'payment',
}

export interface IHistoryUser {
  name: string;
  surname: string;
  avatar: string;
}

export interface IHistoryTransactionItem {
  id: number;
  payer: IHistoryUser;
  payee: null;
  amount: string;
  payment_method: null;
  is_confirmed: null;
  created_at: string;
  type: HistoryItemType.TRANSACTION;
  participants: IHistoryUser[];
}

export interface IHistoryPaymentItem {
  id: number;
  payer: IHistoryUser;
  payee: IHistoryUser;
  amount: string;
  payment_method: PaymentMethod;
  is_confirmed: boolean;
  created_at: string;
  type: HistoryItemType.PAYMENT;
  participants: null;
}

export interface IGetLatestHistoryRequestData {
  items: (IHistoryTransactionItem | IHistoryPaymentItem)[];
}
