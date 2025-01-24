import { FC, useState } from "react";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import userService from "../../services/userService";

export type LoginFunc = (identifier: string, password: string) => void;

interface LoginContainerProps {
  setLogged: () => void;
}

const LoginContainer: FC<LoginContainerProps> = ({ setLogged }) => {
  const [isRegisterForm, setRegisterForm] = useState<boolean>(false);

  const login: LoginFunc = async (identifier: string, password: string) => {
    const { _id, accessToken, refreshToken } = (
      await userService.login(identifier, password).request
    ).data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("id", _id);

    setLogged();
  };

  const switchToRegister = () => setRegisterForm(true);
  const switchToLogin = () => setRegisterForm(false);

  return isRegisterForm ? (
    <RegisterForm login={login} switchToLogin={switchToLogin} />
  ) : (
    <LoginForm login={login} switchToRegister={switchToRegister} />
  );
};

export default LoginContainer;
