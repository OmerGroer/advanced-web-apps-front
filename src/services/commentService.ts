import apiClient from "./apiClient";

export interface Comment {
  _id: string;
  content: string;
  postId: string;
  sender: {
    _id: string;
    username: string;
    avatarUrl: string;
  };
}

const getCommentsByPostId = (postId: string) => {
  const abortController = new AbortController();
  const request = apiClient.get<Comment[]>(`/comments?postId=${postId}`, {
    signal: abortController.signal,
  });
  return { request, abort: () => abortController.abort() };
};

const createComment = (postId: string, content: string) => {
  return apiClient.post<Comment>(`/comments`, {
    postId,
    content,
  });
};

export default { getCommentsByPostId, createComment };
