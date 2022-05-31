import React, { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from 'hooks';

const ReceiptSummary = (): ReactElement => {
  const shop = useAppSelector((state) => state.bill.shop);
  const amount = useAppSelector((state) => state.bill.amount);

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
        <Typography color="text.secondary">Wydałeś:</Typography>
        <Typography variant="h6">{amount} PLN</Typography>
      </Box>
    </Box>
  );
};

export default ReceiptSummary;
