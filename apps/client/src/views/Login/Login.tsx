import type { ReactElement } from 'react';
import React from 'react';
import { Box, Button, Link as MuiLink, Stack, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import otterbills from 'assets/logo/otterbills.svg';
import { Link, useNavigate } from 'react-router-dom';
import { RouteEnum } from 'enums';
import { useAuthServices } from 'hooks/useAuthServices';
import LoadingButton from '@mui/lab/LoadingButton';
import type { IAxiosErrorData, ISignInRequestData } from '@repo/types';
import useAuthContext from 'hooks/useAuthContext';
import { isAxiosError } from 'axios';
import useToastContext from 'hooks/useToastContext';

const schema = yup.object().shape({
  email: yup.string().required('Wymagane').min(3, 'Minimum 3 znaki'),
  password: yup
    .string()
    .required('Wymagane')
    .min(8, 'Minimum 8 znaków')
    .max(30, 'Maksymalnie 30 znaków'),
});

function Login(): ReactElement {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<ISignInRequestData>({
    resolver: yupResolver(schema),
  });
  const { loading, signIn } = useAuthServices();
  const { authenticate } = useAuthContext();
  const toast = useToastContext();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ISignInRequestData> = async (data) => {
    try {
      const response = await signIn(data);
      authenticate(response.data);
      navigate(RouteEnum.HOME);
    } catch (error: unknown) {
      if (isAxiosError<IAxiosErrorData<keyof ISignInRequestData>>(error)) {
        const { response } = error;
        if (response?.data.field) {
          setError(response.data.field, {
            message: response.data.message,
          });
          setFocus(response.data.field);
        } else {
          toast.error(response?.data.message || 'Wystąpił błąd');
        }
      } else {
        toast.error(error instanceof Error ? error.message : 'Wystąpił błąd');
      }
    }
  };

  return (
    <Box
      sx={{
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <img
        src={otterbills}
        alt="OtterBills logo"
        style={{
          width: 220,
          display: 'block',
          marginBottom: 32,
        }}
      />
      <Stack width="100%" spacing={2}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
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
          render={({ field }) => (
            <TextField
              {...field}
              label="Hasło"
              type="password"
              autoComplete="on"
              helperText={errors.password?.message}
              error={Boolean(errors.password)}
            />
          )}
        />
      </Stack>
      <LoadingButton
        variant="contained"
        size="large"
        type="submit"
        loading={loading}
        sx={{
          width: '100%',
          margin: (theme) => theme.spacing(4, 0, 3),
        }}
      >
        Zaloguj
      </LoadingButton>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ position: 'absolute', bottom: (theme) => theme.spacing(3) }}
      >
        Nie masz konta?{' '}
        <MuiLink component={Link} to={RouteEnum.REGISTER} underline="none">
          Zarejestruj się
        </MuiLink>
      </Typography>
    </Box>
  );
}

export default Login;
