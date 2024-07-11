/* eslint-disable react/no-array-index-key */
import type { ReactElement } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AvatarGroup,
  Box,
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import UserAvatar from 'components/atoms/UserAvatar/UserAvatar';
import type { IHistoryUser } from '@repo/types';
import { amountToNumber } from 'utils';
import styles from './styles';

interface IProps {
  id: number;
  label: string;
  amount: string;
  paidBy: IHistoryUser;
  participants: IHistoryUser[];
  isCurrentUserPayer: boolean;
  isPayment?: boolean;
}

function HistoryListItem({
  id,
  label,
  amount,
  paidBy,
  participants,
  isCurrentUserPayer,
  isPayment,
}: IProps): ReactElement {
  const navigate = useNavigate();
  const numberAmount = amountToNumber(amount);

  return (
    <ListItem sx={styles.listItem}>
      <ListItemButton
        sx={styles.listItem_button}
        onClick={() => {
          navigate(`?transactionId=${id}`);
        }}
      >
        <ListItemText
          primary={
            <Box sx={styles.listItem_primary}>
              <Typography component="span" variant="body1">
                {label}
              </Typography>
              <Typography component="span" variant="body1">
                {Math.abs(numberAmount).toLocaleString('PL-pl', { minimumFractionDigits: 2 })} zł
              </Typography>
            </Box>
          }
          secondary={
            <Box sx={styles.listItem_secondary}>
              <Typography component="span" variant="body2" color="text.secondary">
                {isPayment && isCurrentUserPayer ? 'Zapłacone dla' : isPayment && 'Otrzymane od'}
                {!isPayment && 'Zapłacone przez'} <b>{paidBy.name}</b>
              </Typography>
              {participants.length ? (
                <AvatarGroup max={4} sx={styles.listItem_avatarGroup}>
                  {participants.map((participant, i) => {
                    const name = `${participant.name} ${participant.surname}`;
                    return <UserAvatar key={i} src={participant.avatar} name={name} />;
                  })}
                </AvatarGroup>
              ) : null}
            </Box>
          }
          secondaryTypographyProps={{ component: 'div' }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default HistoryListItem;
