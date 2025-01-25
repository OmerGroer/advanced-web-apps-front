import { FC } from "react";
import style from "./Post.module.css";
import { Post as IPost } from "../../services/postService";
import UserDetail from "../UserDetails/UserDetails";
import Image from "../Image/Image";
import { Rating } from "@mui/material";

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
        <Rating name="rating" defaultValue={post.rating} precision={1} size="large" className={style.rating} readOnly />
      </div>
      <p className={style.content}>{post.content}</p>
      <Image
        src={`${import.meta.env.VITE_SERVER_URL}${post.imageUrl}`}
        alt={post.restaurant.name}
        className={style.image}
      />
      {children}
    </div>
  );
};

export default Post;
