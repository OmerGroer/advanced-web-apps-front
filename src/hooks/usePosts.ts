import { useEffect, useRef, useState } from "react";
import postService, { Post } from "../services/postService";
import { CanceledError } from "../services/apiClient";

const usePosts = (userId?: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const times = useRef<{ min?: string; max?: string }>({});
  const isLoadingRef = useRef<boolean>(false);

  const fetchPosts = () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);
    const { request, abort } = postService.getAllPosts(times.current, userId);
    request
      .then((res) => {
        const { data, ...rest } = res.data;
        setPosts((prevPosts) => [...prevPosts, ...data]);
        times.current = rest;
        setIsLoading(false);
        isLoadingRef.current = false;
      })
      .catch((error) => {
        if (!(error instanceof CanceledError)) {
          setError(error.message);
          setIsLoading(false);
        }
        isLoadingRef.current = false;
      });

    return abort;
  };

  useEffect(() => {
    isLoadingRef.current = false;
    return fetchPosts();
  }, []);

  return { posts, setPosts, fetchPosts, error, isLoading };
};

export default usePosts;
