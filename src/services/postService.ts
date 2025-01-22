import apiClient from "./apiClient";
import { User } from "./userService";

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
  sender: User;
}

const getAllPosts = (userId?: string) => {
  const abortController = new AbortController();
  const query = userId ? `?sender=${userId}` : ""
  const request = apiClient.get<Post[]>(`/posts${query}`, {
    signal: abortController.signal,
  });
  return { request, abort: () => abortController.abort() };
};

const getPostById = (postId: string) => {
  const abortController = new AbortController();
  const request = apiClient.get<Post>(`/posts/${postId}`, {
    signal: abortController.signal,
  });
  return { request, abort: () => abortController.abort() };
};

export default { getAllPosts, getPostById };
