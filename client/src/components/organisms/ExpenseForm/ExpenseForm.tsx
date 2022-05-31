import React, { ReactElement } from 'react';
import { useForm, useFieldArray, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from 'hooks';
import { PayersInterface } from 'interfaces';
import { Box, Button, List, Stack } from '@mui/material';
import ExpenseItem from 'components/molecules/ExpenseItem/ExpenseItem';
import ReceiptSummary from 'components/molecules/ReceiptSummary/ReceiptSummary';

interface PayerAmountInterface extends PayersInterface {
  amount: string;
  error: boolean;
}

interface FormValueInterface {
  amounts: PayerAmountInterface[];
}

const schema = yup.object().shape({
  payers: yup.array().of(
    yup.object().shape({
      amount: yup
        .string()
        .required('Wymagane')
        .matches(/^[0-9]{1,}([,.][0-9]{1,2})?$/, 'Wprowadź poprawną kwotę'),
    }),
  ),
});

const ExpenseForm = (): ReactElement => {
  const storePayers = useAppSelector((state) => state.bill.payers);

  const payers: PayerAmountInterface[] = storePayers.map((payer) => ({
    ...payer,
    amount: '',
    error: false,
  }));

  const { control, handleSubmit } = useForm<FormValueInterface>({
    resolver: yupResolver(schema),
    defaultValues: {
      amounts: payers,
    },
  });

  const { fields, update } = useFieldArray({
    control,
    name: 'amounts',
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

  const onSubmit: SubmitHandler<FormValueInterface> = (data) => {
    const hasError = data.amounts.some((el) => el.error);

    if (hasError) return;

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
              name={`amounts.${index}.amount`}
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
                    value={field.value}
                    error={fields[index].error}
                  />
                );
              }}
            />
          );
        })}
      </List>
      <Stack sx={{ mt: 'auto', pb: (theme) => theme.spacing(3) }} spacing={2}>
        <Button variant="outlined">Podziel rachunek między osoby</Button>
        <Button type="submit" variant="contained">
          Wyślij
        </Button>
      </Stack>
    </Box>
  );
};

export default ExpenseForm;
