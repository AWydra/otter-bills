import type { ReactElement } from 'react';
import React from 'react';
import { Box, Button, Link as MuiLink, Stack, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import otterbills from 'assets/logo/otterbills.svg';
import { Link } from 'react-router-dom';
import { RouteEnum } from 'enums';

interface IFormValues {
  email: string;
  password: string;
}

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
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log('data', data);
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
      <Button
        variant="contained"
        size="large"
        type="submit"
        sx={{
          width: '100%',
          margin: (theme) => theme.spacing(4, 0, 3),
        }}
      >
        Zaloguj
      </Button>
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
