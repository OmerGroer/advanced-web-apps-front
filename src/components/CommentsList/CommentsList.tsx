import { FC } from "react";
import style from "./CommentsList.module.css";
import { CircularProgress } from "@mui/material";
import { Comment } from "../../services/commentService";

interface CommentsListProps {
  comments: Comment[];
  isLoading: boolean;
}

const CommentsList: FC<CommentsListProps> = ({ comments, isLoading }) => {
  return (
    <div className={style.commentsList}>
      {comments.map((comment) => (
        <div key={comment._id}>
          <div className={style.userDetails}>
            <img
              src={`${import.meta.env.VITE_SERVER_URL}${
                comment.sender.avatarUrl
              }`}
              alt={comment.sender.username}
              className={style.avatar}
            />
            <span className={style.username}>{comment.sender.username}</span>
          </div>
          <span>{comment.content}</span>
        </div>
      ))}
      {isLoading && <CircularProgress />}
    </div>
  );
};

export default CommentsList;
