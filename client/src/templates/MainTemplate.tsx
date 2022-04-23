import React, { ReactElement, ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from 'theme/ThemeProvider';
import Navbar from 'components/organisms/Navbar/Navbar';
import ErrorBoundary from './ErrorBoundary';

interface Props {
  children: ReactNode;
}

const MainTemplate = ({ children }: Props): ReactElement => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <CssBaseline />
        <Navbar />
        {children}
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default MainTemplate;
