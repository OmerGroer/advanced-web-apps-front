import { FC, useState } from "react";
import style from "./RestaurantsList.module.css";
import useRestaurants, { Restaurant } from "../../hooks/useRestaurants";
import useToastError from "../../hooks/useToastError";
import useScroll from "../../hooks/useScroll";
import { CircularProgress } from "@mui/material";
import RestaurantSearch from "../RestaurantSearch/RestaurantSearch";

const RestaurantsList: FC = () => {
  const [selectedRestaurant, setSelectedResstaurant] = useState<Restaurant | null>(null)
  const {
    restaurants,
    searchRestaurants,
    loadMoreRestaurants,
    isLoading,
    error,
    location,
  } = useRestaurants();
  const listRef = useScroll<HTMLDivElement>(loadMoreRestaurants);
  useToastError(error);

  const a = [
    {
      _id: "123",
      name: "Omer",
      address: "there",
      category: "tasty",
      priceTypes: "$$$",
    },
    {
      _id: "14523",
      name: "Omsdfer",
      address: "thesdfre",
      category: "tasty",
      priceTypes: "$$$",
    },
    {
      _id: "14523",
      name: "Omsdfer",
      address: "thesdfre",
      category: "tasty",
      priceTypes: "$$$",
    },
    {
      _id: "14523",
      name: "Omsdfer",
      address: "thesdfre",
      category: "tasty",
      priceTypes: "$$$",
    },
    {
      _id: "14523",
      name: "Omsdfer",
      address: "thesdfre",
      category: "tasty",
      priceTypes: "$$$",
    },
    {
      _id: "14523",
      name: "Omsdfer",
      address: "thesdfre",
      category: "tasty",
      priceTypes: "$$$",
    },
    {
      _id: "14523",
      name: "Omsdfer",
      address: "thesdfre",
      category: "tasty",
      priceTypes: "$$$",
    },
    {
      _id: "14523",
      name: "Omsdfer",
      address: "thesdfre",
      category: "tasty",
      priceTypes: "$$$",
    },
    {
      _id: "14523",
      name: "Omsdfer",
      address: "thesdfre",
      category: "tasty",
      priceTypes: "$$$",
    },
    {
      _id: "14523",
      name: "Omsdfer",
      address: "thesdfre",
      category: "tasty",
      priceTypes: "$$$",
    },
    {
      _id: "14523",
      name: "Omsdfer",
      address: "thesdfre",
      category: "tasty",
      priceTypes: "$$$",
    },
    {
      _id: "14523",
      name: "Omsdfer",
      address: "thesdfre",
      category: "tasty",
      priceTypes: "$$$",
    },
  ];

  return (
    <>
      <RestaurantSearch onSubmit={(location) => searchRestaurants(location)} />
      <div className={style.restaurantsList} ref={listRef}>
        {a.map((restaurant) => (
          <div key={restaurant._id} className={style.row} onClick={() => setSelectedResstaurant(restaurant)}>
            <span style={{fontWeight: "bold"}}>{restaurant.name}</span>
            <span style={{fontSize: ".8em"}}>{restaurant.category ? `${restaurant.category} - `: ""}{restaurant.address}</span>
          </div>
        ))}
        {isLoading ? (
          restaurants.length ? (
            <div className={style.spinner}>
              <CircularProgress />
            </div>
          ) : (
            <CircularProgress />
          )
        ) : (
          restaurants.length === 0 &&
          location !== "" && <p>There is no restaurants</p>
        )}
      </div>
    </>
  );
};

export default RestaurantsList;
