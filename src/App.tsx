import React from 'react';
import InfinitePostList from './components/InfinitePostList';
import { useInfinitePosts } from './hooks/useInfinitePosts';

function App() {
  const {
    posts,
    loading,
    error,
    loadMorePosts,
    isItemLoaded,
    hasMore
  } = useInfinitePosts();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm py-4 px-6 mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Infinite Post List</h1>
      </header>
      
      <InfinitePostList
        posts={posts}
        loading={loading}
        error={error}
        loadMorePosts={loadMorePosts}
        isItemLoaded={isItemLoaded}
        hasMore={hasMore}
      />
    </div>
  );
}

export default App;