import { FC } from 'react';
import PostsList from '../PostsList/PostsList';

const Feed: FC = () => {
    const posts = [
        {
          "_id": "245234t234234r234r23f4",
          "content": "This is the content of my first post.",
          "restaurant": {
            "_id": "324vt23r4tr234t245tbv45by",
            "name": "My Restaurant"
          },
          "rating": 5,
          "imageUrl": "/public/restaurant.png",
          numberOfComments: 3,
          isLiked: true,
          "sender": {
            "_id": "245234t234234r234r23f4",
            "username": "Omer",
            "avatarUrl": "/public/324t23t4t23t4t23t4t.png"
          }
        },
        {
          "_id": "245234t234234r234r23f4",
          "content": "This is the content of my first post.",
          "restaurant": {
            "_id": "324vt23r4tr234t245tbv45by",
            "name": "My Restaurant"
          },
          "rating": 5,
          "imageUrl": "/public/restaurant.png",
          numberOfComments: 1,
          isLiked: false,
          "sender": {
            "_id": "245234t234234r234r23f4",
            "username": "Omer",
            "avatarUrl": "/public/324t23t4t23t4t23t4t.png"
          }
        }
      ]

    return <PostsList posts={posts} />;
};

export default Feed;