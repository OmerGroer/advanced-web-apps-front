import { CredentialResponse } from "@react-oauth/google";
import apiClient, { Page } from "./apiClient";

export interface User {
  _id: string;
  username: string;
  avatarUrl: string;
}

interface FullUser extends Omit<User, "_id"> {
  email: string;
  password: string;
}

export interface LoginResponse {
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

const register = (user: FullUser) => {
  const abortController = new AbortController();
  const request = apiClient.post<LoginResponse>(`/auth/register`, user, {
    signal: abortController.signal,
  });
  return { request, abort: () => abortController.abort() };
};

const googleRegister = (credential: CredentialResponse) => {
  const abortController = new AbortController();
  const request = apiClient.post<LoginResponse>(`/auth/google`, credential, {
    signal: abortController.signal,
  });
  return { request, abort: () => abortController.abort() };
};

const update = (user: User) => {
  const abortController = new AbortController();
  const request = apiClient.put<User>(`/users/${user._id}`, user, {
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

const logout = (refreshToken: string) => {
  const abortController = new AbortController();
  const request = apiClient.post<LoginResponse>(
    `/auth/logout`,
    { refreshToken },
    {
      signal: abortController.signal,
    }
  );
  return { request, abort: () => abortController.abort() };
};

const searchUsers = (
  times: { min?: string; max?: string },
  value: string
) => {
  const abortController = new AbortController();

  let query = `like=${value}&`;
  query += times.min ? `min=${times.min}&` : "";
  query += times.max ? `max=${times.max}` : "";

  const request = apiClient.get<Page<User>>(`/users?${query}`, {
    signal: abortController.signal,
  });
  return { request, abort: () => abortController.abort() };
};

const getLoggedUserId = () => localStorage.getItem("id");

export default { getUserById, getLoggedUserId, register, login, refresh, logout, update, searchUsers, googleRegister };
