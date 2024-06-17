import type { ReactNode } from 'react';
import React, { createContext, useMemo } from 'react';
// import { Bounce, toast, ToastContainer } from 'react-toastify';
import type { OptionsObject } from 'notistack';
import { useSnackbar } from 'notistack';
import { Grow } from '@mui/material';

export interface IToastContext {
  info: (message: string) => void;
  success: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
}

const defaultValues: IToastContext = {
  info: () => {
    throw new Error('Not implemented');
  },
  success: () => {
    throw new Error('Not implemented');
  },
  warning: () => {
    throw new Error('Not implemented');
  },
  error: () => {
    throw new Error('Not implemented');
  },
};

export const ToastContext = createContext<IToastContext>(defaultValues);

interface IProps {
  children: ReactNode;
}

export function ToastContextProvider({ children }: IProps) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const config: OptionsObject = {
    autoHideDuration: 3000,
    preventDuplicate: true,
    TransitionComponent: Grow,
  };

  const value: IToastContext = useMemo(
    () => ({
      info: (message: string) => {
        const key = enqueueSnackbar(message, {
          variant: 'info',
          SnackbarProps: {
            onClick: () => {
              closeSnackbar(key);
            },
          },
          ...config,
        });
      },
      success: (message: string) => {
        const key = enqueueSnackbar(message, {
          variant: 'success',
          SnackbarProps: {
            onClick: () => {
              closeSnackbar(key);
            },
          },
          ...config,
        });
      },
      warning: (message: string) => {
        const key = enqueueSnackbar(message, {
          variant: 'warning',
          SnackbarProps: {
            onClick: () => {
              closeSnackbar(key);
            },
          },
          ...config,
        });
      },
      error: (message: string) => {
        const key = enqueueSnackbar(message, {
          variant: 'error',
          SnackbarProps: {
            onClick: () => {
              closeSnackbar(key);
            },
          },
          ...config,
        });
      },
    }),
    [],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}
