import type { ReactElement } from 'react';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Divider, List } from '@mui/material';
import HistoryListItem from 'components/molecules/HistoryListItem/HistoryListItem';
import type { IHistoryResponse } from 'interfaces';
import { RouteEnum } from 'enums';
import styles from './styles';

const data = [
  {
    id: 0,
    label: 'Zwrot kosztów',
    amount: 20.23,
    paidBy: 'Maria',
    avatars: ['https://mui.com/static/images/avatar/3.jpg'],
    refund: true,
  },
  {
    id: 1,
    label: 'Zwrot kosztów',
    amount: -500,
    paidBy: 'Elżbieta',
    avatars: ['https://mui.com/static/images/avatar/4.jpg'],
    refund: true,
  },
  {
    id: 8,
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
    paidBy: 'Maria',
    avatars: [
      'https://avatars.githubusercontent.com/u/86574268?v=4',
      'https://mui.com/static/images/avatar/3.jpg',
    ],
    refund: false,
  },
  {
    id: 4,
    label: 'Zwrot kosztów',
    amount: 20.23,
    paidBy: 'Maria',
    avatars: ['https://mui.com/static/images/avatar/5.jpg'],
    refund: true,
  },
  {
    id: 5,
    label: 'Zwrot kosztów',
    amount: -500,
    paidBy: 'Elżbieta',
    avatars: ['https://mui.com/static/images/avatar/6.jpg'],
    refund: true,
  },
  {
    id: 6,
    label: 'Biedronka',
    amount: 52.39,
    paidBy: 'Ja',
    avatars: [
      'https://avatars.githubusercontent.com/u/86574268?v=4',
      'https://mui.com/static/images/avatar/5.jpg',
      'https://mui.com/static/images/avatar/6.jpg',
    ],
    refund: false,
  },
  {
    id: 7,
    label: 'Lidl',
    amount: 32.99,
    paidBy: 'Maria',
    avatars: [
      'https://avatars.githubusercontent.com/u/86574268?v=4',
      'https://mui.com/static/images/avatar/3.jpg',
    ],
    refund: false,
  },
] as IHistoryResponse[];

interface IProps {
  preview?: boolean;
}

function HistoryList({ preview = false }: IProps): ReactElement {
  const preparedData = preview ? data.slice(0, 4) : data;

  return (
    <Box>
      <List sx={styles.list} dense>
        {preparedData.map(({ id, label, amount, paidBy, avatars, refund }, i: number) => (
          <Fragment key={id}>
            <HistoryListItem
              id={id}
              label={label}
              amount={amount}
              paidBy={paidBy}
              avatars={avatars}
              refund={refund}
              preview={preview}
            />
            {i < data.length - 1 && <Divider component="li" />}
          </Fragment>
        ))}
      </List>
      {preview ? (
        <Button
          component={Link}
          to={RouteEnum.HISTORY}
          sx={{
            width: '100%',
          }}
        >
          Pełna historia
        </Button>
      ) : null}
    </Box>
  );
}

export default HistoryList;
