import { FC, useEffect } from "react";
import style from "./CommentsList.module.css";
import useCommentsByPostId from "../../hooks/useCommentsByPostId";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

interface CommentsListProps {
  postId: string;
}

const CommentsList: FC<CommentsListProps> = ({ postId }) => {
  const { comments, isLoading, error } = useCommentsByPostId(postId);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className={style.commentsList}>
      {comments.map((comment) => (
        <>
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
        </>
      ))}
      {isLoading && <CircularProgress />}
    </div>
  );
};

export default CommentsList;
