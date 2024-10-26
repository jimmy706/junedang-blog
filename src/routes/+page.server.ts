import { API_PATH } from "$env/static/private";
import { apiInstance } from "../api";
import type { Post } from "../types/posts";
const apiUrl = `${API_PATH}/pages`;
const postsCacheKey = "posts";

export const load = async () => {
  const posts = await apiInstance
    .performGet<Post[]>(apiUrl, postsCacheKey)
    .then((data) => data.filter((post) => post.title));

  return {
    posts,
  };
};
