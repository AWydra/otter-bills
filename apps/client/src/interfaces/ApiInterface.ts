export interface IHistoryResponse {
  id: string;
  label: string;
  amount: number;
  paidBy: string;
  avatars?: string[];
  refund: boolean;
}

export interface IPayersResponse {
  id: string;
  name: string;
  avatar: string;
}

export interface IBalanceResponse extends IPayersResponse {
  amount: string;
}

export interface IExpenseDetails {
  id: string;
  name: string;
  avatar: string;
  amount: string;
}

export interface IExpenseDetailsResponse {
  id: string;
  image?: string;
  shop: string;
  amount: string;
  date: string;
  additionalInfo?: string;
  payers: IExpenseDetails[];
}
