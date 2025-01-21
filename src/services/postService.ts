import apiClient, { CanceledError } from "./apiClient";

export { CanceledError };

export interface Post {
  _id: string;
  content: string;
  restaurant: {
    _id: string;
    name: string;
  };
  rating: number;
  imageUrl: string;
  isLiked: boolean;
  numberOfComments: number;
  sender: {
    _id: string;
    username: string;
    avatarUrl: string;
  };
}

const getAllPosts = () => {
  const abortController = new AbortController();
  const request = apiClient.get<Post[]>("/posts", {
    signal: abortController.signal,
  });
  return { request, abort: () => abortController.abort() };
};

export default { getAllPosts };
