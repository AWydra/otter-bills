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
