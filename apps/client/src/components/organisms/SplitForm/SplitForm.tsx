import type { ReactElement } from 'react';
import React from 'react';
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Checkbox,
} from '@mui/material';
import ReceiptSummary from 'components/molecules/ReceiptSummary/ReceiptSummary';
import type { IPayers } from 'interfaces';
import { amountToNumber, countSplitAmount } from 'utils';
import { useBillContext } from 'contexts/BillContext';

function SplitForm(): ReactElement {
  const { amount, payers, splitReceipt } = useBillContext();
  const splitParticipants = payers.filter((payer) => payer.splitsReceipt);
  const splitAmount = amountToNumber(countSplitAmount(amount, payers));

  const countPayerSplitAmount = (payer: IPayers) => {
    const payerAmount = amountToNumber(payer.amount || '0');
    if (!splitParticipants.length) return payer.amount || '0';
    const devidedAmount = splitAmount / splitParticipants.length;
    return payer.splitsReceipt ? (payerAmount + devidedAmount).toFixed(2) : payer.amount || '0';
  };

  const handleClick = () => {
    // TODO Send to API
    console.log(payers);
  };

  return (
    <Box width="100%" px={2} display="flex" flex={1} flexDirection="column">
      <ReceiptSummary split />
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {payers.map((payer) => {
          const labelId = `checkbox-list-secondary-label-${payer.id}`;
          return (
            <ListItem
              disableGutters
              key={payer.id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  checked={payer.splitsReceipt}
                  inputProps={{ 'aria-labelledby': labelId }}
                  onClick={() => {
                    splitReceipt({ id: payer.id, splitsReceipt: !payer.splitsReceipt });
                  }}
                />
              }
              disablePadding
            >
              <ListItemButton
                sx={{ px: 0 }}
                onClick={() => {
                  splitReceipt({ id: payer.id, splitsReceipt: !payer.splitsReceipt });
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={payer.name} src={payer.avatar} />
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={payer.name}
                  secondary={`Do oddania: ${countPayerSplitAmount(payer)} PLN`}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Button sx={{ mt: 2 }} onClick={handleClick} variant="contained">
        Wyślij
      </Button>
    </Box>
  );
}

export default SplitForm;
