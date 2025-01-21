import { useEffect } from "react";
import { toast } from "react-toastify";

const useToastError = (error: string | null) => {
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
};

export default useToastError;
