import { FC, useState } from "react";
import style from "./RestaurantsList.module.css";
import useRestaurants, { Restaurant } from "../../hooks/useRestaurants";
import useToastError from "../../hooks/useToastError";
import useScroll from "../../hooks/useScroll";
import { CircularProgress } from "@mui/material";
import RestaurantSearch from "../RestaurantSearch/RestaurantSearch";
import AddPost from "../AddPost/AddPost";

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

  return (
    <>
      <RestaurantSearch onSubmit={(location) => searchRestaurants(location)} />
      <div className={style.restaurantsList} ref={listRef}>
        {restaurants.map((restaurant) => (
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
      {selectedRestaurant && <AddPost onClose={() => setSelectedResstaurant(null)} restaurant={selectedRestaurant} />}
    </>
  );
};

export default RestaurantsList;
