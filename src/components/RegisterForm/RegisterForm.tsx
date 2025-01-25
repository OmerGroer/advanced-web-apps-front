import { FC, useActionState, useRef } from "react";
import style from "./RegisterForm.module.css";
import avatarImage from "../../assets/avatar.png";
import { toast } from "react-toastify";
import Input from "../Inputs/Input";
import userService from "../../services/userService";
import { CircularProgress } from "@mui/material";
import { LoginFunc } from "../LoginContainer/LoginContainer";
import imageService from "../../services/imageService";
import ImageInput, { ImageInputHandle } from "../Inputs/ImageInput";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

interface FormFields {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  avatar?: File | null;
}

interface FormError extends Omit<FormFields, "avatar"> {
  avatar?: string;
}

interface FormState {
  data?: FormFields;
  error?: FormError;
}

const onSubmit = async (
  _: FormState,
  formData: FormData,
  login: LoginFunc,
  avatar: File | null | undefined
) => {
  const data: FormFields = Object.fromEntries(formData);
  data.avatar = avatar;

  const error: FormError = {};

  if (!data.username) error.username = "Fill it up";
  if (!data.email || !emailRegex.test(data.email))
    error.email = "Email is not valid";
  if (!data.password || !passwordRegex.test(data.password))
    error.password =
      "Password must be 6 characters long, contain numbers, an upper case letter and a lower case letter";
  if (!data.confirmPassword) error.confirmPassword = "Fill it up";
  if (!data.avatar) error.avatar = "Upload an image";

  if (data.password !== data.confirmPassword)
    error.confirmPassword = "Passwords are not match";

  try {
    if (
      !Object.keys(error).length &&
      data.avatar &&
      data.username &&
      data.email &&
      data.password
    ) {
      const imageResponse = await imageService.uploadImage(data.avatar);
      await userService.register({
        username: data.username.trim(),
        email: data.email,
        password: data.password,
        avatarUrl: imageResponse.data.url,
      }).request;
      await login(data.username, data.password);

      return {};
    }
  } catch (error) {
    console.error(error);
    const innerError = error as { response: { data: string }; message: string };
    toast.error(innerError.response.data || "Problem has occured");
  }

  return { data, error };
};

interface RegisterProps {
  login: LoginFunc;
  switchToLogin: () => void;
}

const RegisterForm: FC<RegisterProps> = ({ login, switchToLogin }) => {
  const imageInputRef = useRef<ImageInputHandle>(null);
  const [{ data, error }, submitAction, isPending] = useActionState<
    FormState,
    FormData
  >(
    (...args) => onSubmit(...args, login, imageInputRef.current?.getImage()),
    {}
  );

  return (
    <div className={style.container}>
      {isPending && (
        <div className={style.spinner}>
          <CircularProgress />
        </div>
      )}
      <h1>Registration Form</h1>
      <form action={submitAction} className={style.form}>
        <ImageInput
          ref={imageInputRef}
          style={style}
          defaultImage={avatarImage}
        />
        {error?.avatar && <span>{error?.avatar}</span>}

        <Input
          label="User name"
          type="text"
          name="username"
          defaultValue={data?.username}
          error={error?.username}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          defaultValue={data?.email}
          error={error?.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          defaultValue={data?.password}
          error={error?.password}
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          defaultValue={data?.confirmPassword}
          error={error?.confirmPassword}
        />
        <div className={style.buttonsContainer}>
          <button type="submit" className={"actionButton"}>
            Submit
          </button>
          <button
            type="button"
            className={"actionButton"}
            onClick={switchToLogin}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
