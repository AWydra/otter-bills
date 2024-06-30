/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import type { ReactElement } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  AvatarGroup,
  Box,
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import type { IHistoryResponse } from 'interfaces';
import { RouteEnum } from 'enums';
import styles from './styles';

interface IProps extends IHistoryResponse {
  preview: boolean;
}

function HistoryListItem({
  id,
  label,
  amount,
  paidBy,
  avatars = [],
  refund,
}: IProps): ReactElement {
  const navigate = useNavigate();

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
              {avatars.length ? (
                <AvatarGroup max={4} sx={styles.listItem_avatarGroup}>
                  {/* TODO Remove index as the key */}
                  {avatars.map((avatar, i) => (
                    <Avatar key={i} src={avatar} />
                  ))}
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
