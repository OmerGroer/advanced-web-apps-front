import { FC } from "react";
import style from "./Recommendation.module.css";
import useRecommendation, {
  Recommendation as IRecommendation,
} from "../../hooks/useRecommendation";
import { CircularProgress, Rating } from "@mui/material";
import useToastError from "../../hooks/useToastError";

let recommendationCache: IRecommendation | null = null;

const Recommendation: FC = () => {
  const { recommendation, error, isLoading } =
    useRecommendation(recommendationCache);
  recommendationCache = recommendation;

  useToastError(error);

  return (
    <>
      {isLoading && <CircularProgress />}
      {recommendation && (
        <div className={style.main}>
          <div>
            <span className={style.restaurantName}>
              {recommendation.restaurant.name}
            </span>
            <Rating
              name="rating"
              defaultValue={recommendation.rating}
              precision={1}
              size="large"
              readOnly
            />
          </div>
          <span>{`${recommendation.restaurant.cuisines.join("/")} - ${recommendation.restaurant.priceTypes}`}</span>
          <span>{recommendation.restaurant.address}</span>
          <p className={style.content}>{recommendation.content}</p>
        </div>
      )}
    </>
  );
};

export default Recommendation;
