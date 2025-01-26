import { FC, useState } from "react";
import style from "./RestaurantPage.module.css";
import PostsList from "../PostsList/PostsList";
import { CircularProgress } from "@mui/material";
import useToastError from "../../hooks/useToastError";
import useById from "../../hooks/useById";
import restaurantService, {
  RatingRestaurant,
} from "../../services/restaurantService";
import useEventListener from "../../hooks/useEventListener";
import { createPortal } from "react-dom";
import RestaurantDetails from "../RestaurantDetails/RestaurantDetails";

export interface ShowRestaurantEvent {
  id: string;
}

export const SHOW_RESTAURANT = "SHOW_RESTAURANT";

const RestaurantPage: FC = () => {
  const [id, setId] = useState<string | null>(null);
  const { item, error, isLoading } = useById<RatingRestaurant>(
    id,
    restaurantService.getById
  );
  useToastError(error);

  useEventListener(SHOW_RESTAURANT, (event) => {
    const customEvent = event as CustomEvent<ShowRestaurantEvent>;
    setId(customEvent.detail.id);
  });

  if (!id) return;

  const onModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return createPortal(
    <div className={style.backdrop} onClick={() => setId(null)}>
      <div className={style.modal} onClick={onModalClick}>
        <span className={style.x} onClick={() => setId(null)}>
          ×
        </span>
        <span className={style.plus} onClick={() => setId(null)}>
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
