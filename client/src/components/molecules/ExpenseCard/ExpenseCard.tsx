import React, { ReactElement } from 'react';
import { Typography, Paper } from '@mui/material';

interface Props {
  label: string;
  color: string;
  amount: string;
}

const ExpenseCard = ({ label, color, amount }: Props): ReactElement => {
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
};

export default ExpenseCard;
