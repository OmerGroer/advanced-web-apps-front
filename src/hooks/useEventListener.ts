import { useEffect } from "react";

const useEventListener = (event: string, callback: (evt: Event) => void) => {
  useEffect(() => {
    document.addEventListener(event, callback);

    return () => {
      document.removeEventListener(event, callback);
    };
  }, []);
};

export default useEventListener;
