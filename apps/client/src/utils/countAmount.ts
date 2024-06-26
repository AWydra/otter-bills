import type { IPayer } from '@repo/types';
import { amountToNumber } from './formatAmount';

export const countSplitAmount = (amount: string, payers: IPayer[]) => {
  const amounts = payers.map((payer) => amountToNumber(payer.amount));
  const totalAmount = amounts.reduce((a, b) => a + b, 0);
  const splitAmount = amountToNumber(amount) - totalAmount;
  return splitAmount.toFixed(2);
};
