import React, { ReactElement } from 'react';
import { Box, Button, Link as MuiLink, Typography } from '@mui/material';
import ExpenseCard from 'components/molecules/ExpenseCard/ExpenseCard';
import HistoryList from 'components/organisms/HistoryList/HistoryList';
import { Link } from 'react-router-dom';

const Home = (): ReactElement => {
  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="grid"
        sx={{
          gap: 1,
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        <ExpenseCard label="Należności" color="success.main" amount="2137" />
        <ExpenseCard label="Zobowiązania" color="error.main" amount="69" />
      </Box>
      <MuiLink
        component={Link}
        to="/details"
        variant="body2"
        sx={{
          alignSelf: 'flex-end',
        }}
      >
        Szczegóły
      </MuiLink>
      <Button variant="contained" sx={{ my: 3 }}>
        Dodaj rachunek
      </Button>

      <Typography variant="body2" color="text.secondary">
        Ostatnie operacje
      </Typography>
      <HistoryList />
    </Box>
  );
};

export default Home;
