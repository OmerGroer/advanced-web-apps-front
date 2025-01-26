import { useState, useEffect } from "react";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

const useGeoLocation = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return { location, error };
};

export default useGeoLocation;
