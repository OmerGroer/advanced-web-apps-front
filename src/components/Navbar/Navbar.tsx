import { FC, ReactNode } from "react";
import style from "./Navbar.module.css";
import Feed from "../Feed/Feed";
import { NavLink } from "react-router";
import classNames from "classnames";

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
    element: <Feed />,
  },
  {
    name: "Profile",
    path: "/profile",
    element: <Feed />,
  },
];

const Navbar: FC = () => {
  return (
    <div className={style.navbar}>
      <span className={style.title}>Table Talk</span>
      {Endpoints.map((endpoint) => (
        <NavLink to={endpoint.path} end className={style.navLink}>
          {({ isActive }) => (
            <span className={classNames(style.link, {[style.active]: isActive})}>
              {isActive ? "👉" : ""} {endpoint.name}
            </span>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default Navbar;
