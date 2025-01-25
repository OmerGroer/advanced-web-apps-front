import { Menu, MenuItem } from "@mui/material";
import { FC, useState } from "react";
import MenuImage from "../../assets/menu.svg";

interface MenuContainerProps {
  onDelete: (close: () => void) => void;
  onUpdate: (close: () => void) => void;
  className: string;
}

const MenuContainer: FC<MenuContainerProps> = ({
  onDelete,
  onUpdate,
  className,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const close = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <img
        src={MenuImage}
        alt="menu"
        onClick={handleClick}
        className={className}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={close}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => onUpdate(close)}>Edit</MenuItem>
        <MenuItem onClick={() => onDelete(close)}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default MenuContainer;
