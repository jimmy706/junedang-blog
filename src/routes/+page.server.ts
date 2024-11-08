import { getPosts } from "../api/posts.api";

export const load = async () => {
  const posts = await getPosts();

  return {
    posts,
  };
};
