export interface IHistoryResponse {
  id: number;
  label: string;
  amount: number;
  paidBy: string;
  avatars?: string[];
  refund: boolean;
}

export interface IPayerResponse {
  id: number;
  name: string;
  avatar: string;
}

export interface IBalanceResponse extends IPayerResponse {
  amount: string;
}

export interface IExpenseDetails {
  id: number;
  name: string;
  avatar: string;
  amount: string;
}
