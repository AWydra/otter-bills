import React, { ReactElement } from 'react';
import { useForm, useFieldArray, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from 'hooks';
import { PayersInterface } from 'interfaces';
import { Box, Button, List, Stack } from '@mui/material';
import ExpenseItem from 'components/molecules/ExpenseItem/ExpenseItem';

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValueInterface>({
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
                  // <ShopSelect
                  //   {...field}
                  //   onChange={setValue}
                  //   inputProps={{
                  //     error: !!errors.shop,
                  //     helperText: errors.shop?.name?.message ? errors.shop.name.message : '',
                  //   }}
                  // />
                );
              }}
            />
          );
        })}
        {/* {payers.map((payer) => (
          <Controller
            name="test"
            control={control}
            defaultValue="dIPA"
            render={({ field }) => (
              <ExpenseItem {...field} key={payer.id} name={payer.name} avatarUrl={payer.avatar} />
              // <ShopSelect
              //   {...field}
              //   onChange={setValue}
              //   inputProps={{
              //     error: !!errors.shop,
              //     helperText: errors.shop?.name?.message ? errors.shop.name.message : '',
              //   }}
              // />
            )}
          />
        ))} */}
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

/* 
Widoczna cała kwota z paragonu

Dynamiczne selecty z wyborem kwoty:
 
 input do wpisania kwoty, jaka z tego paragonu nie powinna się wliczać do wspólnego rachunku

 USE CASE
 Ja i Patrycja zrobiliśmy zakupy za 100zł, zapłaciłem ja
 Ja wydałem 20zł na jedzonko
 Patrycja wydała 8zł na Tymbarki
 Dla Gohy kupiliśmy łopatki za 60zł

 Z całkowitej kwoty Goha płaci 60zł, ale nie wlicza się do wspólnego podziału paragonu
 - zostaje 40zł
 ja wydałem 20zł, Patrycja 8zł, oboje wliczamy się do wspólnego podziału
 - 40-20-8=12zł
 Całkowita kwota do podziału to 12zł
 Ja i Patrycja zapłaciliśmy po 6zł
 Patrycja jest mi winna 6zł za wspólne + 8zł za Tymbarki


 (PK) Patrycja Kubica
 --------------------

*/

export default ExpenseForm;
