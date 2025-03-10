import React from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import PostCard from './PostCard';
import { Loader2 } from 'lucide-react';
import { Post } from '../types/post';

interface InfinitePostListProps {
  posts: Post[];
  isItemLoaded: (index: number) => boolean;
  loadMorePosts: (startIndex: number, stopIndex: number) => Promise<void>;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
}

const InfinitePostList: React.FC<InfinitePostListProps> = ({
  posts,
  isItemLoaded,
  loadMorePosts,
  hasMore,
  loading,
  error
}) => {
  const itemCount = hasMore ? posts.length + 1 : posts.length;
  
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    if (!isItemLoaded(index)) {
      return (
        <div style={style} className="p-4">
          <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
        </div>
      );
    }

    return (
      <div style={style} className="p-4">
        <PostCard post={posts[index]} />
      </div>
    );
  };

  return (
    <div className="h-screen w-full bg-gray-50">
      {error && (
        <div className="p-4 text-red-600 bg-red-50 rounded-md mb-4">
          Error: {error}
        </div>
      )}
      
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMorePosts}
      >
        {({ onItemsRendered, ref }) => (
          <List
            className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            height={window.innerHeight}
            width="100%"
            itemCount={itemCount}
            itemSize={180}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {Row}
          </List>
        )}
      </InfiniteLoader>

      {loading && (
        <div className="fixed bottom-4 right-4 bg-white p-3 rounded-full shadow-lg">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        </div>
      )}
    </div>
  );
};

export default InfinitePostList;