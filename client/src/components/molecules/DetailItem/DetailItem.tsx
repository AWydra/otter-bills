import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';

interface Props {
  icon?: ReactElement;
  title: string;
  content?: string;
  block?: boolean;
}

const DetailItem = ({ icon, title, content, block = false }: Props): ReactElement | null => {
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
        {icon && (
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
        )}
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Typography
        sx={{
          paddingLeft: (theme) => theme.spacing(block && icon ? 4 : 0),
        }}
        color={`text.${block ? 'secondary' : 'primary'}`}
      >
        {content}
      </Typography>
    </Box>
  );
};

export default DetailItem;
