import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HistoryIcon from '@mui/icons-material/History';
import { RouteEnum } from 'enums';

const hideOnRoutes = [RouteEnum.LOGIN];

const BottomNavigation = () => {
  const location = useLocation();
  const [visible, setVisible] = useState<boolean>(true);
  const [value, setValue] = useState<string>(location.pathname);

  useEffect(() => {
    const newValue = location.pathname.includes(RouteEnum.ADD_RECEIPT)
      ? RouteEnum.ADD_RECEIPT
      : location.pathname.includes(RouteEnum.HISTORY)
      ? RouteEnum.HISTORY
      : location.pathname;
    setValue(newValue);
  }, [location.pathname]);

  useEffect(() => {
    if (hideOnRoutes.includes(location.pathname as RouteEnum)) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [location.pathname]);

  return !visible ? null : (
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
          icon={<ReceiptLongIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to={RouteEnum.BALANCE}
          value={RouteEnum.BALANCE}
          label="Bilans"
          icon={<AccountBalanceWalletIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to={RouteEnum.HISTORY}
          value={RouteEnum.HISTORY}
          label="Historia"
          icon={<HistoryIcon />}
        />
      </MuiBottomNavigation>
    </Paper>
  );
};

export default BottomNavigation;
