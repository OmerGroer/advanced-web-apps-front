import { FC, useEffect, useState } from "react";
import style from "./PostsList.module.css";
import usePosts from "../../hooks/usePosts";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import PostModal from "../PostModal/PostModal";
import Post from "../Post/Post";

const PostsList: FC = () => {
  const { posts, isLoading, error } = usePosts();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className={style.postsList}>
      {posts.map((post) => (
        <Post key={post._id} post={post}>
          <div className={style.actions}>
            <button className={style.actionButton}>
              {post.isLiked ? "Unlike" : "Like"}
            </button>
            <button
              className={style.actionButton}
              onClick={() => setSelectedPostId(post._id)}
            >{`Comment (${post.numberOfComments})`}</button>
          </div>
        </Post>
      ))}
      {isLoading && <CircularProgress />}
      {selectedPostId && (
        <PostModal
          postId={selectedPostId}
          onClose={() => setSelectedPostId(null)}
        />
      )}
    </div>
  );
};

export default PostsList;
