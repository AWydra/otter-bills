import { useState } from 'react';
import type { ICreatePaymentRequestData } from '@repo/types';
import useApi from '../hooks/useApi';

export const usePaymentServices = () => {
  const [loading, setLoading] = useState(false);
  const apiClient = useApi();

  const createPayment = async (data: ICreatePaymentRequestData) => {
    try {
      setLoading(true);
      return await apiClient.post('/payments', data);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createPayment,
  };
};
