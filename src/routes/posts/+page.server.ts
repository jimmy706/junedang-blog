import { getPosts } from "../../api/posts.api";

export const load = async ({ url }) => {
  const tagFilter = url.searchParams.get('tag');
  const posts = await getPosts();
  
  // Filter by tag if query param exists
  let filteredPosts = posts;
  if (tagFilter) {
    filteredPosts = posts.filter(post => 
      post.tags && post.tags.some(tag => tag.toLowerCase() === tagFilter.toLowerCase())
    );
  }
  
  const sortedPosts = filteredPosts.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
  
  return {
    posts: sortedPosts,
    currentTag: tagFilter,
  };
};
