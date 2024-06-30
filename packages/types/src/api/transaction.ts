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
  surname: string;
  avatar?: string;
  own_amount: string;
  splits_receipt: boolean;
  total_amount: string;
}

export interface ICreateTransactionRequestData {
  shop: IStore;
  amount: string;
  date: string;
  description: string;
  image: File;
  payers: IPayer[];
}

export interface ITransactionDetails {
  id: number;
  total_amount: string;
  purchase_date: string;
  store_name: string;
  photo: string;
  description: string;
}

export interface IGetTransactionResponse {
  details: ITransactionDetails;
  participants: IParticipant[];
}
