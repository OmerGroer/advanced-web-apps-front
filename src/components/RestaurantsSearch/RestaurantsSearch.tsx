import { FC } from "react";
import style from "./RestaurantsSearch.module.css";
import SearchForm from "../SearchForm/SearchForm";
import { CircularProgress, Rating } from "@mui/material";
import useToastError from "../../hooks/useToastError";
import useScroll from "../../hooks/useScroll";
import useSearch from "../../hooks/useSearch";
import restaurantService, { RatingRestaurant } from "../../services/restaurantService";

const RestaurantsSearch: FC = () => {
  const {
    items,
    search,
    loadMore,
    isLoading,
    error,
    value,
  } = useSearch<RatingRestaurant>(restaurantService.searchRestaurants);
  const listRef = useScroll<HTMLDivElement>(loadMore);
  useToastError(error);

  return (
    <>
      <SearchForm
        placeholder="Name/Place/cuisines"
        onSubmit={(value) => search(value)}
      />
      <div className={style.restaurantsList} ref={listRef}>
        {items.map((restaurant) => (
          <div key={restaurant._id} className={style.row}>
            <span style={{ fontWeight: "bold" }}>{restaurant.name}<Rating defaultValue={restaurant.rating} size="large" readOnly /></span>
            <span style={{ fontSize: ".8em" }}>
              {restaurant.category ? `${restaurant.category} - ` : ""}
              {restaurant.address}
            </span>
          </div>
        ))}
        {isLoading ? (
          items.length ? (
            <div className={style.spinner}>
              <CircularProgress />
            </div>
          ) : (
            <CircularProgress />
          )
        ) : (
          items.length === 0 &&
          value !== "" && <p>There is no restaurants</p>
        )}
      </div>
    </>
  );
};

export default RestaurantsSearch;
