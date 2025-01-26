import { useEffect, useRef, useState } from "react";
import postService, { Post } from "../services/postService";
import { CanceledError } from "../services/apiClient";

const usePosts = (userId?: string, restaurantId?: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const times = useRef<{ min?: string; max?: string }>({});
  const isLoadingRef = useRef<boolean>(false);
  const abotFunctionRef = useRef<() => void>(null);

  const fetchPosts = () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);
    const { request, abort } = postService.getAllPosts(times.current, userId, restaurantId);
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

      abotFunctionRef.current = abort;
  };

  useEffect(() => {
    isLoadingRef.current = false;
    fetchPosts();

    return () => {
      if (abotFunctionRef.current) abotFunctionRef.current();
    };
  }, []);

  return { posts, setPosts, fetchPosts, error, isLoading };
};

export default usePosts;
