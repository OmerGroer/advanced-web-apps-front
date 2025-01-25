import { FC, Ref, useActionState, useImperativeHandle, useRef } from "react";
import style from "./CommentForm.module.css";
import commentService, { Comment } from "../../services/commentService";
import { toast } from "react-toastify";
import classNames from "classnames";
import { CircularProgress } from "@mui/material";

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
        toast.success("Comment was uploaded successfully");
      } catch (error) {
        console.error(error)
        const innerError = error as {response: {data: string}, message: string}
        toast.error(innerError.response.data || "Problem has occured");
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
        {isPending && <CircularProgress size={25} />}
      <button
        type="submit"
        disabled={isPending}
        className={classNames("actionButton", style.button)}
      >
        Send
      </button>
    </form>
  );
};

export default CommentForm;
