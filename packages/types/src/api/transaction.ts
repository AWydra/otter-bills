import { IStore } from './store';

export interface IPayer {
  id: number;
  name: string;
  avatar?: string;
  amount?: string;
  splitsReceipt: boolean;
}

export interface IParticipant {
  id: number;
  name: string;
  avatar?: string;
  ownAmount: string;
  splitsReceipt: boolean;
  totalAmount: string;
}

export interface ICreateTransactionRequestData {
  shop: IStore;
  amount: string;
  date: string;
  description: string;
  image: File;
  payers: IPayer[];
}

export interface ITransaction {
  id: number;
  totalAmount: string;
  purchaseDate: string;
  storeName: string;
  photo: string;
  description: string;
}

export interface IGetTransactionResponse {
  transaction: ITransaction;
  participants: IParticipant[];
}
