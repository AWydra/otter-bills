import React, { ReactElement } from 'react';
import { Box } from '@mui/material';
import BalanceList from 'components/molecules/BalanceList/BalanceList';
import { BalanceListEnum } from 'enums';

const Balance = (): ReactElement => (
  <Box
    sx={{
      padding: 2,
    }}
  >
    <BalanceList type={BalanceListEnum.RECEIVABLES} />
    <BalanceList type={BalanceListEnum.PAYABLES} />
  </Box>
);

export default Balance;
