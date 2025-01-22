import { FC } from "react";
import style from "./Post.module.css";
import { Post as IPost } from "../../services/postService";
import starImg from "../../assets/star_on.png";
import UserDetail from "../UserDetails/UserDetails";

interface PostProps {
  post: IPost;
  withoutUser?: boolean;
  children?: React.ReactNode;
}

const Post: FC<PostProps> = ({ post, children, withoutUser = false }) => {
  return (
    <div key={post._id} className={style.post}>
      {!withoutUser && <UserDetail user={post.sender} style={style} />}
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
