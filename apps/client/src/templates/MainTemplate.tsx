import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pl';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import ThemeProvider from 'theme/ThemeProvider';
import GlobalStyles from 'theme/GlobalStyles';
import Navbar from 'components/organisms/Navbar/Navbar';
import BottomNavigation from 'components/organisms/BottomNavigation/BottomNavigation';
import { BillContextProvider } from 'contexts/BillContext';
import ExpenseDetailsDialog from 'components/organisms/Dialogs/ExpenseDetailsDialog/ExpenseDetailsDialog';
import { AuthContextProvider } from 'contexts/AuthContext';
import { ToastContextProvider } from 'contexts/ToastContext';
import ErrorBoundary from './ErrorBoundary';

interface IProps {
  children: ReactNode;
}

function MainTemplate({ children }: IProps): ReactElement {
  return (
    <ErrorBoundary>
      <LocalizationProvider
        adapterLocale="pl"
        dateAdapter={AdapterDayjs}
        localeText={{
          cancelButtonLabel: 'Anuluj',
          datePickerToolbarTitle: 'Wybierz datę',
          okButtonLabel: 'Zatwierdź',
        }}
      >
        <SnackbarProvider maxSnack={3}>
          <AuthContextProvider>
            <ThemeProvider>
              <ToastContextProvider>
                <CssBaseline />
                <GlobalStyles />
                <Navbar />
                <Box display="flex" flexDirection="column" minHeight="calc(100vh - 56px)" pb={7}>
                  <BillContextProvider>
                    {children}
                    <ExpenseDetailsDialog />
                  </BillContextProvider>
                </Box>
                <BottomNavigation />
              </ToastContextProvider>
            </ThemeProvider>
          </AuthContextProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    </ErrorBoundary>
  );
}

export default MainTemplate;
