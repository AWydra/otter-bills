import type { ReactElement } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBillContext } from 'contexts/BillContext';
import type { SubmitHandler} from 'react-hook-form';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { PayersInterface } from 'interfaces';
import { Box, Button, List, Stack, Typography } from '@mui/material';
import ExpenseItem from 'components/molecules/ExpenseItem/ExpenseItem';
import ReceiptSummary from 'components/molecules/ReceiptSummary/ReceiptSummary';
import { amountToNumber, formatAmount } from 'utils';
import { RouteEnum } from 'enums';

interface PayerErrorInterface extends PayersInterface {
  error?: boolean;
}

interface FormValueInterface {
  payers: PayerErrorInterface[];
}

function ExpenseForm(): ReactElement {
  const { payers, setPayers, amount } = useBillContext();
  const navigate = useNavigate();

  const payersList: PayerErrorInterface[] = payers.map((payer) => ({
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

  const formatData = (formPayers: PayerErrorInterface[]): PayersInterface[] =>
    formPayers.map((payer) => {
      delete payer.error;
      payer.amount = formatAmount(payer.amount);
      return payer;
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

  const countTotalAmount = (formPayers: PayerErrorInterface[]) => {
    return formPayers
      .reduce((partialSum, payer) => {
        const numberAmount = amountToNumber(payer.amount);
        return partialSum + numberAmount;
      }, 0)
      .toFixed(2);
  };

  const checkTotalAmount = (formPayers: PayerErrorInterface[]) => {
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

  const onSubmit: SubmitHandler<FormValueInterface> = (data) => {
    const hasError = data.payers.some((el) => el.error);
    const isTotalAmountValid = checkTotalAmount(data.payers);

    if (hasError || !isTotalAmountValid) return;

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
                    onChange={(ev) => {
                      const value = ev?.target?.value || ev;
                      const isValid = checkValidity(value, index);
                      if (isValid) {
                        field.onChange(ev);
                        update(index, {
                          ...fields[index],
                          amount: value,
                        });
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
        <Button onClick={handleSplitBill} variant="outlined">
          Podziel rachunek między osoby
        </Button>
        <Button type="submit" variant="contained">
          Wyślij
        </Button>
      </Stack>
    </Box>
  );
}

export default ExpenseForm;
