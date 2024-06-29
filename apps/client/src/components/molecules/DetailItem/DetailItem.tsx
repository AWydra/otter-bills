import { Box, Skeleton, Typography } from '@mui/material';
import type { ReactElement } from 'react';
import React from 'react';

interface IProps {
  icon?: ReactElement;
  title: string;
  content?: string;
  block?: boolean;
  loading?: boolean;
}

function DetailItem({
  icon,
  title,
  content,
  block = false,
  loading = false,
}: IProps): ReactElement | null {
  if (!content) return null;

  return (
    <Box
      sx={{
        display: block ? 'block' : 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
        }}
      >
        {icon ? (
          <Box
            sx={(theme) => ({
              marginRight: theme.spacing(1),
              display: 'flex',
              alignItems: 'center',
              color: theme.palette.primary.main,
            })}
          >
            {icon}
          </Box>
        ) : null}
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Typography
        sx={{
          paddingLeft: (theme) => theme.spacing(block && icon ? 4 : 0),
        }}
        color={`text.${block ? 'secondary' : 'primary'}`}
      >
        {loading ? (
          <Skeleton variant="text" sx={{ minWidth: (theme) => theme.spacing(10) }} />
        ) : (
          content
        )}
      </Typography>
    </Box>
  );
}

export default DetailItem;
