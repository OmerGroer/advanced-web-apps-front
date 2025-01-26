import { FC, useState } from "react";
import style from "./Profile.module.css";
import PostsList from "../PostsList/PostsList";
import UserDetail from "../UserDetails/UserDetails";
import userService, { User } from "../../services/userService";
import { CircularProgress } from "@mui/material";
import useToastError from "../../hooks/useToastError";
import ProfileForm from "../ProfileForm/ProfileForm";
import useById from "../../hooks/useById";

interface ProfileProps {
  id?: string;
}

const Profile: FC<ProfileProps> = ({ id }) => {
  const userId = id || userService.getLoggedUserId();
  const [isEdit, setEdit] = useState<boolean>(false);
  const { item, error, isLoading, setItem } = useById<User>(
    userId,
    userService.getUserById
  );
  useToastError(error);

  if (!userId) return;

  const onCloseModal = (user?: User) => {
    if (user) setItem(user);
    setEdit(false);
  };

  return (
    <>
      {isLoading ? (
        <div className={style.spinnerContainer}>
          <CircularProgress />
        </div>
      ) : (
        item && (
          <UserDetail style={style} user={item} onClick={!id ? () => setEdit(true) : undefined} />
        )
      )}
      <div className={style.postsContainer}>
        <PostsList userId={userId} key={userId} />
      </div>
      {isEdit && item && <ProfileForm onClose={onCloseModal} user={item} />}
    </>
  );
};

export default Profile;
