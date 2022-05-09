import React, { ReactElement, ReactNode } from 'react';
import { Typography, SxProps, Theme } from '@mui/material';
import { spreadSx } from 'utils/spreadSx';
import styles from './styles';

interface Props {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

const Title = ({ children, sx = {} }: Props): ReactElement => (
  <Typography sx={spreadSx(styles.title, sx)}>{children}</Typography>
);

export default Title;
