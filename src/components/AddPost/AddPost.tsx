import { ChangeEvent, FC, useActionState, useRef, useState } from "react";
import style from "./AddPost.module.css";
import { Restaurant } from "../../hooks/useRestaurants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { CircularProgress, Rating } from "@mui/material";
import { createPortal } from "react-dom";
import RestaurantImage from "../../assets/restaurant.png";
import classNames from "classnames";
import imageService from "../../services/imageService";
import postService from "../../services/postService";
import { toast } from "react-toastify";

interface FormFields {
  content?: string;
  image?: File | null;
  rating?: number
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
  image: File | null,
  restaurant: Restaurant,
  onClose: () => void
) => {
  const data: FormFields = Object.fromEntries(formData);
    data.image = image;
    data.content = data.content?.trim();
  
    const error: FormError = {};
  
    if (!data.content) error.content = "Fill it up";
    if (!data.image) error.image = "Upload an image";
    
    try {
      if (
        !Object.keys(error).length &&
        data.image &&
        data.content &&
        data.rating
      ) {
        const imageResponse = await imageService.uploadImage(data.image);
        await postService.createPost({
          content: data.content,
          imageUrl: imageResponse.data.url,
          rating: data.rating,
          restaurant: restaurant._id
        }, restaurant).request;

        toast.success("Post was uploaded successfully")
        onClose()
  
        return {};
      }
    } catch (error) {
      const innerError = error as { response: { data: string }; message: string };
      toast.error(innerError.response.data || innerError.message);
    }
  
    return { data, error };
};

interface AddPostProps {
  restaurant: Restaurant;
  onClose: () => void;
}

const AddPost: FC<AddPostProps> = ({ restaurant, onClose }) => {
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [{ data, error }, submitAction, isPending] = useActionState<
    FormState,
    FormData
  >((...args) => onSubmit(...args, image, restaurant, onClose), {});

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files && e.target.files[0]);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return createPortal(
    <div className={style.backdrop}>
      <div className={style.container}>
        <span
          style={{ color: "black", fontSize: "1em" }}
          className={style.x}
          onClick={onClose}
        >
          ×
        </span>
        {isPending && (
          <div className={style.spinner}>
            <CircularProgress />
          </div>
        )}
        <h1>{restaurant.name}</h1>
        <form action={submitAction} className={style.form}>
          <img
            src={image ? URL.createObjectURL(image) : RestaurantImage}
            className={style.image}
            alt="preview"
          />
          <FontAwesomeIcon
            icon={faImage}
            onClick={handleImageClick}
            className={style.imageIcon}
          />
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
            ref={fileInputRef}
            style={{ display: "none" }}
            name="image"
          />
          {error?.image && <span className={style.error}>{error?.image}</span>}

          <Rating name="rating" defaultValue={5} precision={1} size="large" className={style.rating} />

          <textarea
            name="content"
            placeholder="What are you saying?"
            defaultValue={data?.content}
          />
          {error?.content && <span className={style.error}>{error?.content}</span>}

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
