export interface HistoryResponseInterface {
  id: number;
  label: string;
  amount: number;
  paidBy: string;
  avatars?: string[];
  refund: boolean;
}

export interface PayersResponseInterface {
  id: number;
  name: string;
  avatar: string;
}

export interface BalanceResponseInterface extends PayersResponseInterface {
  amount: string;
}

export interface ExpenseDetailsPayersInterface {
  id: number;
  name: string;
  avatar: string;
  amount: string;
}

export interface ExpenseDetailsResponseInterface {
  id: number;
  image?: string;
  shop: string;
  amount: string;
  date: string;
  additionalInfo?: string;
  payers: ExpenseDetailsPayersInterface[];
}
