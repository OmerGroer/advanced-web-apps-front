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
  disabled?: boolean;
}

const UserDetailWithMenu: FC<UserDetailsMenuProps> = ({
  user,
  onDelete,
  onUpdate,
  userDetailsStyle,
  disabled = false,
}) => {
  return (
    <div className={style.userDetails}>
      <UserDetail user={user} style={userDetailsStyle} />
      {user._id === userService.getLoggedUserId() && (
        <MenuContainer
          disabled={disabled}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default UserDetailWithMenu;
