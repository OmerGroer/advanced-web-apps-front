import apiClient, { Page } from "./apiClient";
import { Restaurant } from "./restaurantService";
import { User } from "./userService";

export interface Post extends Omit<NewPost, "restaurant"> {
  _id: string;
  restaurant: {
    _id: string;
    name: string;
  };
  isLiked: boolean;
  numberOfComments: number;
  sender: User;
}

interface NewPost {
  content: string;
  restaurant: string;
  rating: number;
  imageUrl: string;
}

const getAllPosts = (
  times: { min?: string; max?: string },
  userId?: string
) => {
  const abortController = new AbortController();

  let query = userId ? `sender=${userId}&` : "";
  query += times.min ? `min=${times.min}&` : "";
  query += times.max ? `max=${times.max}` : "";

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

const createPost = (post: NewPost, restaurant: Omit<Restaurant, "_id">) => {
  const abortController = new AbortController();
  const request = apiClient.post<Post>(`/posts`, {
    post,
    restaurant,
  });
  return { request, abort: () => abortController.abort() };
};

const updatePost = (postId: string, post: Omit<NewPost, "restaurant">) => {
  const abortController = new AbortController();
  const request = apiClient.put<Post>(`/posts/${postId}`, post);
  return { request, abort: () => abortController.abort() };
};

const deletePost = (postId: string) => {
  const abortController = new AbortController();
  const request = apiClient.delete<Post>(`/posts/${postId}`);
  return { request, abort: () => abortController.abort() };
};

export default { getAllPosts, getPostById, createPost, updatePost, deletePost };
