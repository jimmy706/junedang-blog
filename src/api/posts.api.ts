import { env } from "$env/dynamic/private";
import { apiInstance } from "../api";
import type { Post } from "../types/posts";

const apiUrl = `${env.GITHUB_PAGE_URL}/${env.GITHUB_BLOG_APP}/api/pages`;
const postsCacheKey = "posts";

export async function getPosts(): Promise<Post[]> {
  const posts = await apiInstance
    .performGet<Post[]>(apiUrl, postsCacheKey)
    .then((data) => data.filter((post) => post.title));

    return posts;
}
