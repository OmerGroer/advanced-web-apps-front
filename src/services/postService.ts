import apiClient, { Page } from "./apiClient";
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

const getAllPosts = (times: {min?: string, max?: string}, userId?: string) => {
  const abortController = new AbortController();
  
  let query = userId ? `sender=${userId}&` : ""
  query += times.min ? `min=${times.min}&` : ""
  query += times.max ? `max=${times.max}` : ""

  const request = apiClient.get<Page<Post>>(`/posts?${query}`, {
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
