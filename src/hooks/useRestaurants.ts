import { useEffect, useRef, useState } from "react";
import { CanceledError } from "../services/apiClient";
import restaurantService from "../services/restaurantService";

export interface Restaurant {
  _id: string;
  name: string;
  address: string;
  category?: string;
  priceTypes: string;
}

const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const locationRef = useRef<string>("");
  const cursor = useRef<string>(null);
  const hasNextPageRef = useRef<boolean>(true);
  const isLoadingRef = useRef<boolean>(false);
  const abotFunctionRef = useRef<() => void>(null);

  const searchRestaurants = (location: string) => {
    if (location && location !== locationRef.current) {
      locationRef.current = location;
      cursor.current = null;
      fetchRestaurants(true);
    }
  };

  const loadMoreRestaurants = () => {
    if (!hasNextPageRef.current) return;
    fetchRestaurants(false);
  };

  const fetchRestaurants = (reset: boolean) => {
    if (isLoadingRef.current || !locationRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);
    const { request, abort } = restaurantService.getRestaurants(
      locationRef.current,
      cursor.current
    );
    request
      .then((res) => {
        const {
          data,
          pageInfo: { endCursor, hasNextPage },
        } = res.data;
        const restaurants: Restaurant[] = data.map((restaurant) => ({
          _id: `${restaurant.id}`,
          name: restaurant.name,
          address: restaurant.address.fullAddress,
          category: restaurant.cuisines?.join("/"),
          priceTypes: restaurant.priceTypes,
        }));

        setRestaurants((prevRestaurants) =>
          reset ? restaurants : [...prevRestaurants, ...restaurants]
        );
        hasNextPageRef.current = hasNextPage;
        cursor.current = endCursor;

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
    restaurants,
    searchRestaurants,
    loadMoreRestaurants,
    error,
    isLoading,
    location: locationRef.current
  };
};

export default useRestaurants;
