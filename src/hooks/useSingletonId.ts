import { useEffect, useState } from "react";

export interface ShowEvent {
  id: string;
}

const useSingletonId = (eventName: string) => {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const callback = (event: Event) => {
      const customEvent = event as CustomEvent<ShowEvent>;
      setId(customEvent.detail.id);
    };
    document.addEventListener(eventName, callback);

    return () => {
      document.removeEventListener(eventName, callback);
    };
  }, []);

  const clear = () => setId(null);

  return { id, clear };
};

export default useSingletonId;
