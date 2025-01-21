import { useEffect, useState } from "react";
import { CanceledError } from "../services/apiClient";
import commentService, { Comment } from "../services/commentService";

const useCommentsByPostId = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const { request, abort } = commentService.getCommentsByPostId(postId);
    request
      .then((res) => {
        setComments(res.data);
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

  return { comments, setComments, error, isLoading };
};

export default useCommentsByPostId;
