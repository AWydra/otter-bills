import React, { ReactElement } from 'react';
import { Box } from '@mui/material';
import { BalanceListEnum } from 'enums';
import { balaceCondition } from 'utils/balaceCondition';

interface Props {
  type: BalanceListEnum;
  amount: string;
}

const AmountChip = ({ type, amount }: Props): ReactElement => {
  const color = balaceCondition(type, 'success', 'error');

  return (
    <Box
      sx={(theme) => ({
        minWidth: theme.spacing(2.75),
        height: theme.spacing(2.75),
        padding: theme.spacing(0, 1),
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: `${theme.palette[color].main}27`,
        color: theme.palette[color].main,
        borderRadius: theme.spacing(0.75),
        lineHeight: 0,
        fontWeight: 700,
        fontSize: theme.typography.pxToRem(12),
      })}
    >
      {amount} PLN
    </Box>
  );
};

export default AmountChip;
