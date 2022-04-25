import React, { ReactElement, ReactNode } from 'react';
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
      <ThemeProvider>
        <CssBaseline />
        <GlobalStyles />
        <Navbar />
        <Box mb={8}>{children}</Box>
        <BottomNavigation />
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default MainTemplate;
