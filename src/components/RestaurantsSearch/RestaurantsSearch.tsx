import { FC } from "react";
import style from "./RestaurantsSearch.module.css";
import SearchForm from "../SearchForm/SearchForm";
import { CircularProgress } from "@mui/material";
import useToastError from "../../hooks/useToastError";
import useScroll from "../../hooks/useScroll";
import useSearch from "../../hooks/useSearch";
import restaurantService, {
  RatingRestaurant,
} from "../../services/restaurantService";
import { SHOW_RESTAURANT } from "../RestaurantPage/RestaurantPage";
import RestaurantDetails from "../RestaurantDetails/RestaurantDetails";
import { ShowEvent } from "../../hooks/useSingletonId";

const RestaurantsSearch: FC = () => {
  const { items, search, loadMore, isLoading, error, value } =
    useSearch<RatingRestaurant>(restaurantService.searchRestaurants);
  const listRef = useScroll<HTMLDivElement>(loadMore);
  useToastError(error);

  const onClick = (id: string) => {
    document.dispatchEvent(
      new CustomEvent<ShowEvent>(SHOW_RESTAURANT, { detail: { id } })
    );
  };

  return (
    <>
      <SearchForm
        placeholder="Name/Place/Cuisines"
        onSubmit={(value) => search(value)}
      />
      <div className={style.restaurantsList} ref={listRef}>
        {items.map((restaurant) => (
          <RestaurantDetails
            key={restaurant._id}
            restaurant={restaurant}
            style={style}
            onClick={() => onClick(restaurant._id)}
            rating={restaurant.rating}
          />
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
          items.length === 0 && value !== "" && <p>There is no restaurants</p>
        )}
      </div>
    </>
  );
};

export default RestaurantsSearch;
