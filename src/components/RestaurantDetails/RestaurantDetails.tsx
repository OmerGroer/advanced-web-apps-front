import { FC } from "react";
import { Restaurant } from "../../services/restaurantService";
import { Rating } from "@mui/material";

interface RestaurantDetailsProps {
  restaurant: Restaurant;
  rating?: number;
  style: CSSModuleClasses;
  onClick?: (id: string) => void;
}

const RestaurantDetails: FC<RestaurantDetailsProps> = ({
  restaurant,
  style,
  onClick,
  rating,
}) => {
  return (
    <div
      key={restaurant._id}
      className={style.row}
      onClick={onClick ? () => onClick(restaurant._id) : undefined}
    >
      <span style={{ fontWeight: "bold" }}>
        {restaurant.name}
        {rating !== undefined && (
          <Rating defaultValue={rating} size="large" readOnly />
        )}
      </span>
      <span style={{ fontSize: ".8em" }}>
        {restaurant.category ? `${restaurant.category} - ` : ""}
        {restaurant.address}
      </span>
    </div>
  );
};

export default RestaurantDetails;
