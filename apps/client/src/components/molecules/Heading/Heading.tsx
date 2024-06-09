import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import type { SxProps, Theme } from '@mui/material';
import { Box } from '@mui/material';
import Title from 'components/atoms/Title/Title';
import Subtitle from 'components/atoms/Subtitle/Subtitle';
import { spreadSx } from 'utils';
import styles from './styles';

interface Props {
  title: ReactNode;
  subtitle?: ReactNode;
  sx?: SxProps<Theme>;
}

function Heading({ title, subtitle = '', sx = {} }: Props): ReactElement {
  return <Box sx={spreadSx(styles.heading, sx)}>
    <Title>{title}</Title>
    {subtitle ? <Subtitle sx={styles.subtitle}>{subtitle}</Subtitle> : null}
  </Box>
}

export default Heading;
