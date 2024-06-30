import type { ReactElement } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import AmountChip from 'components/atoms/AmountChip/AmountChip';
import { balaceCondition } from 'utils/balaceCondition';
import type { IBalanceResponse } from 'interfaces';
import type { BalanceListEnum } from 'enums';
import { RouteEnum } from 'enums';
import UserAvatar from 'components/atoms/UserAvatar/UserAvatar';

const data = [
  {
    id: 0,
    name: 'Maria Kowalska',
    amount: '12,42',
    avatar: 'https://i.pravatar.cc/300?img=1',
  },
  {
    id: 1,
    name: 'Elżbieta Nowak',
    amount: '82,39',
    avatar: 'https://i.pravatar.cc/300?img=2',
  },
  {
    id: 2,
    name: 'Ktoś inny',
    amount: '41,82',
    avatar: '',
  },
] as IBalanceResponse[];

interface IProps {
  type: BalanceListEnum;
}

function BalanceList({ type }: IProps): ReactElement {
  const navigate = useNavigate();
  const header = balaceCondition(type, 'Należności', 'Zobowiązania');

  const handlePayment = (payer: IBalanceResponse) => {
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
                onClick={() => {
                  handlePayment({ id, name, amount, avatar });
                }}
              >
                {balaceCondition(type, null, <PaymentIcon />)}
              </IconButton>
            }
            disablePadding
          >
            <ListItemAvatar>
              <UserAvatar name={name} src={avatar} />
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
}

export default BalanceList;
