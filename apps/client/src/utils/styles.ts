import type { SxProps, Theme } from '@mui/material/styles';

export const spreadSx = (...sx: SxProps<Theme>[]) => {
  const arr: SxProps<Theme>[] = [];

  sx.forEach((styles) => {
    if (Array.isArray(styles)) {
      styles.forEach((style: SxProps<Theme>) => arr.push(style));
    } else {
      arr.push(styles);
    }
  });
  return arr as SxProps<Theme>;
};

export const styleCondition = <T, U>(condition: boolean, ifTrue: T, ifFalse: U) => {
  if (condition) {
    return ifTrue;
  }

  return ifFalse;
};
