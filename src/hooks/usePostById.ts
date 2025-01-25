import { useEffect, useState } from "react";
import postService, { Post } from "../services/postService";
import { CanceledError } from "../services/apiClient";

const usePostById = (postId: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const { request, abort } = postService.getPostById(postId);
    request
      .then((res) => {
        setPost(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (!(error instanceof CanceledError)) {
          setError(error.message);
          setIsLoading(false);
        }
      });

    return abort;
  }, []);

  return { post, setPost, error, isLoading };
};

export default usePostById;
