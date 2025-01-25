import { FC, useActionState } from "react";
import style from "./RestaurantSearch.module.css";
import classNames from "classnames";

interface RestaurantSearchProps {
  onSubmit: (location: string) => void;
}

const RestaurantSearch: FC<RestaurantSearchProps> = ({ onSubmit }) => {
  const [prevLocation, submitAction, isPending] = useActionState<
    string,
    FormData
  >(async (prevLocation, formData) => {
    const data = Object.fromEntries(formData);

    if (typeof data.location === "string") {
      if (prevLocation !== data.location) onSubmit(data.location);
      return data.location;
    }

    return "";
  }, "");

  return (
    <form action={submitAction} className={style.form}>
      <input
        type="text"
        name="location"
        className={style.input}
        placeholder="Country/City/ZIP code/Address/Neighborhood"
        defaultValue={prevLocation}
      />
      <button
        type="submit"
        disabled={isPending}
        className={classNames("actionButton", style.button)}
      >
        Search
      </button>
    </form>
  );
};

export default RestaurantSearch;
