import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { BalanceResponseInterface } from 'interfaces';
import { BalanceListEnum, RouteEnum } from 'enums';
import { balaceCondition } from 'utils/balaceCondition';
import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@mui/material';
import AmountChip from 'components/atoms/AmountChip/AmountChip';
import PaymentIcon from '@mui/icons-material/Payment';

const data = [
  {
    id: 0,
    name: 'Patrycja Kubica',
    amount: '12,42',
    avatar: 'https://i.pravatar.cc/300?img=1',
  },
  {
    id: 1,
    name: 'Goha',
    amount: '82,39',
    avatar: 'https://i.pravatar.cc/300?img=2',
  },
  {
    id: 2,
    name: 'Ktoś inny',
    amount: '41,82',
    avatar: 'https://i.pravatar.cc/300?img=3',
  },
] as BalanceResponseInterface[];

interface Props {
  type: BalanceListEnum;
}

const BalanceList = ({ type }: Props): ReactElement => {
  const navigate = useNavigate();
  const header = balaceCondition(type, 'Należności', 'Zobowiązania');

  const handlePayment = (payer: BalanceResponseInterface) => {
    navigate(RouteEnum.PAYMENT, {
      state: payer,
    });
  };

  return (
    <List
      dense
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      subheader={
        <Typography pb={1} variant="h6">
          {header}
        </Typography>
      }
    >
      {data.map(({ id, name, amount, avatar }) => {
        const labelId = `checkbox-list-secondary-label-${id}`;
        return (
          <ListItem
            key={id}
            secondaryAction={
              <IconButton
                size="small"
                color="primary"
                aria-label="add"
                onClick={() => handlePayment({ id, name, amount, avatar })}
              >
                {balaceCondition(type, null, <PaymentIcon />)}
              </IconButton>
            }
            disablePadding
          >
            <ListItemAvatar>
              <Avatar alt={name} src={avatar} />
            </ListItemAvatar>
            <ListItemText
              id={labelId}
              primary={name}
              secondary={<AmountChip type={type} amount={amount} />}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default BalanceList;
