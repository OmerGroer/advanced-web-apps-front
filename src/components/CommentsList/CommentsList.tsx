import { FC } from "react";
import style from "./CommentsList.module.css";
import { CircularProgress } from "@mui/material";
import { Comment as IComment } from "../../services/commentService";
import Comment from "../Comment/Comment";

interface CommentsListProps {
  comments: IComment[];
  isLoading: boolean;
  onDelete: (commentId: string) => void;
}

const CommentsList: FC<CommentsListProps> = ({ comments, isLoading, onDelete }) => {
  return (
    <div className={style.commentsList}>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment._id} onDelete={onDelete} />
      ))}
      {isLoading && <CircularProgress />}
    </div>
  );
};

export default CommentsList;
