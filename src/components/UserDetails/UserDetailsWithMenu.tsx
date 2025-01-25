import { FC } from "react";
import UserDetail from "./UserDetails";
import MenuContainer from "../MenuContainer/MenuContainer";
import style from "./UserDetails.module.css";
import userService, { User } from "../../services/userService";

interface UserDetailsMenuProps {
  onDelete: (close: () => void) => void;
  onUpdate: (close: () => void) => void;
  user: User;
  userDetailsStyle: CSSModuleClasses;
}

const UserDetailWithMenu: FC<UserDetailsMenuProps> = ({
  user,
  onDelete,
  onUpdate,
  userDetailsStyle,
}) => {
  return (
    <div className={style.userDetails}>
      <UserDetail user={user} style={userDetailsStyle} />
      {user._id === userService.getLoggedUserId() && (
        <MenuContainer
          className={style.menu}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default UserDetailWithMenu;
