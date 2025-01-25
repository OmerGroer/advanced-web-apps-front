import { FC } from "react";
import { createPortal } from "react-dom";
import style from "./PostModal.module.css";
import usePostById from "../../hooks/usePostById";
import Post from "../Post/Post";
import { CircularProgress } from "@mui/material";
import CommentsList from "../CommentsList/CommentsList";
import useToastError from "../../hooks/useToastError";

interface PostModalProps {
  postId: string;
  onClose: () => void;
}

const PostModal: FC<PostModalProps> = ({ postId, onClose }) => {
  const { post, error, isLoading } = usePostById(postId);

  useToastError(error);

  const onModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return createPortal(
    <div className={style.backdrop} onClick={onClose}>
      <div className={style.modal} onClick={onModalClick}>
        <span className={style.x} onClick={onClose}>
          ×
        </span>
        <div className={style.postContainer}>
          {post && <Post post={post!} />} {isLoading && <CircularProgress />}
        </div>
        <div>
          <CommentsList postId={postId} />
        </div>
      </div>
    </div>,
    document.getElementById("root")!
  );
};

export default PostModal;
