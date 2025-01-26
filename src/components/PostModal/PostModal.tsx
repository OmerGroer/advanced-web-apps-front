import { FC } from "react";
import { createPortal } from "react-dom";
import style from "./PostModal.module.css";
import Post from "../Post/Post";
import { CircularProgress } from "@mui/material";
import CommentsList from "../CommentsList/CommentsList";
import useToastError from "../../hooks/useToastError";
import useById from "../../hooks/useById";
import postService, { Post as IPost } from "../../services/postService";

interface PostModalProps {
  postId: string;
  onClose: (wasDeleted: boolean) => void;
}

const PostModal: FC<PostModalProps> = ({ postId, onClose }) => {
  const { item: post, setItem: setPost, error, isLoading } = useById<IPost>(postId, postService.getPostById);

  useToastError(error);

  const onModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return createPortal(
    <div className={style.backdrop} onClick={() => onClose(false)}>
      <div className={style.modal} onClick={onModalClick}>
        <span className={style.x} onClick={() => onClose(false)}>
          ×
        </span>
        <div className={style.postContainer}>
          {post && <Post post={post!} onEdit={(post) => setPost(post)} onDelete={() => onClose(true)} />}
          {isLoading && <CircularProgress />}
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
