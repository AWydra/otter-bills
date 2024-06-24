import type { IUserResponseData } from '@repo/types';
import { useAuthServices } from 'services/useAuthServices';
import type { ReactNode } from 'react';
import React, { createContext, useEffect, useMemo, useState } from 'react';

export interface IAuthContext {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  user: IUserResponseData | null;
  authenticate: (data: IUserResponseData) => void;
  reset: () => void;
}

const defaultValues: IAuthContext = {
  isAuthenticated: false,
  isAuthenticating: true,
  user: null,
  authenticate: () => {
    throw new Error('Not implemented');
  },
  reset: () => {
    throw new Error('Not implemented');
  },
};

export const AuthContext = createContext<IAuthContext>(defaultValues);

interface IProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: IProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(defaultValues.isAuthenticating);
  const [isAuthenticated, setIsAuthenticated] = useState(defaultValues.isAuthenticated);
  const [user, setUser] = useState<IUserResponseData | null>(null);
  const { checkCredentials } = useAuthServices();

  const authenticate = (data: IUserResponseData) => {
    setIsAuthenticating(false);
    setIsAuthenticated(true);
    setUser(data);
  };

  const reset = () => {
    setIsAuthenticating(false);
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await checkCredentials();
        authenticate(data);
      } catch (error) {
        reset();
      }
    };

    getData();
  }, []);

  const value: IAuthContext = useMemo(
    () => ({
      isAuthenticated,
      isAuthenticating,
      user,
      authenticate,
      reset,
    }),
    [isAuthenticated, isAuthenticating],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
