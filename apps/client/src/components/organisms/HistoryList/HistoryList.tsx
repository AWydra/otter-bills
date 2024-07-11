import type { ReactElement } from 'react';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Divider, List } from '@mui/material';
import HistoryListItem from 'components/molecules/HistoryListItem/HistoryListItem';
import type { IHistoryResponse } from 'interfaces';
import { RouteEnum } from 'enums';
import {
  HistoryItemType,
  PaymentMethod,
  type IHistoryPaymentItem,
  type IHistoryTransactionItem,
} from '@repo/types';
import { useHistoryServices } from 'services/useHistoryServices';
import useToastContext from 'hooks/useToastContext';
import useAuthContext from 'hooks/useAuthContext';
import styles from './styles';

interface IProps {
  preview?: boolean;
}

function HistoryList({ preview = false }: IProps): ReactElement {
  const [items, setItems] = useState<(IHistoryTransactionItem | IHistoryPaymentItem)[]>([]);
  const { getLatestHistory } = useHistoryServices();
  const toast = useToastContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchLatestHistory = async () => {
      try {
        const response = await getLatestHistory();
        setItems(response.data.items);
      } catch (error) {
        toast.error('Błąd podczas pobierania historii transakcji');
      }
    };

    fetchLatestHistory();
  }, []);

  return (
    <Box>
      <List sx={styles.list} dense>
        {items.map((data, i) => {
          if (data.type === HistoryItemType.PAYMENT) {
            const { id, payer, payee, amount, payment_method: paymentMethod } = data;

            const participant = payer.id === user?.id ? payee : payer;

            return (
              <Fragment key={id}>
                <HistoryListItem
                  id={id}
                  label={`Zwrot kosztów ${paymentMethod === PaymentMethod.CASH ? 'gotówką' : 'przelewem'}`}
                  amount={amount}
                  paidBy={participant}
                  isCurrentUserPayer={payer.id === user?.id}
                  participants={[participant]}
                  isPayment
                />
                {i < items.length - 1 && <Divider component="li" />}
              </Fragment>
            );
          }

          const { id, payer, amount, participants, store_name: storeName } = data;

          return (
            <Fragment key={id}>
              <HistoryListItem
                id={id}
                label={storeName}
                amount={amount}
                paidBy={payer}
                isCurrentUserPayer={payer.id === user?.id}
                participants={participants}
              />
              {i < items.length - 1 && <Divider component="li" />}
            </Fragment>
          );

          return null;
        })}
        {/* {preparedData.map(({ id, label, amount, paidBy, avatars, refund }, i: number) => (
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
        ))} */}
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
