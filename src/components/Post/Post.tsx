import { FC } from "react";
import style from "./Post.module.css";
import { Post as IPost } from "../../services/postService";
import starImg from "../../assets/star_on.png";

interface PostProps {
  post: IPost;
  children?: React.ReactNode;
}

const Post: FC<PostProps> = ({ post, children }) => {
  return (
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
          <img key={index} src={starImg} alt="star" className={style.star} />
        ))}
      </div>
      <p className={style.content}>{post.content}</p>
      <img
        src={`${import.meta.env.VITE_SERVER_URL}${post.imageUrl}`}
        alt={post.restaurant.name}
        className={style.image}
      />
      {children}
    </div>
  );
};

export default Post;
