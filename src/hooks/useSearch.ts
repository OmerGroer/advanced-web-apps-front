import { useEffect, useRef, useState } from "react";
import { CanceledError, Page } from "../services/apiClient";
import { AxiosResponse } from "axios";

export type SearchFunction<T> = (times: { min?: string; max?: string },value: string) => {request: Promise<AxiosResponse<Page<T>>>, abort: () => void}

const useSearch = <T>(searchFunction: SearchFunction<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const valueRef = useRef<string>("");
  const times = useRef<{ min?: string; max?: string }>({});
  const isLoadingRef = useRef<boolean>(false);
  const abotFunctionRef = useRef<() => void>(null);

  const search = (value: string) => {
    if (value && value !== valueRef.current) {
      setItems([])
      valueRef.current = value;
      times.current = {};
      fetch(true);
    }
  };

  const loadMore = () => {
    fetch(false);
  };

  const fetch = (reset: boolean) => {
    if (isLoadingRef.current || !valueRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);
    const { request, abort } = searchFunction(
      times.current,
      valueRef.current
    );
    request
      .then((res) => {
        const { data, ...rest } = res.data;
        setItems((prevItems) =>
          reset ? data : [...prevItems, ...data]
        );
        times.current = rest;

        setIsLoading(false);
        isLoadingRef.current = false;
      })
      .catch((error) => {
        if (!(error instanceof CanceledError)) {
          setError(error.message);
          setIsLoading(false);
        }
        isLoadingRef.current = false;
      });

    abotFunctionRef.current = abort;
  };

  useEffect(() => {
    return () => {
      if (abotFunctionRef.current) abotFunctionRef.current();
    };
  }, []);

  return {
    items,
    search,
    loadMore,
    error,
    isLoading,
    value: valueRef.current
  };
};

export default useSearch;
