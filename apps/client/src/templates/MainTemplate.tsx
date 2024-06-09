import type { ReactElement, ReactNode } from "react";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pl";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ThemeProvider from "theme/ThemeProvider";
import GlobalStyles from "theme/GlobalStyles";
import Navbar from "components/organisms/Navbar/Navbar";
import BottomNavigation from "components/organisms/BottomNavigation/BottomNavigation";
import { BillContextProvider } from "contexts/BillContext";
import ErrorBoundary from "./ErrorBoundary";

interface IProps {
  children: ReactNode;
}

function MainTemplate({ children }: IProps): ReactElement {
  return (
    <ErrorBoundary>
      <LocalizationProvider adapterLocale="pl" dateAdapter={AdapterDayjs}>
        <ThemeProvider>
          <CssBaseline />
          <GlobalStyles />
          <Navbar />
          <Box
            display="flex"
            flexDirection="column"
            minHeight="calc(100vh - 56px)"
            pb={7}
          >
            <BillContextProvider>{children}</BillContextProvider>
          </Box>
          <BottomNavigation />
        </ThemeProvider>
      </LocalizationProvider>
    </ErrorBoundary>
  );
}

export default MainTemplate;
