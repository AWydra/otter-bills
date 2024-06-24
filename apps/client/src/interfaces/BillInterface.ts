import type { IStore } from '@repo/types';
import type { IPayersResponse } from './ApiInterface';

export interface IShopOption extends IStore {
  inputValue?: string;
}

export interface IPayers extends IPayersResponse {
  amount: string;
  splitsReceipt: boolean;
}
