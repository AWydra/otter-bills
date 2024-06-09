import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import type { SxProps, Theme } from '@mui/material';
import { Typography } from '@mui/material';
import { spreadSx } from 'utils';
import styles from './styles';

interface Props {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

function Title({ children, sx = {} }: Props): ReactElement {
  return <Typography sx={spreadSx(styles.title, sx)}>{children}</Typography>
}

export default Title;
