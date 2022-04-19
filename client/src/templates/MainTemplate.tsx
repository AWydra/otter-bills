import React, { ReactElement, ReactNode } from 'react';
import ThemeProvider from 'theme/ThemeProvider';
import ErrorBoundary from './ErrorBoundary';

interface Props {
  children: ReactNode;
}

const MainTemplate = ({ children }: Props): ReactElement => {
  return (
    <ErrorBoundary>
      <ThemeProvider>{children}</ThemeProvider>
    </ErrorBoundary>
  );
};

export default MainTemplate;
