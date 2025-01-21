import { FC, useEffect } from "react";
import style from "./PostsList.module.css";
import starImg from "../../assets/star_on.png";
import usePosts from "../../hooks/usePosts";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const PostsList: FC = () => {
  const { posts, isLoading, error } = usePosts()

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className={style.postsList}>
      {posts.map((post) => (
        <div key={post._id} className={style.post}>
          <div className={style.userDetails}>
            <img
              src={`${import.meta.env.VITE_SERVER_URL}${post.sender.avatarUrl}`}
              alt={post.sender.username}
              className={style.avatar}
            />
            <span className={style.username}>{post.sender.username}</span>
          </div>
          <div>
            <span className={style.restaurantName}>{post.restaurant.name}</span>
            {Array.from({ length: post.rating }).map((_, index) => (
              <img
                key={index}
                src={starImg}
                alt="star"
                className={style.star}
              />
            ))}
          </div>
          <p className={style.content}>{post.content}</p>
          <img
            src={`${import.meta.env.VITE_SERVER_URL}${post.imageUrl}`}
            alt={post.restaurant.name}
            className={style.image}
          />
          <div className={style.actions}>
            <button className={style.actionButton}>
              {post.isLiked ? "Unlike" : "Like"}
            </button>
            <button className={style.actionButton}>{`Comment (${post.numberOfComments})`}</button>
          </div>
        </div>
      ))}
      {isLoading && <CircularProgress />}
    </div>
  );
};

export default PostsList;
