import { FC } from "react";
import style from "./Profile.module.css";
import PostsList from "../PostsList/PostsList";
import UserDetail from "../UserDetails/UserDetails";
import useUserById from "../../hooks/useUserById";
import userService from "../../services/userService";
import { CircularProgress } from "@mui/material";
import useToastError from "../../hooks/useRoastError";

const Profile: FC = () => {
  const { user, error, isLoading } = useUserById(userService.getLoggedUserId());
  useToastError(error);

  return (
    <>
      {user && <UserDetail style={style} user={user} />}
      {isLoading && <CircularProgress />}
      <div className={style.postsContainer}>
        <PostsList userId={userService.getLoggedUserId()} />
      </div>
    </>
  );
};

export default Profile;
