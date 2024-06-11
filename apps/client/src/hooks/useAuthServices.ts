import { useState } from 'react';
import useApi from './useApi';

export const useAuthServices = () => {
  const [loading, setLoading] = useState(false);
  const apiClient = useApi();

  const checkCredentials = async () => {
    try {
      setLoading(true);
      return await apiClient.post('/check-credentials');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    checkCredentials,
  };
};
