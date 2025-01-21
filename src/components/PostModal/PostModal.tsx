import { FC } from "react";
import { createPortal } from "react-dom";
import style from "./PostModal.module.css";
import usePostById from "../../hooks/usePostById";
import Post from "../Post/Post";
import { CircularProgress } from "@mui/material";
import CommentsList from "../CommentsList/CommentsList";
import CommentForm from "../CommentForm/CommentForm";
import useCommentsByPostId from "../../hooks/useCommentsByPostId";
import useToastError from "../../hooks/useRoastError";
import { Comment } from "../../services/commentService";

interface PostModalProps {
  postId: string;
  onClose: () => void;
}

const PostModal: FC<PostModalProps> = ({ postId, onClose }) => {
  const {
    post,
    error: postError,
    isLoading: isLoadingPosts,
  } = usePostById(postId);
  const {
    comments,
    setComments,
    isLoading: isLoadingComments,
    error: commentError,
  } = useCommentsByPostId(postId);

  useToastError(postError);
  useToastError(commentError);

  const onModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const onCommentSubmit = (comment: Comment) => {
    setComments((prevComments) => [comment, ...prevComments]);
  };

  return createPortal(
    <div className={style.backdrop} onClick={onClose}>
      <div className={style.modal} onClick={onModalClick}>
        <span className={style.x} onClick={onClose}>
          ×
        </span>
        <div className={style.postContainer}>
          {post && <Post post={post!} />}{" "}
          {isLoadingPosts && <CircularProgress />}
        </div>
        <div>
          <div className={style.commentsListContainer}>
            <CommentsList comments={comments} isLoading={isLoadingComments} />
          </div>
          <div className={style.commentFormContainer}>
            <CommentForm postId={postId} onSubmit={onCommentSubmit} />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("root")!
  );
};

export default PostModal;
