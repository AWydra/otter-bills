import type { ReactElement } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import type { SubmitHandler} from 'react-hook-form';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { BalanceResponseInterface } from 'interfaces';
import { Box, Button, TextField } from '@mui/material';
import Heading from 'components/molecules/Heading/Heading';
import SelectBox from 'components/molecules/SelectBox/SelectBox';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentsIcon from '@mui/icons-material/Payments';
import { PaymentFormEnum } from 'enums';

interface FormValueInterface {
  paymentForm: PaymentFormEnum;
  amount: string;
}

const schema = yup.object().shape({
  paymentForm: yup.number().required(),
  amount: yup
    .string()
    .required('Wymagane')
    .matches(/^[0-9]{1,}([,.][0-9]{1,2})?$/, 'Wprowadź poprawną kwotę'),
});

const spacing = 3;

function Payment(): ReactElement {
  const location = useLocation();
  const state = location.state as BalanceResponseInterface;
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValueInterface>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValueInterface> = (data) => {
    console.log('++ data', data);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading title="Wybierz formę i wysokość płatności" />
      <Box
        sx={{
          padding: (theme) => theme.spacing(0, spacing),
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: (theme) => theme.spacing(spacing),
        }}
      >
        <Controller
          name="paymentForm"
          control={control}
          defaultValue={PaymentFormEnum.BANK_TRANSFER}
          render={({ field }) => (
            <SelectBox
              icon={<AccountBalanceIcon />}
              label="Przelew"
              selected={field.value === PaymentFormEnum.BANK_TRANSFER}
              onClick={() => { setValue('paymentForm', PaymentFormEnum.BANK_TRANSFER); }}
            />
          )}
        />

        <Controller
          name="paymentForm"
          control={control}
          defaultValue={PaymentFormEnum.CASH}
          render={({ field }) => (
            <SelectBox
              icon={<PaymentsIcon />}
              label="Gotówka"
              selected={field.value === PaymentFormEnum.CASH}
              onClick={() => { setValue('paymentForm', PaymentFormEnum.CASH); }}
            />
          )}
        />
      </Box>
      <Box
        sx={(theme) => ({
          margin: theme.spacing(6, spacing, 2),
        })}
      >
        <Controller
          name="amount"
          control={control}
          defaultValue={state.amount}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              label="Kwota"
              error={Boolean(errors.amount?.message)}
              helperText={errors.amount?.message}
            />
          )}
        />
      </Box>
      <Box
        sx={(theme) => ({
          margin: theme.spacing(0, spacing, 4),
          display: 'flex',
          flexGrow: 1,
          alignItems: 'flex-end',
        })}
      >
        <Button
          sx={{
            width: '100%',
          }}
          variant="contained"
          size="large"
          type="submit"
          disabled={Object.keys(errors).length !== 0}
        >
          Oznacz wykonanie płatności
        </Button>
      </Box>
    </Box>
  );
}

export default Payment;
