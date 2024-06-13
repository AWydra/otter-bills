import { useState } from 'react';
import type { ISignInRequestData, ISignUpRequestData, IUserResponseData } from '@repo/types';
import useApi from './useApi';

export const useAuthServices = () => {
  const [loading, setLoading] = useState(false);
  const apiClient = useApi();

  const checkCredentials = async () => {
    try {
      setLoading(true);
      return await apiClient.post<IUserResponseData>('/check-credentials');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: ISignUpRequestData) => {
    try {
      setLoading(true);
      return await apiClient.post<IUserResponseData>('/signup', data);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (data: ISignInRequestData) => {
    try {
      setLoading(true);
      return await apiClient.post<IUserResponseData>('/signin', data);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    checkCredentials,
    signUp,
    signIn,
  };
};
