import { useState } from 'react';
import type { ICreateTransactionRequestData, IGetTransactionResponse } from '@repo/types';
import useApi from '../hooks/useApi';

export const useTransactionServices = () => {
  const [loading, setLoading] = useState(false);
  const apiClient = useApi();

  const getTransaction = async (transactionId: number | string) => {
    try {
      setLoading(true);
      return await apiClient.get<IGetTransactionResponse>(`/transactions/${transactionId}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } finally {
      setLoading(false);
    }
  };

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
    getTransaction,
    createTransaction,
  };
};
