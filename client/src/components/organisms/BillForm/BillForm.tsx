import React, { ReactElement } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { Box, Button, TextField, InputAdornment, Stack } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import ShopSelect from 'components/molecules/ShopSelect/ShopSelect';

interface ShopOptionIterface {
  inputValue?: string;
  name: string;
  id?: number;
}

interface FormValueInterface {
  shop: ShopOptionIterface | null;
  amount: string;
  date: Date | number | null;
}

const schema = yup.object().shape({
  shop: yup.object().shape({
    name: yup.string().required('Wymagane'),
    id: yup.number(),
  }),
  amount: yup
    .string()
    .required('Wymagane')
    .matches(/^[0-9]{1,}([,.][0-9]{1,2})?$/, 'Wprowadź poprawną kwotę'),
  date: yup
    .date()
    .required('Wymagane')
    .max(new Date(new Date().setUTCHours(23, 59, 59, 999)), 'Data nie może być przyszła'),
});

const BillForm = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<FormValueInterface>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValueInterface> = (data) =>
    console.log('data submitted: ', data);

  return (
    <Box
      sx={{
        width: '100%',
        px: 2,
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={3}>
        <Controller
          name="shop"
          control={control}
          defaultValue={{
            name: '',
          }}
          render={({ field }) => (
            <ShopSelect
              {...field}
              onChange={setValue}
              inputProps={{
                error: !!errors.shop,
                // @ts-expect-error Wrong react-hook-form typing
                helperText: errors.shop?.name?.message ? errors.shop.name.message : '',
              }}
            />
          )}
        />
        <Controller
          name="amount"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              onChange={(ev) => {
                const { value } = ev.target;
                const pattern = /^[0-9,.]+$/;
                if (pattern.test(value)) {
                  field.onChange(ev);
                  trigger('amount');
                }
              }}
              sx={{ width: '100%' }}
              id="outlined-basic"
              label="Kwota z rachunku"
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">PLN</InputAdornment>,
              }}
              error={!!errors.amount?.message}
              helperText={errors.amount?.message}
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          defaultValue={new Date()}
          render={({ field }) => (
            <MobileDatePicker
              {...field}
              label="Data zakupu"
              okText="Zatwierdź"
              cancelText="Anuluj"
              onChange={(newValue) => {
                setValue('date', newValue, {
                  shouldValidate: true,
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors.date?.message}
                  helperText={errors.date?.message}
                />
              )}
              disableOpenPicker
              maxDate={Date.now()}
              minDate={new Date().setMonth(new Date().getMonth() - 2)}
              allowSameDateSelection
              DialogProps={{
                sx: {
                  '& .PrivateDatePickerToolbar-penIcon': {
                    display: 'none',
                  },
                },
              }}
              componentsProps={{
                switchViewButton: {
                  sx: {
                    display: 'none',
                  },
                },
              }}
            />
          )}
        />
        <Button sx={{ mt: 3 }} type="submit" variant="contained">
          Wyślij
        </Button>
      </Stack>
    </Box>
  );
};

export default BillForm;
