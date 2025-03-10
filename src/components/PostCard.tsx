import React, { memo } from 'react';
import { Post } from '../types/post';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">{post.title}</h2>
      <p className="text-gray-600 line-clamp-3">{post.body}</p>
      <div className="mt-2 text-sm text-gray-500">Post ID: {post.id}</div>
    </div>
  );
};

export default memo(PostCard);