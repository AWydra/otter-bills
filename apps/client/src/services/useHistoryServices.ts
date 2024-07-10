import { useState } from 'react';
import type { IGetHistoryResponseData } from '@repo/types';
import useApi from '../hooks/useApi';

export const useHistoryServices = () => {
  const [loading, setLoading] = useState(false);
  const apiClient = useApi();

  const getLatestHistory = async () => {
    try {
      setLoading(true);
      return await apiClient.get<IGetHistoryResponseData>('/history/latest');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getLatestHistory,
  };
};
