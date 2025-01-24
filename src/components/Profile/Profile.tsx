import { FC, useState } from "react";
import style from "./Profile.module.css";
import PostsList from "../PostsList/PostsList";
import UserDetail from "../UserDetails/UserDetails";
import useUserById from "../../hooks/useUserById";
import userService, { User } from "../../services/userService";
import { CircularProgress } from "@mui/material";
import useToastError from "../../hooks/useRoastError";
import ProfileForm from "../ProfileForm/ProfileForm";

const Profile: FC = () => {
  const userId = userService.getLoggedUserId();
  const [isEdit, setEdit] = useState<boolean>(false);
  const { user, error, isLoading, setUser } = useUserById(userId);
  useToastError(error);

  if (!userId) return;

  const onCloseModal = (user?: User) => {
    if (user) setUser(user)
    setEdit(false);
  };

  return (
    <>
      {isLoading ? (
        <div className={style.spinnerContainer}>
          <CircularProgress />
        </div>
      ) : (
        user && (
          <UserDetail style={style} user={user} onClick={() => setEdit(true)} />
        )
      )}
      <div className={style.postsContainer}>
        <PostsList userId={userId} />
      </div>
      {isEdit && user && <ProfileForm onClose={onCloseModal} user={user} />}
    </>
  );
};

export default Profile;
