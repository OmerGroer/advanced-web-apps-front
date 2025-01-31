import { FC, useActionState } from "react";
import style from "./LoginForm.module.css";
import { toast } from "react-toastify";
import Input from "../Inputs/Input";
import { CircularProgress } from "@mui/material";
import { LoginFunc } from "../LoginContainer/LoginContainer";
import userService from "../../services/userService";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

interface FormFields {
  identifier?: string;
  password?: string;
}

const onSubmit = async (
  _: FormFields,
  formData: FormData,
  login: LoginFunc
) => {
  const data: FormFields = Object.fromEntries(formData);

  try {
    if (data.identifier && data.password) {
      const tokens = (
        await userService.login(data.identifier, data.password).request
      ).data;
      login(tokens);

      return {};
    } else {
      toast.error("Fill up the form");
    }
  } catch (error) {
    console.error(error);
    const innerError = error as { response: { data: string }; message: string };
    toast.error(innerError.response.data || "Problem has occured");
  }

  return data;
};

interface LoginProps {
  login: LoginFunc;
  switchToRegister: () => void;
  isLoading: boolean;
}

const LoginForm: FC<LoginProps> = ({ login, switchToRegister, isLoading }) => {
  const [data, submitAction, isPending] = useActionState<FormFields, FormData>(
    (...args) => onSubmit(...args, login),
    {}
  );

  const onGoogleSuccess = async (credentialsResponse: CredentialResponse) => {
    try {
      const tokens = (
        await userService.googleRegister(credentialsResponse).request
      ).data;
      login(tokens);
    } catch (error) {
      console.error(error);
      const innerError = error as {
        response: { data: string };
        message: string;
      };
      toast.error(innerError.response.data || "Problem has occured");
    }
  };

  const onGoogleError = () => {
    toast.error("Error was occured will google signing in");
  };

  return (
    <div className={style.container}>
      {(isPending || isLoading) && (
        <div className={style.spinner}>
          <CircularProgress />
        </div>
      )}
      <h1>Table Talk</h1>
      <form action={submitAction} className={style.form}>
        <Input
          label="Username or Email"
          type="text"
          name="identifier"
          defaultValue={data?.identifier}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          defaultValue={data?.password}
        />
        <div className={style.buttonsContainer}>
          <button type="submit" className={"actionButton"}>
            Submit
          </button>
          <button
            type="button"
            className={"actionButton"}
            onClick={switchToRegister}
          >
            Register
          </button>
        </div>
        <GoogleLogin onSuccess={onGoogleSuccess} onError={onGoogleError} />
      </form>
    </div>
  );
};

export default LoginForm;
