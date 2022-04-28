export interface HistoryResponseInterface {
  id: number;
  label: string;
  amount: number;
  paidBy: string;
  avatars?: string[];
  refund: boolean;
}
