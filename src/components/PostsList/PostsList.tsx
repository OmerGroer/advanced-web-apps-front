import { FC, useState } from "react";
import style from "./PostsList.module.css";
import usePosts from "../../hooks/usePosts";
import { CircularProgress } from "@mui/material";
import PostModal from "../PostModal/PostModal";
import Post from "../Post/Post";
import useToastError from "../../hooks/useRoastError";
import postService, { Post as IPost } from "../../services/postService";
import likeService from "../../services/likeService";
import { toast } from "react-toastify";

interface PostsListProps {
  userId?: string;
}

const PostsList: FC<PostsListProps> = ({ userId }) => {
  const { posts, setPosts, isLoading, error } = usePosts(userId);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useToastError(error);

  const refershPost = async (postId: string) => {
    try {
      const newPost = (await postService.getPostById(postId).request).data;
      setPosts((prevPosts) =>
        prevPosts.map((oldPost) => (oldPost._id !== postId ? oldPost : newPost))
      );
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const onLikeClick = async (post: IPost) => {
    try {
      if (post.isLiked) {
        await likeService.unlike(post._id);
      } else {
        await likeService.like(post._id);
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      await refershPost(post._id);
    }
  };

  const onCloseModal = () => {
    setSelectedPostId((prevId) => {
      if (prevId !== null) refershPost(prevId);
      return null;
    });
  };

  return (
    <div className={style.postsList}>
      {posts.map((post) => (
        <Post key={post._id} post={post} withoutUser={!!userId}>
          <div>
            <button
              className={"actionButton"}
              onClick={() => onLikeClick(post)}
            >
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
        <PostModal postId={selectedPostId} onClose={onCloseModal} />
      )}
    </div>
  );
};

export default PostsList;
