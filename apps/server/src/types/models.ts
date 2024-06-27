export interface IUserModel {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface ITransactionModel {
  id: number;
  payer_id: number;
  store_id: number;
  total_amount: number;
  purchase_date: Date;
  photo: string;
  description: string;
  created_at: Date;
}

export interface ITransactionParticipantModel {
  id: number;
  transaction_id: number;
  participant_id: number;
  own_amount: number;
  splits_receipt: boolean;
}
