import { useEffect, useState } from "react";
import { CanceledError } from "../services/apiClient";
import { AxiosResponse } from "axios";

export type ByIdFunction<T> = (id: string) => {request: Promise<AxiosResponse<T>>, abort: () => void}

const useById = <T>(id: string | null, byIdFunction: ByIdFunction<T>) => {
  const [item, setItem] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return
    setIsLoading(true);
    const { request, abort } = byIdFunction(id);
    request
      .then((res) => {
        setItem(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (!(error instanceof CanceledError)) {
          setError(error.message);
          setIsLoading(false);
        }
      });

    return abort;
  }, [id]);

  return { item, setItem, error, isLoading };
};

export default useById;
