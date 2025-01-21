import { FC, useActionState } from "react";
import style from "./CommentForm.module.css";
import commentService, { Comment } from "../../services/commentService";
import { toast } from "react-toastify";

interface CommentFormProps {
  postId: string;
  onSubmit: (comment: Comment) => void
}

const CommentForm: FC<CommentFormProps> = ({ postId, onSubmit }) => {
  const [, submitAction, isPending] = useActionState<null, FormData>(
    async (_, formData) => {
      const content = formData.get("comment") as string;

      if (!content) {
        toast.error("Comment is empty");
        return null;
      }

      try {
        const response = (await commentService.createComment(postId, content)).data;
        onSubmit(response)
      } catch (error) {
        toast.error((error as Error).message);
      }
      return null;
    },
    null
  );

  return (
    <form action={submitAction} className={style.form}>
      <input type="text" name="comment" className={style.input} />
      <button type="submit" disabled={isPending} className={`actionButton ${style.button}`}>
        Send
      </button>
    </form>
  );
};

export default CommentForm;
