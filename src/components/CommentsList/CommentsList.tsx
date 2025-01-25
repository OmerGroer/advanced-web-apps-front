import { FC, useRef } from "react";
import style from "./CommentsList.module.css";
import { CircularProgress } from "@mui/material";
import Comment from "../Comment/Comment";
import useCommentsByPostId from "../../hooks/useCommentsByPostId";
import useToastError from "../../hooks/useToastError";
import { Comment as IComment } from "../../services/commentService";
import CommentForm, { CommentFormHandle } from "../CommentForm/CommentForm";

interface CommentsListProps {
  postId: string;
}

const CommentsList: FC<CommentsListProps> = ({ postId }) => {
  const formRef = useRef<CommentFormHandle>(null)
  const { comments, setComments, isLoading, error } =
    useCommentsByPostId(postId);

  useToastError(error);

  const onCommentSubmit = (comment: IComment, isNew: boolean) => {
    if (isNew) {
      setComments((prevComments) => [comment, ...prevComments]);
    } else {
      setComments((prevComments) =>
        prevComments.map((oldComment) =>
          oldComment._id !== comment._id ? oldComment : comment
        )
      );
    }
  };

  const onCommentDelete = (commentId: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );
  };

  const setUpdateComment = (comment: IComment) => {
    formRef.current?.updateComment(comment)
  }

  return (
    <>
      <div className={style.commentsListContainer}>
        {comments.map((comment) => (
          <Comment
            comment={comment}
            key={comment._id}
            onDelete={onCommentDelete}
            onUpdate={setUpdateComment}
          />
        ))}
        {isLoading && <CircularProgress />}
      </div>
      <div className={style.commentFormContainer}>
        <CommentForm ref={formRef} postId={postId} onSubmit={onCommentSubmit} />
      </div>
    </>
  );
};

export default CommentsList;
