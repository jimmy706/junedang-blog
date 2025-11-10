import { env } from "$env/dynamic/private";
import axios from "axios";
import { getMarkdownContent, getPosts } from "../../../api/posts.api";

export const load = async ({ params }) => {
  const { slug } = params;
  const blogPostUrl = `${env.GITHUB_PAGE_URL}/${env.GITHUB_BLOG_APP}/${slug}.html`;

  try {
    // Fetch all posts to get metadata for this specific post
    const posts = await getPosts();
    const currentPost = posts.find((post) => post.url?.includes(`${slug}.html`));

    // Fetch the actual HTML content
    const response = await axios.get(blogPostUrl);
    const htmlContent = response.data;

    // Fetch the markdown content using the API function
    const markdownContent = await getMarkdownContent(slug);

    return {
      slug,
      blogPostUrl,
      htmlContent,
      markdownContent,
      blogUrlPrefix: env.GITHUB_PAGE_URL || "",
      success: true,
      post: currentPost || null,
    };
  } catch (error) {
    console.error(`Error fetching blog content for slug "${slug}":`, error);
    return {
      slug,
      blogPostUrl,
      htmlContent: null,
      markdownContent: null,
      blogUrlPrefix: env.GITHUB_PAGE_URL || "",
      success: false,
      error: "Failed to load blog content",
      post: null,
    };
  }
};
