import { FC, useActionState } from "react";
import style from "./LoginForm.module.css";
import { toast } from "react-toastify";
import Input from "../Input/Input";
import { CircularProgress } from "@mui/material";
import { LoginFunc } from "../LoginContainer/LoginContainer";

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
      await login(data.identifier, data.password);

      return {};
    } else {
      toast.error("Fill up the form");
    }
  } catch (error) {
    const innerError = error as { response: { data: string }; message: string };
    toast.error(innerError.response.data || innerError.message);
  }

  return data;
};

interface LoginProps {
  login: LoginFunc;
  switchToRegister: () => void;
}

const LoginForm: FC<LoginProps> = ({ login, switchToRegister }) => {
  const [data, submitAction, isPending] = useActionState<FormFields, FormData>(
    (...args) => onSubmit(...args, login),
    {}
  );

  return (
    <div className={style.container}>
      {isPending && (
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
          <button
            type="submit"
            className={"actionButton"}
          >
            Submit
          </button>
          <button type="button" className={"actionButton"} onClick={switchToRegister}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
