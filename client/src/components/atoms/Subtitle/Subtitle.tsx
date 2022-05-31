import React, { ReactElement, ReactNode } from 'react';
import { Typography, SxProps, Theme } from '@mui/material';
import { spreadSx } from 'utils';
import styles from './styles';

interface Props {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

const Subtitle = ({ children, sx = {} }: Props): ReactElement => (
  <Typography sx={spreadSx(styles.subtitle, sx)}>{children}</Typography>
);

export default Subtitle;
