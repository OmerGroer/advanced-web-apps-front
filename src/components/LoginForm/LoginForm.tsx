import { FC, useActionState } from "react";
import style from "./LoginForm.module.css";
import { toast } from "react-toastify";
import classNames from "classnames";
import Input from "../Input/Input";
import userService from "../../services/userService";
import { CircularProgress } from "@mui/material";

interface FormFields {
  identifier?: string;
  password?: string;
}

const onSubmit = async (_: FormFields, formData: FormData) => {
  const data: FormFields = Object.fromEntries(formData);

  try {
    if (data.identifier && data.password) {
      const response = await userService.login(
        data.identifier,
        data.password
      ).request;

      return {};
    } else {
      toast.error("Fill up the form");  
    }
  } catch (error) {
    const innerError = error as {response: {data: string}, message: string}
    toast.error(innerError.response.data || innerError.message);
  }
  
  return data;
};

const LoginForm: FC = () => {
  const [data, submitAction, isPending] = useActionState<FormFields, FormData>(
    onSubmit,
    {}
  );

  return (
    <div className={style.container}>
      {isPending && (
        <div className={style.spinner}>
          <CircularProgress />
        </div>
      )}
      <h1>Welcome!</h1>
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
        <button
          type="submit"
          className={classNames("actionButton", style.submit)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
