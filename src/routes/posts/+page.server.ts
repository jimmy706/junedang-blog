import { getPosts } from "../../api/posts.api";

export const load = async () => {
  const posts = await getPosts();
  const sortedPosts = posts.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
  return {
    posts: sortedPosts,
  };
};
