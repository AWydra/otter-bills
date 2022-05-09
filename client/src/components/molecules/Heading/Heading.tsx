import React, { ReactElement, ReactNode } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import Title from 'components/atoms/Title/Title';
import Subtitle from 'components/atoms/Subtitle/Subtitle';
import { spreadSx } from 'utils/spreadSx';
import styles from './styles';

interface Props {
  title: ReactNode;
  subtitle?: ReactNode;
  sx?: SxProps<Theme>;
}

const Heading = ({ title, subtitle = '', sx = {} }: Props): ReactElement => (
  <Box sx={spreadSx(styles.heading, sx)}>
    <Title>{title}</Title>
    <Subtitle sx={styles.subtitle}>{subtitle}</Subtitle>
  </Box>
);

export default Heading;
