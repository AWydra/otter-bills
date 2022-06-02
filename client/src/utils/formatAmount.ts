export const formatAmount = (amount: string) => {
  const hasComma = amount.includes(',');
  const number = Number(amount.replace(',', '.'));
  const formatted = number.toFixed(2);

  return hasComma ? formatted.replace('.', ',') : formatted;
};

export const amountToNumber = (amount: string) => Number(amount.replace(',', '.'));
