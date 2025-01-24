import apiClient from "./apiClient";

export interface User {
  _id: string;
  username: string;
  avatarUrl: string;
}

interface FullUser extends Omit<User, "_id"> {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  _id: string;
}

const getUserById = (userId: string) => {
  const abortController = new AbortController();
  const request = apiClient.get<User>(`/users/${userId}`, {
    signal: abortController.signal,
  });
  return { request, abort: () => abortController.abort() };
};

const uploadImg = (image: File) => {
  const formData = new FormData();
  formData.append("file", image);
  return apiClient.post<{ url: string }>(`/file?file=${image.name}`, formData, {
    headers: {
      "Content-Type": "image/*",
    },
  });
};

const register = (user: FullUser) => {
  const abortController = new AbortController();
  const request = apiClient.post<User>(`/auth/register`, user, {
    signal: abortController.signal,
  });
  return { request, abort: () => abortController.abort() };
};

const login = (identifier: string, password: string) => {
  const abortController = new AbortController();
  const request = apiClient.post<LoginResponse>(
    `/auth/login`,
    { username: identifier, email: identifier, password },
    {
      signal: abortController.signal,
    }
  );
  return { request, abort: () => abortController.abort() };
};

const refresh = (refreshToken: string) => {
  const abortController = new AbortController();
  const request = apiClient.post<LoginResponse>(
    `/auth/refresh`,
    { refreshToken },
    {
      signal: abortController.signal,
    }
  );
  return { request, abort: () => abortController.abort() };
};

const getLoggedUserId = () => "678b80972174b05bcaeabfe6";

export default { getUserById, getLoggedUserId, register, uploadImg, login, refresh };
