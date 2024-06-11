import { useAuthServices } from 'hooks/useAuthServices';
import type { ReactNode } from 'react';
import React, { createContext, useEffect, useMemo, useState } from 'react';

export interface IAuthContext {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
}

const defaultValues: IAuthContext = {
  isAuthenticated: false,
  isAuthenticating: true,
};

export const AuthContext = createContext<IAuthContext>(defaultValues);

interface IProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: IProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(defaultValues.isAuthenticating);
  const [isAuthenticated, setIsAuthenticated] = useState(defaultValues.isAuthenticated);
  const { checkCredentials } = useAuthServices();

  const authenticate = () => {
    setIsAuthenticating(false);
    setIsAuthenticated(true);
  };

  const reset = () => {
    setIsAuthenticating(false);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        await checkCredentials();
        authenticate();
      } catch (error) {
        reset();
        // Show error message
      }
    };

    getData();
  }, []);

  const value: IAuthContext = useMemo(
    () => ({
      isAuthenticated,
      isAuthenticating,
    }),
    [isAuthenticated, isAuthenticating],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
