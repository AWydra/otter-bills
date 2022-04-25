import React, { ReactElement, ReactNode } from 'react';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  responsiveFontSizes,
  Theme,
} from '@mui/material/styles';
import theme from './theme';

type Props = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: Props): ReactElement => {
  const mainTheme: Theme = responsiveFontSizes(createTheme(theme));
  return <MuiThemeProvider theme={mainTheme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
