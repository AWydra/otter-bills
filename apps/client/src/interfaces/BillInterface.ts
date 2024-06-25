import type { IStore } from '@repo/types';
import type { IPayerResponse } from './ApiInterface';

export interface IShopOption extends IStore {
  inputValue?: string;
}

export interface IPayer extends IPayerResponse {
  amount: string;
  splitsReceipt: boolean;
}
