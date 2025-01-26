import { FC, ReactNode } from "react";
import style from "./Navbar.module.css";
import { NavLink } from "react-router";
import classNames from "classnames";
import Profile from "../Profile/Profile";
import userService from "../../services/userService";
import RestaurantsList from "../RestaurantsList/RestaurantsList";
import Feed from "../Feed/Feed";

interface Endpoint {
  name: string;
  path: string;
  element: ReactNode;
}

export const Endpoints: Endpoint[] = [
  {
    name: "Feed",
    path: "/",
    element: <Feed />,
  },
  {
    name: "New",
    path: "/new",
    element: <RestaurantsList />,
  },
  {
    name: "Profile",
    path: "/profile",
    element: <Profile />,
  },
];

interface NavbarProps {
  setLoggedOut: () => void;
}

const Navbar: FC<NavbarProps> = ({ setLoggedOut }) => {
  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      await userService.logout(refreshToken);
      localStorage.clear();
      setLoggedOut();
    }
  };

  return (
    <div className={style.navbar}>
      <span className={style.title}>Table Talk</span>
      {Endpoints.map((endpoint) => (
        <NavLink
          key={endpoint.path}
          to={endpoint.path}
          end
          className={style.navLink}
        >
          {({ isActive }) => (
            <span
              className={classNames(style.link, { [style.active]: isActive })}
            >
              {isActive ? "👉" : ""} {endpoint.name}
            </span>
          )}
        </NavLink>
      ))}
      <span
        className={classNames(style.navLink, style.link, style.signout)}
        onClick={logout}
      >
        Sign Out
      </span>
    </div>
  );
};

export default Navbar;
