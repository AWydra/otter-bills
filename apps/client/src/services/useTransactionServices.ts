import { useState } from 'react';
import type { ICreateTransactionRequestData } from '@repo/types';
import useApi from '../hooks/useApi';

export const useTransactionServices = () => {
  const [loading, setLoading] = useState(false);
  const apiClient = useApi();

  const createTransaction = async (data: ICreateTransactionRequestData) => {
    try {
      setLoading(true);
      return await apiClient.post('/transactions', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createTransaction,
  };
};
