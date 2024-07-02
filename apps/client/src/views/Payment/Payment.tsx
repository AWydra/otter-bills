import React, { type ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentsIcon from '@mui/icons-material/Payments';
import Heading from 'components/molecules/Heading/Heading';
import SelectBox from 'components/molecules/SelectBox/SelectBox';
import type { ICreatePaymentRequestData } from '@repo/types';
import { PaymentMethod } from '@repo/types';
import UserAvatar from 'components/atoms/UserAvatar/UserAvatar';
import AmountChip from 'components/atoms/AmountChip/AmountChip';
import { BalanceListEnum, RouteEnum } from 'enums';
import type { IPaymentLocationState } from 'interfaces/PaymentInterface';
import { amountToNumber } from 'utils';
import { usePaymentServices } from 'services/usePaymentServices';
import useToastContext from 'hooks/useToastContext';
import LoadingButton from '@mui/lab/LoadingButton';

interface IFormValues {
  paymentForm: PaymentMethod;
  amount: string;
}

const schema = yup.object().shape({
  paymentForm: yup.string().required().oneOf([PaymentMethod.CASH, PaymentMethod.TRANSFER]),
  amount: yup
    .string()
    .required('Wymagane')
    .matches(/^[0-9]{1,}([,.][0-9]{1,2})?$/, 'Wprowadź poprawną kwotę'),
});

function Payment(): ReactElement {
  const { loading, createPayment } = usePaymentServices();
  const toast = useToastContext();
  const location = useLocation();
  const userData = location.state as IPaymentLocationState;
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    const preparedData: ICreatePaymentRequestData = {
      payeeId: userData.id,
      paymentMethod: data.paymentForm,
      amount: amountToNumber(data.amount),
    };

    try {
      await createPayment(preparedData);
      toast.success('Płatność została dodana');
      navigate(RouteEnum.BALANCE, { replace: true });
    } catch (error) {
      toast.error('Wystąpił błąd podczas dodawania płatności');
    }
  };

  return (
    <Box
      sx={{
        padding: (theme) => theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading title="Wybierz formę i wysokość płatności" />
      <ListItem disablePadding>
        <ListItemAvatar>
          <UserAvatar name={userData.name} src={userData.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={userData.name}
          secondary={<AmountChip type={BalanceListEnum.PAYABLES} amount="12,34" />}
        />
      </ListItem>
      <Box
        sx={{
          marginTop: 3,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: (theme) => theme.spacing(3),
        }}
      >
        <Controller
          name="paymentForm"
          control={control}
          defaultValue={PaymentMethod.TRANSFER}
          render={({ field }) => (
            <SelectBox
              icon={<AccountBalanceIcon />}
              label="Przelew"
              selected={field.value === PaymentMethod.TRANSFER}
              onClick={() => {
                setValue('paymentForm', PaymentMethod.TRANSFER);
              }}
            />
          )}
        />

        <Controller
          name="paymentForm"
          control={control}
          defaultValue={PaymentMethod.CASH}
          render={({ field }) => (
            <SelectBox
              icon={<PaymentsIcon />}
              label="Gotówka"
              selected={field.value === PaymentMethod.CASH}
              onClick={() => {
                setValue('paymentForm', PaymentMethod.CASH);
              }}
            />
          )}
        />
      </Box>
      <Box
        sx={{
          marginTop: 4,
        }}
      >
        <Controller
          name="amount"
          control={control}
          defaultValue={userData.amount}
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
        sx={{
          display: 'flex',
          flexGrow: 1,
          alignItems: 'flex-end',
        }}
      >
        <LoadingButton
          sx={{
            width: '100%',
          }}
          variant="contained"
          size="large"
          type="submit"
          disabled={Object.keys(errors).length !== 0}
          loading={loading}
        >
          Oznacz wykonanie płatności
        </LoadingButton>
      </Box>
    </Box>
  );
}

export default Payment;
