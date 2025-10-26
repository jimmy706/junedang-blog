import { env } from "$env/dynamic/private";
import axios from "axios";
import { sanitizeAndEnhanceHtml, isValidHtml } from "../../../utils/html-sanitizer.js";

export const load = async ({ params, fetch }) => {
  const { slug } = params;
  const blogPostUrl = `${env.GITHUB_PAGE_URL}/${env.GITHUB_BLOG_APP}/${slug}.html`;
  
  try {
    // Fetch the actual HTML content
    const response = await axios.get(blogPostUrl);
    const rawHtmlContent = response.data;
    
    // Validate HTML structure
    if (!isValidHtml(rawHtmlContent)) {
      throw new Error("Invalid HTML content received");
    }
    
    // Sanitize and enhance the HTML content for safe rendering
    const htmlContent = sanitizeAndEnhanceHtml(rawHtmlContent);
    
    return { 
      slug,
      blogPostUrl,
      sanitizedContent: htmlContent,
      blogUrlPrefix: env.GITHUB_PAGE_URL || "",
      success: true
    };
  } catch (error) {
    console.error(`Error fetching blog content for slug "${slug}":`, error);
    return {
      slug,
      blogPostUrl,
      sanitizedContent: null,
      blogUrlPrefix: env.GITHUB_PAGE_URL || "",
      success: false,
      error: "Failed to load blog content"
    };
  }
};
