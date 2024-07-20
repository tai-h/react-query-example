import { api } from '@/lib/api-client';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const useFetch = <T>(path: string | null) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!path) return;

      setLoading(true);
      try {
        const response = await api.get<T>(path);
        const data = await response.data;
        setData(data);
        setError(null);
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        setError(axiosError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path]);

  return { data, loading, error };
};

export default useFetch;
