import { env } from "$env/dynamic/private";
import axios from "axios";

export const load = async ({ params, fetch }) => {
  const { slug } = params;
  const blogPostUrl = `${env.GITHUB_PAGE_URL}/${env.GITHUB_BLOG_APP}/${slug}.html`;

  try {
    // Fetch the actual HTML content
    const response = await axios.get(blogPostUrl);
    const htmlContent = response.data;
    return {
      slug,
      blogPostUrl,
      htmlContent,
      blogUrlPrefix: env.GITHUB_PAGE_URL || "",
      success: true,
    };
  } catch (error) {
    console.error(`Error fetching blog content for slug "${slug}":`, error);
    return {
      slug,
      blogPostUrl,
      htmlContent: null,
      blogUrlPrefix: env.GITHUB_PAGE_URL || "",
      success: false,
      error: "Failed to load blog content",
    };
  }
};
