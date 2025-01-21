import { FC, useState } from "react";
import style from "./PostsList.module.css";
import usePosts from "../../hooks/usePosts";
import { CircularProgress } from "@mui/material";
import PostModal from "../PostModal/PostModal";
import Post from "../Post/Post";
import useToastError from "../../hooks/useRoastError";

const PostsList: FC = () => {
  const { posts, isLoading, error } = usePosts();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useToastError(error)

  return (
    <div className={style.postsList}>
      {posts.map((post) => (
        <Post key={post._id} post={post}>
          <div className={style.actions}>
            <button className={"actionButton"}>
              {post.isLiked ? "Unlike" : "Like"}
            </button>
            <button
              className={"actionButton"}
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
