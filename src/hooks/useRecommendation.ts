import { useEffect, useState } from "react";
import aiService from "../services/aiService";
import useGeoLocation from "./useGeoLocation";

export interface Recommendation {
  content: string;
  rating: number;
  restaurant: {
    name: string;
    address: string;
    cuisines: string[];
    priceTypes: string;
  };
}

const useRecommendation = (initialValue: Recommendation | null) => {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    initialValue
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { location, error: locationError } = useGeoLocation();

  useEffect(() => {
    if (!initialValue && location) {
      setIsLoading(true);
      const { request, abort } = aiService.getRecommendation(location);
      request
        .then((res) => {
          setRecommendation(JSON.parse(res.response.text()));
          setIsLoading(false);
        })
        .catch((error) => {
          if (!error.message.includes("signal is aborted")) {
            setError(error.message);
            setIsLoading(false);
          }
        });

      return abort;
    }
  }, [location]);

  return { recommendation, error: locationError || error, isLoading };
};

export default useRecommendation;
