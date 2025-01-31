import { FC } from "react";
import PostsList from "../PostsList/PostsList";

const Feed: FC = () => {
  return <PostsList withRecommendation={false} />;
};

export default Feed;
