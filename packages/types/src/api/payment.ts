export enum PaymentMethod {
  CASH = 'CASH',
  TRANSFER = 'TRANSFER',
}

export interface ICreatePaymentRequestData {
  payeeId: number;
  paymentMethod: PaymentMethod;
  amount: number;
}
