import { FC, useActionState, useRef } from "react";
import style from "./ProfileForm.module.css";
import { toast } from "react-toastify";
import Input from "../Inputs/Input";
import { CircularProgress } from "@mui/material";
import { createPortal } from "react-dom";
import userService, { User } from "../../services/userService";
import imageService from "../../services/imageService";
import ImageInput, { ImageInputHandle } from "../Inputs/ImageInput";

interface FormFields {
  username?: string;
}

interface FormState {
  data?: FormFields;
  error?: FormFields;
}

const onSubmit = async (
  _: FormState,
  formData: FormData,
  avatar: File | null | undefined,
  user: User,
  onClose: (user?: User) => void
) => {
  const data: FormFields = Object.fromEntries(formData);
  data.username = data.username?.trim();

  const error: FormFields = {};

  if (!data.username) error.username = "Fill it up";

  try {
    if (data.username) {
      if (avatar || data.username !== user.username) {
        let avatarUrl = user.avatarUrl;
        if (avatar) {
          const imageResponse = await imageService.uploadImage(avatar);
          avatarUrl = imageResponse.data.url;
        }

        const response = await userService.update({
          _id: user._id,
          username: data.username,
          avatarUrl,
        }).request;

        if (avatarUrl !== user.avatarUrl) {
          await imageService.deleteImage(user.avatarUrl);
        }

        onClose(response.data);
      } else {
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

interface ProfileFormProps {
  onClose: (user?: User) => void;
  user: User;
}

const ProfileForm: FC<ProfileFormProps> = ({ onClose, user }) => {
  const imageInputRef = useRef<ImageInputHandle>(null);

  const [{ data, error }, submitAction, isPending] = useActionState<
    FormState,
    FormData
  >(
    (...args) =>
      onSubmit(...args, imageInputRef.current?.getImage(), user, onClose),
    {
      data: { username: user.username },
    }
  );

  const onModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return createPortal(
    <div className={style.backdrop} onClick={() => onClose()}>
      <div className={style.container} onClick={onModalClick}>
        {isPending && (
          <div className={style.spinner}>
            <CircularProgress />
          </div>
        )}
        <form action={submitAction} className={style.form}>
          <ImageInput
            ref={imageInputRef}
            style={style}
            defaultImage={`${import.meta.env.VITE_SERVER_URL}${user.avatarUrl}`}
          />
          <Input
            label="User name"
            type="text"
            name="username"
            defaultValue={data?.username}
            error={error?.username}
          />
          <div className={style.buttonsContainer}>
            <button type="submit" className={"actionButton"}>
              Submit
            </button>
            <button
              type="button"
              className={"actionButton"}
              onClick={() => onClose()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("root")!
  );
};

export default ProfileForm;
