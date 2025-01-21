import { useEffect, useState } from "react";
import postService, { Post } from "../services/postService";
import { CanceledError } from "../services/apiClient";

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const { request, abort } = postService.getAllPosts();
    request
      .then((res) => {
        setPosts(res.data);
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

  return { posts, error, isLoading };
};

export default usePosts;
