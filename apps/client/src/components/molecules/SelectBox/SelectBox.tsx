import { ButtonBase, lighten, Typography } from '@mui/material';
import type { ReactElement } from 'react';
import React from 'react';
import { styleCondition } from 'utils';

interface IProps {
  icon: ReactElement;
  label: string;
  selected?: boolean;
  onClick: () => void;
}

function SelectBox({ icon, label, selected = false, onClick }: IProps): ReactElement {
  return (
    <ButtonBase
      sx={(theme) => ({
        padding: theme.spacing(4, 1, 1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid',
        borderColor: styleCondition(selected, theme.palette.primary.main, theme.palette.grey[600]),
        borderRadius: 2,
        backgroundColor: styleCondition(selected, lighten(theme.palette.primary.main, 0.9), ''),
        transition: 'all 0.1s ease-in-out',
        '& svg': {
          width: theme.spacing(8),
          height: theme.spacing(8),
          color: styleCondition(selected, theme.palette.primary.main, theme.palette.grey[400]),
        },
      })}
      onClick={onClick}
    >
      {icon}
      <Typography
        variant="h6"
        sx={(theme) => ({
          marginTop: theme.spacing(3),
          color: styleCondition(selected, 'inherit', theme.palette.grey[600]),
        })}
      >
        {label}
      </Typography>
    </ButtonBase>
  );
}

export default SelectBox;
