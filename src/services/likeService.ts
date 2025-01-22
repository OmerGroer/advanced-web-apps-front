import apiClient from "./apiClient";

const like = (postId: string) => {
  return apiClient.post(`/likes`, {
    postId,
  });
};

const unlike = (postId: string) => {
  return apiClient.delete(`/likes/${postId}`);
};

export default { like, unlike };
