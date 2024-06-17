import { useContext } from 'react';
import type { IToastContext } from 'contexts/ToastContext';
import { ToastContext } from 'contexts/ToastContext';

const useToastContext = () => useContext<IToastContext>(ToastContext);

export default useToastContext;
