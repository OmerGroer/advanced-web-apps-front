import { useEffect, useState } from "react";
import { CanceledError } from "../services/apiClient";
import userService, { User } from "../services/userService";

const useUserById = (userId: string | null) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUser = () => {
    if (!userId) return;
    setIsLoading(true);
    const { request, abort } = userService.getUserById(userId);
    request
      .then((res) => {
        setUser(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (!(error instanceof CanceledError)) {
          setError(error.message);
          setIsLoading(false);
        }
      });

    return abort;
  };

  useEffect(() => {
    return fetchUser();
  }, []);

  return { user, error, isLoading, fetchUser };
};

export default useUserById;
