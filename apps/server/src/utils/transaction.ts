import type { ICreateTransactionRequestData, IPayer } from '@repo/types';
import type { ITransactionParticipant } from 'types/transaction';

// TODO move those functions to shared utils
export const amountToNumber = (amount?: string) =>
  Number(typeof amount === 'string' ? amount.replace(',', '.') : 0);

export const countSplitAmount = (amount: string, payers: IPayer[]) => {
  const amounts = payers.map((payer) => amountToNumber(payer.amount));
  const totalAmount = amounts.reduce((a, b) => a + b, 0);
  const splitAmount = amountToNumber(amount) - totalAmount;
  return splitAmount.toFixed(2);
};

export const formatTransactionData = (data: ICreateTransactionRequestData) => {
  const splitParticipants = data.payers.filter((payer) => JSON.parse(String(payer.splitsReceipt)));
  const splitAmount = amountToNumber(countSplitAmount(String(data.amount), data.payers));

  // Move to shared
  const countPayerSplitAmount = (payer: IPayer) => {
    const payerAmount = amountToNumber(payer.amount || '0');
    if (!splitParticipants.length) return payer.amount || '0';
    const devidedAmount = splitAmount / splitParticipants.length;
    return payer.splitsReceipt ? (payerAmount + devidedAmount).toFixed(2) : payer.amount || '0';
  };

  // Make sure splitsReceipt is a boolean
  data.payers = data.payers.map((payer) => ({
    ...payer,
    splitsReceipt: JSON.parse(String(payer.splitsReceipt)) as boolean,
  }));

  const payers: ITransactionParticipant[] = data.payers.map((payer) => ({
    id: Number(payer.id),
    amount: amountToNumber(payer.amount),
    totalAmount: Number(countPayerSplitAmount(payer)),
    splitsReceipt: payer.splitsReceipt,
  }));

  return {
    ...data,
    amount: amountToNumber(data.amount),
    date: new Date(data.date).toISOString(),
    shop: {
      id: Number(data.shop.id),
      name: data.shop.name,
    },
    payers,
  };
};
