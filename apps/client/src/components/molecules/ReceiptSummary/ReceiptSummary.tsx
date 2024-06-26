import type { ReactElement } from 'react';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { countSplitAmount } from 'utils';
import { useBillContext } from 'contexts/BillContext';

interface IProps {
  split?: boolean;
}

function ReceiptSummary({ split = false }: IProps): ReactElement {
  const { shop, amount, payers } = useBillContext();
  let amountToShow = amount;

  if (split) {
    amountToShow = countSplitAmount(amount, payers);
  }

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexBasis: '50%',
        }}
      >
        <Typography color="text.secondary">Sklep</Typography>
        <Typography variant="h6">{shop.name}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexBasis: '50%',
        }}
      >
        <Typography color="text.secondary">{split ? 'Do podziału' : 'Wydałeś'}:</Typography>
        <Typography variant="h6">{amountToShow} PLN</Typography>
      </Box>
    </Box>
  );
}

export default ReceiptSummary;
