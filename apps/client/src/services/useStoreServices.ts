import { useState } from 'react';
import type { IStoreReponse } from '@repo/types';
import useApi from '../hooks/useApi';

export const useStoreServices = () => {
  const [loading, setLoading] = useState(false);
  const apiClient = useApi();

  const getStores = async () => {
    try {
      setLoading(true);
      return await apiClient.get<IStoreReponse>('/stores');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getStores,
  };
};
