import React, { ReactElement, ReactNode } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import plLocale from 'date-fns/locale/pl';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import ThemeProvider from 'theme/ThemeProvider';
import GlobalStyles from 'theme/GlobalStyles';
import Navbar from 'components/organisms/Navbar/Navbar';
import BottomNavigation from 'components/organisms/BottomNavigation/BottomNavigation';
import ErrorBoundary from './ErrorBoundary';

interface Props {
  children: ReactNode;
}

const MainTemplate = ({ children }: Props): ReactElement => {
  return (
    <ErrorBoundary>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
        <ThemeProvider>
          <CssBaseline />
          <GlobalStyles />
          <Navbar />
          <Box minHeight="calc(100vh - 56px)" display="flex" flexDirection="column" pb={7}>
            {children}
          </Box>
          <BottomNavigation />
        </ThemeProvider>
      </LocalizationProvider>
    </ErrorBoundary>
  );
};

export default MainTemplate;
