import React, { ReactElement, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { RouteEnum } from 'enums';

const BottomNavigation = (): ReactElement => {
  const location = useLocation();
  const [value, setValue] = useState<string>(location.pathname);

  useEffect(() => {
    const newValue = location.pathname.includes(RouteEnum.ADD_RECEIPT)
      ? RouteEnum.ADD_RECEIPT
      : location.pathname;
    setValue(newValue);
  }, [location.pathname]);

  return (
    <Paper elevation={3} sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <MuiBottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={Link}
          to={RouteEnum.HOME}
          value={RouteEnum.HOME}
          label="Start"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to={`${RouteEnum.ADD_RECEIPT}/1`}
          value={RouteEnum.ADD_RECEIPT}
          label="Dodaj"
          icon={<AddIcon />}
        />

        <BottomNavigationAction
          component={Link}
          to={RouteEnum.BALANCE}
          value={RouteEnum.BALANCE}
          label="Bilans"
          icon={<AccountBalanceWalletIcon />}
        />
        <BottomNavigationAction label="Page 4" icon={<FavoriteIcon />} />
      </MuiBottomNavigation>
    </Paper>
  );
};

export default BottomNavigation;
