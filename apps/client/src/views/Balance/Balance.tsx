import type { ReactElement } from 'react';
import React from 'react';
import { Box } from '@mui/material';
import BalanceList from 'components/molecules/BalanceList/BalanceList';
import { BalanceListEnum } from 'enums';

function Balance(): ReactElement {
  return <Box
    sx={{
      padding: 2,
    }}
  >
    <BalanceList type={BalanceListEnum.RECEIVABLES} />
    <BalanceList type={BalanceListEnum.PAYABLES} />
  </Box>
}

export default Balance;
