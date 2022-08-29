import React, { ReactElement, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Divider, List } from '@mui/material';
import HistoryListItem from 'components/molecules/HistoryListItem/HistoryListItem';
import { HistoryResponseInterface } from 'interfaces';
import { RouteEnum } from 'enums';
import styles from './styles';

const data = [
  {
    id: 0,
    label: 'Zwrot kosztów',
    amount: 20.23,
    paidBy: 'Patrycja',
    avatars: ['https://mui.com/static/images/avatar/3.jpg'],
    refund: true,
  },
  {
    id: 1,
    label: 'Zwrot kosztów',
    amount: -500,
    paidBy: 'Goha',
    avatars: ['https://mui.com/static/images/avatar/4.jpg'],
    refund: true,
  },
  {
    id: 2,
    label: 'Biedronka',
    amount: 52.39,
    paidBy: 'Ja',
    avatars: [
      'https://avatars.githubusercontent.com/u/86574268?v=4',
      'https://mui.com/static/images/avatar/3.jpg',
      'https://mui.com/static/images/avatar/4.jpg',
    ],
    refund: false,
  },
  {
    id: 3,
    label: 'Lidl',
    amount: 32.99,
    paidBy: 'Patrycja',
    avatars: [
      'https://avatars.githubusercontent.com/u/86574268?v=4',
      'https://mui.com/static/images/avatar/3.jpg',
    ],
    refund: false,
  },
] as HistoryResponseInterface[];

interface Props {
  preview?: boolean;
}

const HistoryList = ({ preview = false }: Props): ReactElement => {
  return (
    <Box>
      <List sx={styles.list} dense>
        {data.map(({ id, label, amount, paidBy, avatars, refund }, i: number) => (
          <Fragment key={id}>
            <HistoryListItem
              id={id}
              label={label}
              amount={amount}
              paidBy={paidBy}
              avatars={avatars}
              refund={refund}
            />
            {i < data.length - 1 && <Divider component="li" />}
          </Fragment>
        ))}
      </List>
      {preview && (
        <Button
          component={Link}
          to={RouteEnum.HISTORY}
          sx={{
            width: '100%',
          }}
        >
          Pełna historia
        </Button>
      )}
    </Box>
  );
};

export default HistoryList;
