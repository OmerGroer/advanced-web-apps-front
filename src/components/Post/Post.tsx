import { FC, useState, useTransition } from "react";
import style from "./Post.module.css";
import postService, { Post as IPost } from "../../services/postService";
import Image from "../Image/Image";
import UserDetailWithMenu from "../UserDetails/UserDetailsWithMenu";
import AddPost from "../AddPost/AddPost";
import { toast } from "react-toastify";
import userService from "../../services/userService";
import MenuContainer from "../MenuContainer/MenuContainer";
import { Rating } from "@mui/material";
import classNames from "classnames";

interface PostProps {
  post: IPost;
  withoutUser?: boolean;
  children?: React.ReactNode;
  onEdit: (post: IPost) => void;
  onDelete: (postId: string) => void;
}

const Post: FC<PostProps> = ({
  post,
  children,
  withoutUser = false,
  onEdit,
  onDelete,
}) => {
  const [isPending, startTransition] = useTransition();
  const [isEdit, setEdit] = useState<boolean>(false);

  const onUpdateClick = (close: () => void) => {
    setEdit(true);
    close();
  };

  const onDeleteClick = (close: () => void) => {
    startTransition(async () => {
      try {
        await postService.deletePost(post._id).request;
        toast.success("Post was deleted successfully");
        onDelete(post._id);
      } catch (error) {
        console.error(error);
        toast.error("Problem has occured");
      } finally {
        close();
      }
    });
  };

  const onEditClose = (post?: IPost) => {
    setEdit(false);
    if (post) onEdit(post);
  };

  return (
    <div key={post._id} className={classNames(style.post, {[style.deleted]: isPending})}>
      {!withoutUser && (
        <UserDetailWithMenu
          disabled={isPending}
          userDetailsStyle={style}
          onDelete={onDeleteClick}
          onUpdate={onUpdateClick}
          user={post.sender}
        />
      )}
      <div className={style.restaurantContainer}>
        <div>
          <span className={style.restaurantName}>{post.restaurant.name}</span>
          <Rating
            name="rating"
            defaultValue={post.rating}
            precision={1}
            size="large"
            readOnly
          />
        </div>

        {withoutUser && post.sender._id === userService.getLoggedUserId() && (
          <MenuContainer
            disabled={isPending}
            onDelete={onDeleteClick}
            onUpdate={onUpdateClick}
          />
        )}
      </div>
      <p className={style.content}>{post.content}</p>
      <Image
        src={`${import.meta.env.VITE_SERVER_URL}${post.imageUrl}`}
        alt={post.restaurant.name}
        className={style.image}
      />
      {children}

      {isEdit && <AddPost onClose={onEditClose} post={post} />}
    </div>
  );
};

export default Post;
