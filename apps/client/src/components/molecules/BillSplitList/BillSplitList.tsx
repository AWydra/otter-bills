import type { ReactElement } from 'react';
import React from 'react';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import type { IExpenseDetails } from 'interfaces';

interface IProps {
  payers: IExpenseDetails[];
}

function BillSplitList({ payers }: IProps): ReactElement {
  return (
    <>
      <Box
        sx={{
          paddingLeft: (theme) => theme.spacing(2),
          display: 'flex',
        }}
      >
        <Typography variant="h6">Podział rachunku</Typography>
      </Box>
      <List dense sx={{ width: '100%' }}>
        {payers.map((payer) => {
          return (
            <ListItem key={payer.id} secondaryAction={<Typography>{payer.amount} PLN</Typography>}>
              <ListItemAvatar>
                <Avatar alt={payer.name} src={payer.avatar} />
              </ListItemAvatar>
              <ListItemText primary={payer.name} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default BillSplitList;
