import { FC } from "react";
import commentService, {
  Comment as IComment,
} from "../../services/commentService";
import style from "./Comment.module.css";
import { toast } from "react-toastify";
import UserDetailWithMenu from "../UserDetails/UserDetailsWithMenu";

interface CommentProps {
  comment: IComment;
  onDelete: (commentId: string) => void;
  onUpdate: (commment: IComment) => void;
}

const Comment: FC<CommentProps> = ({ comment, onDelete, onUpdate }) => {
  const onDeleteClick = (close: () => void) => {
    commentService
      .deleteComment(comment._id)
      .then(() => {
        close();
        onDelete(comment._id);
      })
      .catch((error) => {
        toast.error(error.message);
        close();
      });
  };

  const onUpdateClick = (close: () => void) => {
    onUpdate(comment);
    close();
  };

  return (
    <>
      <UserDetailWithMenu
        userDetailsStyle={style}
        onDelete={onDeleteClick}
        onUpdate={onUpdateClick}
        user={comment.sender}
      />
      <span>{comment.content}</span>
    </>
  );
};

export default Comment;
