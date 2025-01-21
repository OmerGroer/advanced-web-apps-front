import { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import style from "./PostModal.module.css";
import usePostById from "../../hooks/usePostById";
import Post from "../Post/Post";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

interface PostModalProps {
  postId: string;
  onClose: () => void;
}

const PostModal: FC<PostModalProps> = ({ postId, onClose }) => {
  const { post, error, isLoading } = usePostById(postId);

  useEffect(() => {
      if (error) {
        toast.error(error);
      }
    }, [error]);

  const onModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return createPortal(
    <div className={style.backdrop} onClick={onClose}>
      <div className={style.modal} onClick={onModalClick}>
        <div className={style.postContainer}>{post && <Post post={post!} />} {isLoading && <CircularProgress />}</div>
        <div></div>
      </div>
    </div>,
    document.getElementById("root")!
  );
};

export default PostModal;
