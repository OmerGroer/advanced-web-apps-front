import { FC, useActionState } from "react";
import style from "./SearchForm.module.css";
import classNames from "classnames";
import { toast } from "react-toastify";

interface SearchFormProps {
  onSubmit: (value: string) => void;
  placeholder: string;
}

const SearchForm: FC<SearchFormProps> = ({ onSubmit, placeholder }) => {
  const [prevValue, submitAction, isPending] = useActionState<
    string,
    FormData
  >(async (prevValue, formData) => {
    const data = Object.fromEntries(formData);

    if (!data.value) toast.error("Search is empty")

    if (typeof data.value === "string") {
      if (prevValue !== data.value) onSubmit(data.value);
      return data.value;
    }

    return "";
  }, "");

  return (
    <form action={submitAction} className={style.form}>
      <input
        type="text"
        name="value"
        className={style.input}
        placeholder={placeholder}
        defaultValue={prevValue}
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

export default SearchForm;
