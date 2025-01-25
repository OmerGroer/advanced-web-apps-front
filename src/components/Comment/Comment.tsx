import { FC } from "react";
import commentService, {
  Comment as IComment,
} from "../../services/commentService";
import style from "./Comment.module.css";
import { toast } from "react-toastify";
import UserDetail from "../UserDetails/UserDetails";
import userService from "../../services/userService";
import MenuContainer from "../MenuContainer/MenuContainer";

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
      <div className={style.userDetails}>
        <UserDetail user={comment.sender} style={style} />
        {comment.sender._id === userService.getLoggedUserId() && (
          <MenuContainer
            className={style.menu}
            onDelete={onDeleteClick}
            onUpdate={onUpdateClick}
          />
        )}
      </div>
      <span>{comment.content}</span>
    </>
  );
};

export default Comment;
