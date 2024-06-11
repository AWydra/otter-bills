import type { AxiosError } from 'axios';
import axios from 'axios';

const useApi = () => {
  const axiosClient = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL: '//localhost:3001/api',
    withCredentials: true,
  });

  axiosClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  return axiosClient;
};

export default useApi;
