import type { ThemeOptions } from '@mui/material';

const mainTheme: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1280,
    },
  },
  palette: {
    primary: {
      main: '#5858ff',
    },
    secondary: {
      main: '#f50057',
    },
  },
};

export default mainTheme;
