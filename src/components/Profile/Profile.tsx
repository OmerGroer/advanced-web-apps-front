import { FC } from "react";
import style from "./Profile.module.css";
import PostsList from "../PostsList/PostsList";
import UserDetail from "../UserDetails/UserDetails";
import useUserById from "../../hooks/useUserById";
import userService from "../../services/userService";
import { CircularProgress } from "@mui/material";
import useToastError from "../../hooks/useRoastError";

const Profile: FC = () => {
  const userId = userService.getLoggedUserId();
  const { user, error, isLoading } = useUserById(userId);
  useToastError(error);

  if (!userId) return

  return (
    <>
      {user && <UserDetail style={style} user={user} />}
      {isLoading && (
        <div className={style.spinnerContainer}>
          <CircularProgress />
        </div>
      )}
      <div className={style.postsContainer}>
        <PostsList userId={userId} />
      </div>
    </>
  );
};

export default Profile;
