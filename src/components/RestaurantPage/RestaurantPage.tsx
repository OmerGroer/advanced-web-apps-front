import { FC, useState } from "react";
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
import AddPost from "../AddPost/AddPost";

export const SHOW_RESTAURANT = "SHOW_RESTAURANT";

const RestaurantPage: FC = () => {
  const { id, clear } = useSingletonId(SHOW_RESTAURANT);
  const [isAdding, setAdding] = useState<boolean>(false);
  const { item, error, isLoading } = useById<RatingRestaurant>(
    id,
    restaurantService.getById
  );
  useToastError(error);

  if (!id) return;

  const onAddingClose = () => {
    setAdding(false);
    clear();
  }

  return createPortal(
    <div className={style.backdrop}>
      <div className={style.modal}>
        <span className={style.x} onClick={clear}>
          ×
        </span>
        <span className={style.plus} onClick={() => setAdding(true)}>
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
      {isAdding && item && <AddPost onClose={onAddingClose} restaurant={item} />}
    </div>,
    document.getElementById("root")!
  );
};

export default RestaurantPage;
