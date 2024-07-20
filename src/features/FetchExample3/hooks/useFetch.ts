import { api } from '@/lib/api-client';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

const useFetch = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (path: string) => {
    setLoading(true);
    try {
      const response = await api.get<T>(path);
      const data = response.data;
      setData(data);
      setError(null);
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
};

export default useFetch;
