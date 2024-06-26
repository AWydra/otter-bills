import type { ReactElement } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Link as MuiLink, Typography } from '@mui/material';
import ExpenseCard from 'components/molecules/ExpenseCard/ExpenseCard';
import HistoryList from 'components/organisms/HistoryList/HistoryList';
import { RouteEnum } from 'enums';
import styles from './styles';

function Home(): ReactElement {
  return (
    <Box sx={styles.container}>
      <Box component={Link} to={RouteEnum.BALANCE} display="grid" sx={styles.cardContainer}>
        <ExpenseCard label="Należności" color="success.main" amount="2137" />
        <ExpenseCard label="Zobowiązania" color="error.main" amount="69" />
      </Box>
      <MuiLink component={Link} to={RouteEnum.BALANCE} variant="body2" sx={styles.detailsButton}>
        Szczegóły
      </MuiLink>
      <Button
        component={Link}
        to={`${RouteEnum.ADD_RECEIPT}/1`}
        variant="contained"
        sx={styles.addButton}
      >
        Dodaj rachunek
      </Button>

      <Typography variant="body2" color="text.secondary">
        Ostatnie operacje
      </Typography>
      <HistoryList preview />
    </Box>
  );
}

export default Home;
