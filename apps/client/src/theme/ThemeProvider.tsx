import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import type {
  Theme} from '@mui/material/styles';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  responsiveFontSizes
} from '@mui/material/styles';
import theme from './theme';

interface Props {
  children: ReactNode;
}

function ThemeProvider({ children }: Props): ReactElement {
  const mainTheme: Theme = responsiveFontSizes(createTheme(theme));
  return <MuiThemeProvider theme={mainTheme}>{children}</MuiThemeProvider>;
}

export default ThemeProvider;
