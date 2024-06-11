import { RouteEnum } from 'enums';
import useAuthContext from 'hooks/useAuthContext';
import React from 'react';
import { Navigate, Routes } from 'react-router-dom';

interface IProps {
  children: React.ReactNode;
}

export const ProtectedRoutes = ({ children }: IProps) => {
  const { isAuthenticating, isAuthenticated } = useAuthContext();
  if (isAuthenticating) return null;

  if (isAuthenticated) {
    return <Routes>{children}</Routes>;
  }

  return <Navigate to={RouteEnum.LOGIN} replace />;
};
