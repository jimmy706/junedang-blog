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

export async function getMarkdownContent(slug: string): Promise<string | null> {
  try {
    const markdownResponse = await fetch(
      `https://api.github.com/repos/jimmy706/junedang-blog-pages/contents/jekyll/${slug}.md`,
      {
        headers: {
          "Accept": "application/vnd.github.raw+json",
          "X-GitHub-Api-Version": "2022-11-28"
        }
      }
    );
    if (!markdownResponse.ok) {
      throw new Error(`GitHub request failed with status ${markdownResponse.status}`);
    }
    return await markdownResponse.text();
  } catch (markdownError) {
    console.warn(`Failed to fetch markdown for slug "${slug}":`, markdownError);
    return null;
  }
}
