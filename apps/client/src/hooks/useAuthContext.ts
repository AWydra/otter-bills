import { useContext } from 'react';
import type { IAuthContext } from 'contexts/AuthContext';
import { AuthContext } from 'contexts/AuthContext';

const useAuthContext = () => useContext<IAuthContext>(AuthContext);

export default useAuthContext;
