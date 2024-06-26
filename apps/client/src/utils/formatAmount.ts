export const formatAmount = (amount?: string) => {
  if (!amount) return amount;
  const number = Number(amount.replace(',', '.'));
  const formatted = number.toFixed(2);

  return formatted;
};

export const amountToNumber = (amount?: string) =>
  Number(typeof amount === 'string' ? amount.replace(',', '.') : 0);
