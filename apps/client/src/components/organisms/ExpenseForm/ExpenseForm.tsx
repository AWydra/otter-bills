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
import { RouteEnum } from 'enums';
import type { IPayer } from '@repo/types';
import { useTransactionServices } from 'services/useTransactionServices';
import useToastContext from 'hooks/useToastContext';

interface IFormValues {
  payers: IPayer[];
}

const schema: yup.ObjectSchema<IFormValues> = yup.object().shape({
  payers: yup
    .array()
    .of(
      yup.object().shape({
        amount: yup.string().matches(/^([0-9]{1,}([,.][0-9]{1,2})?)?$/, 'Wprowadź poprawną kwotę'),
        splitsReceipt: yup.boolean().required(),
        id: yup.number().required(),
        name: yup.string().required(),
        avatar: yup.string(),
      }),
    )
    .required(),
});

function ExpenseForm(): ReactElement {
  const { payers, setPayers, amount, generateBillData, resetValues } = useBillContext();
  const { createTransaction } = useTransactionServices();
  const navigate = useNavigate();
  const toast = useToastContext();

  const payersList: IPayer[] = payers.map((payer) => ({
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

  const { fields, update } = useFieldArray({
    control,
    name: 'payers',
    keyName: 'key',
  });

  const formatData = (formPayers: IPayer[], resetSplit?: boolean): IPayer[] =>
    formPayers.map((payer) => {
      payer.amount = formatAmount(payer.amount);
      payer.splitsReceipt = resetSplit ? false : payer.splitsReceipt;
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

  const countTotalAmount = (formPayers: IPayer[]) => {
    return formPayers
      .reduce((partialSum, payer) => {
        const numberAmount = amountToNumber(payer.amount);
        return partialSum + numberAmount;
      }, 0)
      .toFixed(2);
  };

  const checkTotalAmount = (formPayers: IPayer[]) => {
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

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    const isTotalAmountValid = checkTotalAmount(data.payers);

    if (!isTotalAmountValid) {
      toast.error('Suma kwot przekracza kwotę rachunku');
      return;
    }

    const dataToSend = generateBillData();
    dataToSend.payers = formatData(data.payers, true);

    try {
      await createTransaction(dataToSend);
      toast.success('Transakcja została dodana');
      resetValues();
      navigate(RouteEnum.HOME);
    } catch (error) {
      toast.error('Wystąpił błąd podczas dodawania transakcji');
    }
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
                    error={Boolean(errors.payers?.[index]?.amount?.message)}
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
        <Button onClick={handleSplitBill} variant="outlined" disabled={!checkTotalAmount(fields)}>
          Podziel rachunek między osoby
        </Button>
        <Button type="submit" variant="contained" disabled={!checkTotalAmount(fields)}>
          Wyślij
        </Button>
      </Stack>
    </Box>
  );
}

export default ExpenseForm;
