import React, { ReactElement } from 'react';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { ExpenseDetailsPayersInterface } from 'interfaces';

interface Props {
  payers: ExpenseDetailsPayersInterface[];
}

const BillSplitList = ({ payers }: Props): ReactElement => (
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

export default BillSplitList;
