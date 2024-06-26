import type { ReactElement } from 'react';
import React, { useState } from 'react';
import {
  Box,
  Input,
  InputAdornment,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  IconButton,
} from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import AutoWidthInput from 'components/molecules/AutoWidthInput/AutoWidthInput';
import ExpenseDialog from 'components/organisms/Dialogs/ExpenseDialog/ExpenseDialog';
import UserAvatar from 'components/atoms/UserAvatar/UserAvatar';

interface IProps {
  payerName: string;
  avatarUrl?: string;
  name: string;
  onBlur: () => void;
  onChange: (...event: any[]) => void;
  value: string;
  error?: boolean;
}

function ExpenseItem({
  payerName,
  avatarUrl,
  name,
  onBlur,
  onChange,
  value,
  error = false,
}: IProps): ReactElement {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const onFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    onBlur();
    return setTimeout(() => {
      setFocused(false);
    }, 1);
  };

  return (
    <>
      <ListItem sx={{ px: 0 }} alignItems="center">
        <ListItemAvatar sx={{ minWidth: (theme) => theme.spacing(6) }}>
          <UserAvatar name={payerName} src={avatarUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                {payerName}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {focused ? (
                  <IconButton
                    color="primary"
                    component="span"
                    sx={{ width: (theme) => theme.spacing(4), height: (theme) => theme.spacing(4) }}
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <CalculateIcon />
                  </IconButton>
                ) : null}
                <Input
                  // @ts-expect-error Unable to extend MUI's InputBaseComponentProps interface
                  inputComponent={AutoWidthInput}
                  name={name}
                  value={value}
                  error={error}
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={handleBlur}
                  placeholder="0"
                  sx={{
                    '& input': {
                      maxWidth: (theme) => theme.spacing(9.5),
                      textAlign: 'right',
                      pl: 0.5,
                      pr: 4.5,
                      zIndex: 1,
                      color: (theme) => (error ? theme.palette.error.main : 'inherit'),
                    },
                  }}
                  endAdornment={
                    <InputAdornment
                      sx={{
                        position: 'absolute',
                        right: 0,
                      }}
                      position="end"
                    >
                      PLN
                    </InputAdornment>
                  }
                  aria-describedby="standard-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                  autoComplete="off"
                />
              </Box>
            </Box>
          }
        />
      </ListItem>
      {open ? (
        <ExpenseDialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          setValue={onChange}
        />
      ) : null}
    </>
  );
}

export default ExpenseItem;
