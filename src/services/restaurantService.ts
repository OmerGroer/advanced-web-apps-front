import axios from "axios";

interface ApiRestaurant {
  address: {
    fullAddress: string;
    country: string;
  };
  cuisines?: string[];
  id: number;
  name: string;
  priceTypes: string;
}

export interface RestaurantPage {
  data: ApiRestaurant[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
}

const apiClient = axios.create({
  baseURL: "https://real-time-tripadvisor-scraper-api.p.rapidapi.com/",
  headers: {
    "x-rapidapi-host": "real-time-tripadvisor-scraper-api.p.rapidapi.com",
    "x-rapidapi-key": "5680b0672bmsh243646968bb4ab9p15d643jsn5213068b9ee8",
    accept: "application/json",
  },
});

const getRestaurants = (location: string, cursor?: string | null) => {
  const abortController = new AbortController();
  let query = `location=${location}`;
  query += cursor ? `&cursor=${cursor}` : "";

  const request = apiClient.get<RestaurantPage>(
    `/tripadvisor_restaurants_search_v2?${query}`,
    {
      signal: abortController.signal,
    }
  );
  return { request, abort: () => abortController.abort() };
};

export default { getRestaurants };
