/* eslint-disable react/no-array-index-key */
import React, { ReactElement } from 'react';
import { HistoryResponseInterface } from 'interfaces';
import { Avatar, AvatarGroup, Box, Typography, ListItem, ListItemText } from '@mui/material';
import styles from './styles';

type Props = Omit<HistoryResponseInterface, 'id'>;

const HistoryListItem = ({ label, amount, paidBy, avatars = [], refund }: Props): ReactElement => {
  return (
    <ListItem sx={styles.listItem}>
      <ListItemText
        primary={
          <Box sx={styles.listItem_primary}>
            <Typography component="span" variant="body1">
              {label}
            </Typography>
            <Typography component="span" variant="body1">
              {Math.abs(amount).toLocaleString('PL-pl', { minimumFractionDigits: 2 })} zł
            </Typography>
          </Box>
        }
        secondary={
          <Box sx={styles.listItem_secondary}>
            <Typography component="span" variant="body2" color="text.secondary">
              {!refund ? 'Zapłacone przez' : amount > 0 ? 'Otrzymane od' : 'Zapłacone dla'}{' '}
              <b>{paidBy}</b>
            </Typography>
            {avatars && (
              <AvatarGroup max={4} sx={styles.listItem_avatarGroup}>
                {/* TODO Remove index as the key */}
                {avatars.map((avatar, i) => (
                  <Avatar key={i} src={avatar} />
                ))}
              </AvatarGroup>
            )}
          </Box>
        }
      />
    </ListItem>
  );
};

export default HistoryListItem;
