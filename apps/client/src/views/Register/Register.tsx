import React from 'react';
import * as yup from 'yup';
import { isAxiosError } from 'axios';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { Box, Stack, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Heading from 'components/molecules/Heading/Heading';
import { yupResolver } from '@hookform/resolvers/yup';
import type { IAxiosErrorData, ISignUpRequestData } from '@repo/types';
import { useAuthServices } from 'hooks/useAuthServices';
import useAuthContext from 'hooks/useAuthContext';
import { RouteEnum } from 'enums';
import { useNavigate } from 'react-router-dom';

interface IFormValues extends ISignUpRequestData {
  passwordConfirmation: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Wymagane').min(3, 'Minimum 3 znaki'),
  surname: yup.string().required('Wymagane').min(3, 'Minimum 3 znaki'),
  email: yup.string().required('Wymagane').email('Niepoprawny email'),
  password: yup
    .string()
    .required('Wymagane')
    .min(8, 'Minimum 8 znaków')
    .max(30, 'Maksymalnie 30 znaków')
    .matches(/[0-9]/, 'Hasło musi zawierać cyfrę')
    .matches(/[a-z]/, 'Hasło musi zawierać małą literę')
    .matches(/[A-Z]/, 'Hasło musi zawierać dużą literę')
    .matches(/[^\w]/, 'Hasło musi zawierać znak specjalny'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Hasła muszą być takie same')
    .required('Wymagane'),
});

function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });
  const { loading, signUp } = useAuthServices();
  const { authenticate } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    const preparedData: ISignUpRequestData = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await signUp(preparedData);
      authenticate(response.data);
      navigate(RouteEnum.HOME);
    } catch (error: unknown) {
      if (isAxiosError<IAxiosErrorData<keyof ISignUpRequestData>>(error)) {
        const { response } = error;
        if (response?.data.field) {
          setError(response.data.field, {
            message: response.data.message,
          });
          setFocus(response.data.field);
        } else {
          // show error
        }
      }
      console.log('++ error', error);
      // show error
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        px: 2,
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading title="Rejestracja" />
      <Stack spacing={3}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field: { ref, ...field } }) => (
            <TextField
              {...field}
              inputRef={ref}
              label="Imię"
              helperText={errors.name?.message}
              error={Boolean(errors.name)}
            />
          )}
        />
        <Controller
          name="surname"
          control={control}
          defaultValue=""
          render={({ field: { ref, ...field } }) => (
            <TextField
              {...field}
              inputRef={ref}
              label="Nazwisko"
              helperText={errors.surname?.message}
              error={Boolean(errors.surname)}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field: { ref, ...field } }) => (
            <TextField
              {...field}
              inputRef={ref}
              label="Email"
              helperText={errors.email?.message}
              error={Boolean(errors.email)}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field: { ref, ...field } }) => (
            <TextField
              {...field}
              inputRef={ref}
              label="Hasło"
              type="password"
              helperText={errors.password?.message}
              error={Boolean(errors.password)}
            />
          )}
        />
        <Controller
          name="passwordConfirmation"
          control={control}
          defaultValue=""
          render={({ field: { ref, ...field } }) => (
            <TextField
              {...field}
              inputRef={ref}
              label="Powtórz hasło"
              type="password"
              helperText={errors.passwordConfirmation?.message}
              error={Boolean(errors.passwordConfirmation)}
            />
          )}
        />
        <LoadingButton type="submit" variant="contained" loading={loading}>
          Zarejestruj się
        </LoadingButton>
      </Stack>
    </Box>
  );
}

export default Register;
