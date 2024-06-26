import type { ReactElement } from 'react';
import React from 'react';
import { Typography, Paper } from '@mui/material';

interface IProps {
  label: string;
  color: string;
  amount: string;
}

function ExpenseCard({ label, color, amount }: IProps): ReactElement {
  return (
    <Paper
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        p: 2,
        mb: 1,
      }}
      elevation={2}
    >
      <Typography sx={{ color: 'text.secondary' }}>{label}</Typography>
      <Typography sx={{ color, fontSize: 16, fontWeight: 'medium' }}>{amount} PLN</Typography>
    </Paper>
  );
}

export default ExpenseCard;
