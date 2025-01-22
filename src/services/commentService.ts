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

const updateComment = (commentId: string, content: string) => {
  return apiClient.put<Comment>(`/comments/${commentId}`, {
    content,
  });
};

const deleteComment = (commentId: string) => {
  return apiClient.delete<Comment>(`/comments/${commentId}`);
};

export default { getCommentsByPostId, createComment, deleteComment, updateComment };
