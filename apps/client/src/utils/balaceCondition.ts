import { BalanceListEnum } from 'enums';

export const balaceCondition = <T, Y>(type: BalanceListEnum, ifReceivables: T, ifPayables: Y) => {
  if (type === BalanceListEnum.RECEIVABLES) {
    return ifReceivables;
  }

  return ifPayables;
};
