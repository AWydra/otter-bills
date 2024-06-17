import type { ReactElement } from 'react';
import React from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import type { ImageListType } from 'react-images-uploading';
import { Box, Button, TextField, InputAdornment, Stack } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import ImageInput from 'components/molecules/ImageInput/ImageInput';
import { useBillContext } from 'contexts/BillContext';
import ShopSelect from 'components/molecules/ShopSelect/ShopSelect';
import { formatAmount } from 'utils';
import type { IShopOption } from 'interfaces';
import { RouteEnum } from 'enums';

interface IFormValues {
  shop: IShopOption;
  amount: string;
  date: string;
  description: string;
}

const schema: yup.ObjectSchema<IFormValues> = yup.object().shape({
  shop: yup.object().shape({
    name: yup.string().required('Wymagane'),
    id: yup.number().nullable(),
  }),
  amount: yup
    .string()
    .required('Wymagane')
    .matches(/^[0-9]{1,}([,.][0-9]{1,2})?$/, 'Wprowadź poprawną kwotę'),
  date: yup.string().required('Wymagane'),
  description: yup.string().required('Wymagane'),
});

function BillForm(): ReactElement {
  const {
    shop,
    setShop,
    amount,
    setAmount,
    date,
    setDate,
    description,
    setDescription,
    images,
    setImages,
  } = useBillContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    setShop(data.shop);
    setAmount(formatAmount(data.amount));
    setDate(data.date);
    setDescription(data.description);
    navigate(`${RouteEnum.ADD_RECEIPT}/2`);
  };

  const handleImageChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: '100%',
        px: 2,
      }}
    >
      <Stack spacing={3}>
        <Controller
          control={control}
          defaultValue={{
            name: shop.name,
            id: shop.id,
          }}
          name="shop"
          render={({ field }) => (
            <ShopSelect
              {...field}
              inputProps={{
                error: Boolean(errors.shop),
                helperText: errors.shop?.name?.message ? errors.shop.name.message : '',
              }}
              onChange={setValue}
            />
          )}
        />
        <Controller
          control={control}
          defaultValue={amount}
          name="amount"
          render={({ field }) => (
            <TextField
              {...field}
              InputProps={{
                endAdornment: <InputAdornment position="end">PLN</InputAdornment>,
              }}
              autoComplete="off"
              error={Boolean(errors.amount?.message)}
              helperText={errors.amount?.message}
              label="Kwota z rachunku"
              onChange={(ev) => {
                const { value } = ev.target;
                const pattern = /^[0-9,.]+$/;
                if (pattern.test(value)) {
                  field.onChange(ev);
                }
              }}
              sx={{ width: '100%' }}
              variant="outlined"
            />
          )}
        />
        <Controller
          control={control}
          defaultValue={date}
          name="date"
          render={({ field }) => (
            <MobileDatePicker
              {...field}
              value={field.value ? dayjs(field.value) : null}
              disableOpenPicker
              label="Data zakupu"
              maxDate={dayjs()}
              slotProps={{
                dialog: {
                  sx: {
                    '& .PrivateDatePickerToolbar-penIcon': {
                      display: 'none',
                    },
                  },
                },
                textField: {
                  error: Boolean(errors.date?.message),
                  helperText: errors.date?.message,
                },
              }}
              minDate={dayjs().subtract(2, 'months')}
              onChange={(newValue) => {
                if (!newValue) return;
                setValue('date', newValue.toISOString(), {
                  shouldValidate: true,
                });
              }}
            />
          )}
        />
        <ImageInput images={images} onChange={handleImageChange} />
        <Controller
          control={control}
          defaultValue={description}
          name="description"
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-multiline-static"
              label="Dodatkowe informacje"
              multiline
              rows={2}
            />
          )}
        />
        <Button sx={{ mt: 3 }} type="submit" variant="contained">
          Dalej
        </Button>
      </Stack>
    </Box>
  );
}

export default BillForm;
