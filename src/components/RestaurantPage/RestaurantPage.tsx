import { FC } from "react";
import style from "./RestaurantPage.module.css";
import PostsList from "../PostsList/PostsList";
import { CircularProgress } from "@mui/material";
import useToastError from "../../hooks/useToastError";
import useById from "../../hooks/useById";
import restaurantService, {
  RatingRestaurant,
} from "../../services/restaurantService";
import { createPortal } from "react-dom";
import RestaurantDetails from "../RestaurantDetails/RestaurantDetails";
import useSingletonId from "../../hooks/useSingletonId";

export const SHOW_RESTAURANT = "SHOW_RESTAURANT";

const RestaurantPage: FC = () => {
  const { id, clear } = useSingletonId(SHOW_RESTAURANT);
  const { item, error, isLoading } = useById<RatingRestaurant>(
    id,
    restaurantService.getById
  );
  useToastError(error);

  if (!id) return;

  const onModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return createPortal(
    <div className={style.backdrop} onClick={clear}>
      <div className={style.modal} onClick={onModalClick}>
        <span className={style.x} onClick={clear}>
          ×
        </span>
        <span className={style.plus} onClick={clear}>
          +
        </span>
        {isLoading ? (
          <div className={style.spinnerContainer}>
            <CircularProgress />
          </div>
        ) : (
          item && (
            <RestaurantDetails
              restaurant={item}
              style={style}
              rating={item.rating}
            />
          )
        )}
        <div className={style.postsContainer}>
          <PostsList restaurantId={id} />
        </div>
      </div>
    </div>,
    document.getElementById("root")!
  );
};

export default RestaurantPage;
