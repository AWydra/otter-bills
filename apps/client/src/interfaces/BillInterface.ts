import type { IPayersResponse } from './ApiInterface';

export interface IShopOption {
  inputValue?: string;
  name: string;
  id?: string | null;
}

export interface IPayers extends IPayersResponse {
  amount: string;
  splitsReceipt: boolean;
}
