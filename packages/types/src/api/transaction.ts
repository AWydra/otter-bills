import { IStore } from './store';

export interface IPayer {
  id: number;
  name: string;
  avatar?: string;
  amount?: string;
  splitsReceipt: boolean;
}

export interface ICreateTransactionRequestData {
  shop: IStore;
  amount: string;
  date: string;
  description: string;
  image: File;
  payers: IPayer[];
}