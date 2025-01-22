import { FC, Ref, useActionState, useImperativeHandle, useRef } from "react";
import style from "./CommentForm.module.css";
import commentService, { Comment } from "../../services/commentService";
import { toast } from "react-toastify";

interface CommentFormProps {
  postId: string;
  onSubmit: (comment: Comment, isNew: boolean) => void;
  ref: Ref<CommentFormHandle>;
}

export interface CommentFormHandle {
  updateComment: (comment: Comment) => void;
}

const CommentForm: FC<CommentFormProps> = ({ postId, onSubmit, ref }) => {
  const commentId = useRef<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [, submitAction, isPending] = useActionState<null, FormData>(
    async (_, formData) => {
      const content = formData.get("comment") as string;

      if (!content) {
        toast.error("Comment is empty");
        return null;
      }

      try {
        const submit = async () => {
          if (commentId.current !== null) {
            return (
              await commentService.updateComment(commentId.current, content)
            ).data;
          } else {
            return (await commentService.createComment(postId, content)).data;
          }
        };

        onSubmit(await submit(), commentId.current === null);
      } catch (error) {
        toast.error((error as Error).message);
      }
      commentId.current = null;
      return null;
    },
    null
  );

  useImperativeHandle(
    ref,
    (): CommentFormHandle => ({
      updateComment: (comment: Comment) => {
        commentId.current = comment._id
        if (inputRef.current !== null) inputRef.current.value = comment.content
      },
    })
  );

  return (
    <form action={submitAction} className={style.form}>
      <input
        ref={inputRef}
        type="text"
        name="comment"
        className={style.input}
      />
      <button
        type="submit"
        disabled={isPending}
        className={`actionButton ${style.button}`}
      >
        Send
      </button>
    </form>
  );
};

export default CommentForm;
