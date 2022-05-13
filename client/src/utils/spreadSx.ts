import { SxProps, Theme } from '@mui/material/styles';

export const spreadSx = (...sx: SxProps<Theme>[]) => {
  const arr: SxProps<Theme> = [];

  sx.forEach((styles) => {
    if (Array.isArray(styles)) {
      styles.forEach((style) => arr.push(style));
    } else {
      arr.push(styles);
    }
  });
  return arr;
};
