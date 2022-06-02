import React, { ReactElement } from 'react';
import { useForm, useFieldArray, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from 'hooks';
import { PayersInterface } from 'interfaces';
import { Box, Button, List, Stack } from '@mui/material';
import ExpenseItem from 'components/molecules/ExpenseItem/ExpenseItem';
import ReceiptSummary from 'components/molecules/ReceiptSummary/ReceiptSummary';
import { amountToNumber, formatAmount } from 'utils';

interface PayerErrorInterface extends PayersInterface {
  error?: boolean;
}

interface FormValueInterface {
  payers: PayerErrorInterface[];
}

const ExpenseForm = (): ReactElement => {
  const storePayers = useAppSelector((state) => state.bill.payers);
  const storeAmount = useAppSelector((state) => state.bill.amount);

  const payersList: PayerErrorInterface[] = storePayers.map((payer) => ({
    ...payer,
    error: false,
  }));

  const schema = yup.object().shape({
    payers: yup.array().of(
      yup.object().shape({
        amount: yup.string().matches(/^([0-9]{1,}([,.][0-9]{1,2})?)?$/, 'Wprowadź poprawną kwotę'),
      }),
    ),
  });

  const { control, handleSubmit } = useForm<FormValueInterface>({
    resolver: yupResolver(schema),
    defaultValues: {
      payers: payersList,
    },
  });

  const { fields, update } = useFieldArray({
    control,
    name: 'payers',
    keyName: 'key',
  });

  const checkValidity = (value: string, index: number): boolean => {
    if (value) {
      if (value.length > 8) return false;
      const pattern = /^[0-9,.]+$/;
      if (!pattern.test(value)) {
        return false;
      }
      const valid = /^[0-9]{1,}([,.][0-9]{1,2})?$/.test(value);
      update(index, {
        ...fields[index],
        error: !valid,
      });
    }
    return true;
  };

  const checkTotalAmount = (data: FormValueInterface) => {
    const totalAmount = data.payers
      .reduce((partialSum, payer) => {
        const numberAmount = amountToNumber(payer.amount);
        return partialSum + numberAmount;
      }, 0)
      .toFixed(2);

    if (amountToNumber(totalAmount) > amountToNumber(storeAmount)) {
      // TODO Alert
      return false;
    }

    return true;
  };

  const handleSplitBill = () => {
    console.log('Handle split bill');
  };

  const onSubmit: SubmitHandler<FormValueInterface> = (data) => {
    const hasError = data.payers.some((el) => el.error);
    const isTotalAmountValid = checkTotalAmount(data);

    if (hasError || !isTotalAmountValid) return;

    const formatted = data.payers.map((payer) => {
      delete payer.error;
      payer.amount = formatAmount(payer.amount);
      return payer;
    });

    console.log('data', data);
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
                    onChange={(ev) => {
                      const value = ev?.target?.value;
                      const isValid = checkValidity(value, index);
                      if (isValid) {
                        field.onChange(ev);
                      }
                    }}
                    value={field.value || ''}
                    error={fields[index].error || false}
                  />
                );
              }}
            />
          );
        })}
      </List>
      <Stack sx={{ mt: 'auto', pb: (theme) => theme.spacing(3) }} spacing={2}>
        <Button onClick={handleSplitBill} variant="outlined">
          Podziel rachunek między osoby
        </Button>
        <Button type="submit" variant="contained">
          Wyślij
        </Button>
      </Stack>
    </Box>
  );
};

export default ExpenseForm;
