import { FC, useTransition } from "react";
import commentService, {
  Comment as IComment,
} from "../../services/commentService";
import style from "./Comment.module.css";
import { toast } from "react-toastify";
import UserDetailWithMenu from "../UserDetails/UserDetailsWithMenu";
import classNames from "classnames";

interface CommentProps {
  comment: IComment;
  onDelete: (commentId: string) => void;
  onUpdate: (commment: IComment) => void;
}

const Comment: FC<CommentProps> = ({ comment, onDelete, onUpdate }) => {
  const [isPending, startTransition] = useTransition();

  const onDeleteClick = (close: () => void) => {
    startTransition(async () => {
      try {
        await commentService.deleteComment(comment._id);
        toast.success("Comment was deleted successfully");
        onDelete(comment._id);
      } catch (error) {
        console.error(error);
        toast.error("Problem has occured");
      } finally {
        close();
      }
    });
  };

  const onUpdateClick = (close: () => void) => {
    onUpdate(comment);
    close();
  };

  return (
    <div className={classNames(style.row, { [style.deleted]: isPending })}>
      <UserDetailWithMenu
        userDetailsStyle={style}
        onDelete={onDeleteClick}
        onUpdate={onUpdateClick}
        user={comment.sender}
        disabled={isPending}
      />
      <span>{comment.content}</span>
    </div>
  );
};

export default Comment;
