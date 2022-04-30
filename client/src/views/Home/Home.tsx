import React, { ReactElement } from 'react';
import { Box, Button, Link as MuiLink, Typography } from '@mui/material';
import ExpenseCard from 'components/molecules/ExpenseCard/ExpenseCard';
import HistoryList from 'components/organisms/HistoryList/HistoryList';
import { Link } from 'react-router-dom';
import styles from './styles';

const Home = (): ReactElement => {
  return (
    <Box sx={styles.container}>
      <Box display="grid" sx={styles.cardContainer}>
        <ExpenseCard label="Należności" color="success.main" amount="2137" />
        <ExpenseCard label="Zobowiązania" color="error.main" amount="69" />
      </Box>
      <MuiLink component={Link} to="/details" variant="body2" sx={styles.detailsButton}>
        Szczegóły
      </MuiLink>
      <Button variant="contained" sx={styles.addButton}>
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
