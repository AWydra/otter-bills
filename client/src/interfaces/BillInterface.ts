import { PayersResponseInterface } from './ApiInterface';

export interface ShopOptionIterface {
  inputValue?: string;
  name: string;
  id?: number | null;
}

export interface PayersInterface extends PayersResponseInterface {
  amount: string;
  splitsReceipt: boolean;
}
