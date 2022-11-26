import { useState } from 'react';

export const useFetch = ({ url }) => {
  const [err, setErr] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const loadData = async () => {
    try {
      const result = await fetch(url);
      const response = await result.json();
      return response;
    } catch (error) {
      setErr(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { err, isLoading, loadData };
};
