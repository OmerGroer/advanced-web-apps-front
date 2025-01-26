import { FC } from "react";
import PostsList from "../PostsList/PostsList";

const Feed: FC = () => {
  return <PostsList withRecommendation={true} />;
};

export default Feed;
