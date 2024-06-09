import type { ErrorInfo, ReactNode } from 'react';
import React, { Component } from 'react';

interface IProps {
  children: ReactNode;
}

interface IState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<IProps, IState> {
  public state: IState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ hasError: true, error, errorInfo });
  }

  public render() {
    const { hasError, error, errorInfo } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <>
          <h1>Sorry.. there was an error</h1>
          <p>{error ? error.message : null}</p>
          <p>{errorInfo?.componentStack}</p>
        </>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
