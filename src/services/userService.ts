import apiClient from "./apiClient";

export interface User {
  _id: string;
  username: string;
  avatarUrl: string;
}

const getUserById = (userId: string) => {
  const abortController = new AbortController();
  const request = apiClient.get<User>(`/users/${userId}`, {
    signal: abortController.signal,
  });
  return { request, abort: () => abortController.abort() };
};

const getLoggedUserId = () => "678b80972174b05bcaeabfe6"

export default { getUserById, getLoggedUserId };
