import { useState } from 'react';
import { AxiosResponse } from 'axios';


type ApiFunc<T, P extends any[]> = (...args: P) => Promise<AxiosResponse<T>>;

export const useApi = <T, P extends any[]>(apiFunc: ApiFunc<T, P>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const request = async (...args: P): Promise<{ success: boolean; data?: T; error?: string }> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunc(...args);
      setData(response.data);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred.';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  return {
    data,
    error,
    loading,
    request,
  };
};