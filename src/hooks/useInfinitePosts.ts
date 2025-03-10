import { useState, useCallback, useRef } from 'react';
import axios from 'axios';

const POSTS_PER_PAGE = 20;
const TOTAL_POSTS = 1000; // JSONPlaceholder has 100 posts total

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const useInfinitePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadedPagesRef = useRef<Set<number>>(new Set());

  const loadMorePosts = useCallback(async (startIndex: number, stopIndex: number) => {
    const page = Math.floor(startIndex / POSTS_PER_PAGE) + 1;

    if (loadedPagesRef.current.has(page)) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${POSTS_PER_PAGE}`
      );

      setPosts(prevPosts => {
        const newPosts = [...prevPosts];
        response.data.forEach((post: Post, index: number) => {
          newPosts[startIndex + index] = post;
        });
        return newPosts;
      });

      loadedPagesRef.current.add(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }, []);

  const isItemLoaded = useCallback((index: number) => {
    return !!posts[index];
  }, [posts]);

  return {
    posts,
    loading,
    error,
    loadMorePosts,
    isItemLoaded,
    hasMore: posts.length < TOTAL_POSTS
  };
};