import React from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Box, Button, List, Stack, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ExpenseItem from 'components/molecules/ExpenseItem/ExpenseItem';
import ReceiptSummary from 'components/molecules/ReceiptSummary/ReceiptSummary';
import { useBillContext } from 'contexts/BillContext';
import { amountToNumber, formatAmount } from 'utils';
import type { IPayers } from 'interfaces';
import { RouteEnum } from 'enums';
import useAuthContext from 'hooks/useAuthContext';

interface IFormValues {
  payers: IPayers[];
}

const schema: yup.ObjectSchema<IFormValues> = yup.object().shape({
  payers: yup
    .array()
    .of(
      yup.object().shape({
        amount: yup
          .string()
          .matches(/^([0-9]{1,}([,.][0-9]{1,2})?)?$/, 'Wprowadź poprawną kwotę')
          .required(),
        splitsReceipt: yup.boolean().required(),
        id: yup.string().required(),
        name: yup.string().required(),
        avatar: yup.string().required(),
      }),
    )
    .required(),
});

function ExpenseForm(): ReactElement {
  const { payers, setPayers, amount } = useBillContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const payersList: IPayers[] = payers.map((payer) => ({
    ...payer,
  }));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      payers: payersList,
    },
  });

  console.log('errors', errors);

  const { fields, update } = useFieldArray({
    control,
    name: 'payers',
    keyName: 'key',
  });

  const formatData = (formPayers: IPayers[]): IPayers[] =>
    formPayers.map((payer) => {
      payer.amount = formatAmount(payer.amount);
      return payer;
    });

  const checkValidity = (value: string): boolean => {
    if (value) {
      if (value.length > 8) return false;
      const pattern = /^[0-9,.]+$/;
      if (!pattern.test(value)) {
        return false;
      }
    }
    return true;
  };

  const countTotalAmount = (formPayers: IPayers[]) => {
    return formPayers
      .reduce((partialSum, payer) => {
        const numberAmount = amountToNumber(payer.amount);
        return partialSum + numberAmount;
      }, 0)
      .toFixed(2);
  };

  const checkTotalAmount = (formPayers: IPayers[]) => {
    const totalAmount = countTotalAmount(formPayers);

    if (amountToNumber(totalAmount) > amountToNumber(amount)) {
      // TODO Alert
      return false;
    }

    return true;
  };

  const handleSplitBill = () => {
    const isTotalAmountValid = checkTotalAmount(fields);
    if (!isTotalAmountValid) return;
    const formatted = formatData(fields);
    setPayers(formatted);
    navigate(`${RouteEnum.ADD_RECEIPT}/4`);
  };

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log('data', data);
    const isTotalAmountValid = checkTotalAmount(data.payers);

    if (!isTotalAmountValid) {
      console.error('Total amount is invalid');
      return;
    }

    const formatted = formatData(data.payers);

    console.log('data', data);
    console.log('data', formatted);
    // TODO Send to API
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      width="100%"
      px={2}
      display="flex"
      flex={1}
      flexDirection="column"
    >
      <ReceiptSummary />
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {fields.map((payer, index) => {
          return (
            <Controller
              key={payer.id}
              name={`payers.${index}.amount`}
              control={control}
              render={({ field }) => {
                return (
                  <ExpenseItem
                    key={payer.id}
                    payerName={payer.name}
                    avatarUrl={payer.avatar}
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                      const value = ev.target.value;
                      const isValid = checkValidity(value);
                      if (isValid) {
                        field.onChange(ev);
                        update(index, {
                          ...fields[index],
                          amount: value,
                        });
                      }
                    }}
                    value={field.value || ''}
                  />
                );
              }}
            />
          );
        })}
      </List>
      <Stack sx={{ mt: 'auto', pb: (theme) => theme.spacing(3) }} spacing={2}>
        <Typography align="right" color="text.secondary">
          Łącznie:{' '}
          <Typography
            fontWeight={500}
            component="span"
            color={checkTotalAmount(fields) ? 'inherit' : 'error.main'}
          >
            {countTotalAmount(fields)} PLN
          </Typography>
        </Typography>
        {fields.find(({ id }) => id === user?.id)?.amount ? (
          <Button onClick={handleSplitBill} variant="outlined">
            Podziel rachunek między osoby
          </Button>
        ) : (
          <Button type="submit" variant="contained">
            Wyślij
          </Button>
        )}
      </Stack>
    </Box>
  );
}

export default ExpenseForm;
