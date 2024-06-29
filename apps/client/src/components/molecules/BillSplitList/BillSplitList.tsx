import type { ReactElement } from 'react';
import React from 'react';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material';
import type { IParticipant } from '@repo/types';

interface IProps {
  payers?: IParticipant[];
  loading?: boolean;
}

const renderLoadingItems = () =>
  [...Array<null>(3).fill(null)].map((_, index) => (
    <ListItem
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      secondaryAction={
        <Typography>
          <Skeleton variant="text" sx={{ width: 40, display: 'inline-block' }} /> PLN
        </Typography>
      }
    >
      <ListItemAvatar>
        <Skeleton variant="circular" width={40} height={40} />
      </ListItemAvatar>
      <ListItemText
        primary={<Skeleton variant="text" sx={{ width: 80, display: 'inline-block' }} />}
      />
    </ListItem>
  ));

function BillSplitList({ payers = [], loading = false }: IProps): ReactElement {
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
        {loading
          ? renderLoadingItems()
          : payers.map((payer) => {
              const fullName = `${payer.name} ${payer.surname}`;

              return (
                <ListItem
                  key={payer.id}
                  secondaryAction={<Typography>{payer.total_amount} PLN</Typography>}
                >
                  <ListItemAvatar>
                    <Avatar alt={fullName} src={payer.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={fullName} />
                </ListItem>
              );
            })}
      </List>
    </>
  );
}

export default BillSplitList;
