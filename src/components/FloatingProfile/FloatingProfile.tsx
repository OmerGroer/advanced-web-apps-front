import { FC } from "react";
import style from "./FloatingProfile.module.css";
import Profile from "../Profile/Profile";
import { createPortal } from "react-dom";
import useSingletonId from "../../hooks/useSingletonId";

export const SHOW_PROFILE = "SHOW_PROFILE";

const FloatingProfile: FC = () => {
  const { id, clear } = useSingletonId(SHOW_PROFILE);

  if (!id) return;

  const onModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return createPortal(
    <div className={style.backdrop} onClick={clear}>
      <div className={style.modal} onClick={onModalClick}>
        <span className={style.x} onClick={clear}>
          ×
        </span>
        <Profile id={id} />
      </div>
    </div>,
    document.getElementById("root")!
  );
};

export default FloatingProfile;
