/* eslint-disable react/no-array-index-key */
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { HistoryResponseInterface } from 'interfaces';
import { RouteEnum } from 'enums';

import {
  Avatar,
  AvatarGroup,
  Box,
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import styles from './styles';

interface Props extends HistoryResponseInterface {
  preview: boolean;
}

const HistoryListItem = ({
  id,
  label,
  amount,
  paidBy,
  avatars = [],
  refund,
  preview,
}: Props): ReactElement => {
  const navigate = useNavigate();

  return (
    <ListItem sx={styles.listItem}>
      <ListItemButton
        sx={styles.listItem_button}
        onClick={() => navigate(`${preview ? '' : RouteEnum.HISTORY}/${id}`)}
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
          secondaryTypographyProps={{ component: 'div' }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default HistoryListItem;
