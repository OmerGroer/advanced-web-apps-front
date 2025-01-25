import { FC, useActionState, useRef } from "react";
import style from "./AddPost.module.css";
import { Restaurant } from "../../hooks/useRestaurants";
import { CircularProgress, Rating } from "@mui/material";
import { createPortal } from "react-dom";
import RestaurantImage from "../../assets/restaurant.png";
import classNames from "classnames";
import imageService from "../../services/imageService";
import postService, { Post } from "../../services/postService";
import { toast } from "react-toastify";
import ImageInput, { ImageInputHandle } from "../Inputs/ImageInput";

interface FormFields {
  content?: string;
  image?: File | null;
  rating?: number;
}

interface FormError extends Omit<FormFields, "image"> {
  image?: string;
}

interface FormState {
  data?: FormFields;
  error?: FormError;
}

const onSubmit = async (
  _: FormState,
  formData: FormData,
  onClose: (post?: Post) => void,
  image: File | null | undefined,
  restaurant?: Restaurant,
  post?: Post
) => {
  const data: FormFields = Object.fromEntries(formData);
  data.content = data.content?.trim();

  const error: FormError = {};

  if (!data.content) error.content = "Fill it up";
  if (!data.image && !post) error.image = "Upload an image";

  try {
    if (!Object.keys(error).length && data.content && data.rating) {
      let imageUrl = post?.imageUrl || "";
      if (image) {
        const imageResponse = await imageService.uploadImage(image);
        imageUrl = imageResponse.data.url;
      }

      if (post) {
        if (
          imageUrl !== post.imageUrl ||
          data.content !== post.content ||
          data.rating !== post.rating
        ) {
          const response = await postService.updatePost(post._id, {
            content: data.content,
            imageUrl: imageUrl,
            rating: data.rating,
          }).request;

          if (imageUrl !== post.imageUrl) {
            await imageService.deleteImage(post.imageUrl);
          }

          onClose(response.data);
        } else {
          onClose();
        }

        toast.success("Post was updated successfully");
      } else if (restaurant) {
        await postService.createPost(
          {
            content: data.content,
            imageUrl: imageUrl,
            rating: data.rating,
            restaurant: restaurant._id,
          },
          restaurant
        ).request;

        toast.success("Post was uploaded successfully");
        onClose();
      }

      return {};
    }
  } catch (error) {
    console.error(error);
    const innerError = error as { response: { data: string }; message: string };
    toast.error(innerError.response.data || "Problem has occured");
  }

  return { data, error };
};

interface AddPostProps {
  restaurant?: Restaurant;
  post?: Post;
  onClose: (post?: Post) => void;
}

const AddPost: FC<AddPostProps> = ({ restaurant, onClose, post }) => {
  const imageInputRef = useRef<ImageInputHandle>(null);
  const [{ data, error }, submitAction, isPending] = useActionState<
    FormState,
    FormData
  >((...args) => onSubmit(...args, onClose, imageInputRef.current?.getImage(), restaurant, post), {
    data: {
      content: post?.content || "",
      rating: post?.rating || 5,
    },
  });

  return createPortal(
    <div className={style.backdrop}>
      <div className={style.container}>
        <span
          style={{ color: "black", fontSize: "1em" }}
          className={style.x}
          onClick={() => onClose()}
        >
          ×
        </span>
        {isPending && (
          <div className={style.spinner}>
            <CircularProgress />
          </div>
        )}
        <h1>{restaurant?.name || post?.restaurant.name}</h1>
        <form action={submitAction} className={style.form}>
          <ImageInput
            ref={imageInputRef}
            style={style}
            defaultImage={
              post
                ? `${import.meta.env.VITE_SERVER_URL}${post.imageUrl}`
                : RestaurantImage
            }
          />
          {error?.image && <span className={style.error}>{error?.image}</span>}

          <Rating
            name="rating"
            defaultValue={data?.rating}
            precision={1}
            size="large"
            className={style.rating}
          />

          <textarea
            name="content"
            placeholder="What are you saying?"
            defaultValue={data?.content}
          />
          {error?.content && (
            <span className={style.error}>{error?.content}</span>
          )}

          <button
            type="submit"
            className={classNames("actionButton", style.submit)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>,
    document.getElementById("root")!
  );
};

export default AddPost;
