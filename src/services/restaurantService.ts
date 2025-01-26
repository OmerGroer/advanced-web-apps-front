import axios from "axios";
import apiClient, { Page } from "./apiClient";

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

export interface Restaurant {
  _id: string;
  name: string;
  address: string;
  category?: string;
  priceTypes: string;
}

export interface RatingRestaurant extends Restaurant {
  rating: number;
}

const apiClientExternal = axios.create({
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

  const request = apiClientExternal.get<RestaurantPage>(
    `/tripadvisor_restaurants_search_v2?${query}`,
    {
      signal: abortController.signal,
    }
  );
  return { request, abort: () => abortController.abort() };
};

const searchRestaurants = (
  times: { min?: string; max?: string },
  value: string
) => {
  const abortController = new AbortController();

  let query = `like=${value}&`;
  query += times.min ? `min=${times.min}&` : "";
  query += times.max ? `max=${times.max}` : "";

  const request = apiClient.get<Page<RatingRestaurant>>(`/restaurants?${query}`, {
    signal: abortController.signal,
  });
  return { request, abort: () => abortController.abort() };
};

const getById = (id: string) => {
  const abortController = new AbortController();
  const request = apiClient.get<RatingRestaurant>(`/restaurants/${id}`, {
    signal: abortController.signal,
  });
  return { request, abort: () => abortController.abort() };
};

export default { getRestaurants, searchRestaurants, getById };
