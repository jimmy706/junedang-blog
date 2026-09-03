import { env } from "$env/dynamic/private";
import { getMarkdownContent, getPosts } from "../../../api/posts.api";

export const load = async ({ params }) => {
  const { slug } = params;
  const blogPostUrl = `${env.GITHUB_PAGE_URL}/${env.GITHUB_BLOG_APP}/${slug}.html`;

  try {
    // Fetch all posts to get metadata for this specific post
    const posts = await getPosts();
    const currentPost = posts.find((post) => post.url?.includes(`${slug}.html`));

    // Sort posts by date descending (newest first, same as /posts listing)
    const sortedPosts = [...posts].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });

    // Find current post index and compute prev/next
    const currentIndex = sortedPosts.findIndex((post) => post.url?.includes(`${slug}.html`));

    // prevPost is older (index + 1), nextPost is newer (index - 1)
    const prevPost = currentIndex >= 0 && currentIndex < sortedPosts.length - 1
      ? {
          title: sortedPosts[currentIndex + 1].title || "",
          url: sortedPosts[currentIndex + 1].url || "",
          slug: sortedPosts[currentIndex + 1].url?.match(/([^/]+)\.html$/)?.[1] || "",
        }
      : null;

    const nextPost = currentIndex > 0
      ? {
          title: sortedPosts[currentIndex - 1].title || "",
          url: sortedPosts[currentIndex - 1].url || "",
          slug: sortedPosts[currentIndex - 1].url?.match(/([^/]+)\.html$/)?.[1] || "",
        }
      : null;

    // Fetch the actual HTML content
    const response = await fetch(blogPostUrl);
    if (!response.ok) {
      throw new Error(`Blog post request failed with status ${response.status}`);
    }
    const htmlContent = await response.text();

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
      prevPost,
      nextPost,
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
      prevPost: null,
      nextPost: null,
    };
  }
};
