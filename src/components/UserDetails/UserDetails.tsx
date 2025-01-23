import { FC } from "react";
import { User } from "../../services/userService";
import Image from "../Image/Image";

interface UserDetailsProps {
  user: User;
  style: CSSModuleClasses;
}

const UserDetail: FC<UserDetailsProps> = ({ user, style }) => {
  return (
    <div className={style.userDetails}>
      <Image
        src={`${import.meta.env.VITE_SERVER_URL}${user.avatarUrl}`}
        alt={user.username}
        className={style.avatar}
      />
      <span className={style.username}>{user.username}</span>
    </div>
  );
};

export default UserDetail;
