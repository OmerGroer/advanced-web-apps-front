import { FC } from "react";
import style from "./UsersSearch.module.css";
import SearchForm from "../SearchForm/SearchForm";
import { CircularProgress } from "@mui/material";
import useToastError from "../../hooks/useToastError";
import useScroll from "../../hooks/useScroll";
import useSearch from "../../hooks/useSearch";
import UserDetail from "../UserDetails/UserDetails";
import userService, { User } from "../../services/userService";
import { SHOW_PROFILE } from "../FloatingProfile/FloatingProfile";
import { ShowEvent } from "../../hooks/useSingletonId";

const UsersSearch: FC = () => {
  const { items, search, loadMore, isLoading, error, value } = useSearch<User>(
    userService.searchUsers
  );
  const listRef = useScroll<HTMLDivElement>(loadMore);
  useToastError(error);

  const onClick = (id: string) => {
    document.dispatchEvent(
      new CustomEvent<ShowEvent>(SHOW_PROFILE, { detail: { id } })
    );
  };

  return (
    <>
      <SearchForm placeholder="User name" onSubmit={(value) => search(value)} />
      <div className={style.user} ref={listRef}>
        {items.map((user) => (
          <UserDetail
            key={user._id}
            user={user}
            style={style}
            onClick={() => onClick(user._id)}
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
          items.length === 0 && value !== "" && <p>There is no users</p>
        )}
      </div>
    </>
  );
};

export default UsersSearch;
