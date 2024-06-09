export interface IHistoryResponse {
  id: number;
  label: string;
  amount: number;
  paidBy: string;
  avatars?: string[];
  refund: boolean;
}

export interface IPayersResponse {
  id: number;
  name: string;
  avatar: string;
}

export interface IBalanceResponse extends IPayersResponse {
  amount: string;
}

export interface IExpenseDetails {
  id: number;
  name: string;
  avatar: string;
  amount: string;
}

export interface IExpenseDetailsResponse {
  id: number;
  image?: string;
  shop: string;
  amount: string;
  date: string;
  additionalInfo?: string;
  payers: IExpenseDetails[];
}
