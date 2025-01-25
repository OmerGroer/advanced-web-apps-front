import { FC } from "react";
import style from "./Post.module.css";
import { Post as IPost } from "../../services/postService";
import starImg from "../../assets/star_on.png";
import Image from "../Image/Image";
import UserDetailWithMenu from "../UserDetails/UserDetailsWithMenu";

interface PostProps {
  post: IPost;
  withoutUser?: boolean;
  children?: React.ReactNode;
}

const Post: FC<PostProps> = ({ post, children, withoutUser = false }) => {
  const onUpdateClick = (close: () => void) => {};

  const onDeleteClick = (close: () => void) => {};

  return (
    <div key={post._id} className={style.post}>
      {!withoutUser && (
        <UserDetailWithMenu
          userDetailsStyle={style}
          onDelete={onDeleteClick}
          onUpdate={onUpdateClick}
          user={post.sender}
        />
      )}
      <div>
        <span className={style.restaurantName}>{post.restaurant.name}</span>
        {Array.from({ length: post.rating }).map((_, index) => (
          <img key={index} src={starImg} alt="star" className={style.star} />
        ))}
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
