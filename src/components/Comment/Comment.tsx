import { FC, useState } from "react";
import { Comment as IComment } from "../../services/commentService";
import style from "./Comment.module.css";
import { Menu, MenuItem } from "@mui/material";
import MenuImage from "../../assets/menu.svg";
import { getLoggedUserId } from "../../services/apiClient";

interface CommentProps {
  comment: IComment;
}

const Comment: FC<CommentProps> = ({ comment }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className={style.userDetails}>
        <div>
          <img
            src={`${import.meta.env.VITE_SERVER_URL}${
              comment.sender.avatarUrl
            }`}
            alt={comment.sender.username}
            className={style.avatar}
          />
          <span className={style.username}>{comment.sender.username}</span>
        </div>
        {comment.sender._id === getLoggedUserId() && (
          <img
            src={MenuImage}
            alt="menu"
            onClick={handleClick}
            className={style.menu}
          />
        )}
      </div>
      <span>{comment.content}</span>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default Comment;
