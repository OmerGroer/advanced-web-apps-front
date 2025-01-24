import { FC, useEffect, useState } from "react";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import userService from "../../services/userService";
import { CanceledError } from "axios";

export type LoginFunc = (identifier: string, password: string) => void;

interface LoginContainerProps {
  setLogged: () => void;
}

const LoginContainer: FC<LoginContainerProps> = ({ setLogged }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const { request, abort } = userService.refresh(refreshToken);

      request
        .then((res) => {
          const { accessToken, refreshToken } = res.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          setLogged();
          setIsLoading(false);
        })
        .catch((error) => {
          if (!(error instanceof CanceledError)) {
            setIsLoading(false);
          }
        });

      return abort;
    }
  }, []);

  const switchToRegister = () => setRegisterForm(true);
  const switchToLogin = () => setRegisterForm(false);

  return isRegisterForm ? (
    <RegisterForm login={login} switchToLogin={switchToLogin} />
  ) : (
    <LoginForm
      login={login}
      switchToRegister={switchToRegister}
      isLoading={isLoading}
    />
  );
};

export default LoginContainer;
