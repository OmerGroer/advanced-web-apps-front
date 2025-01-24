import apiClient from "./apiClient";

const uploadImage = (image: File) => {
  const formData = new FormData();
  formData.append("file", image);
  return apiClient.post<{ url: string }>(`/file?file=${image.name}`, formData, {
    headers: {
      "Content-Type": "image/*",
    },
  });
};

const deleteImage = (image: string) => {
  return apiClient.delete(`/file?file=${image}`);
};

export default { uploadImage, deleteImage };
