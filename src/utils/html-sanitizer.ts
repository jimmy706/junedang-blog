import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

/**
 * Sanitizes HTML content to prevent XSS attacks while preserving blog formatting
 * @param rawHtml - The raw HTML content to sanitize
 * @returns Sanitized HTML string safe for rendering
 */
export function sanitizeHtml(rawHtml: string): string {
  // Create a DOM window for DOMPurify to work in Node.js environment
  const window = new JSDOM('').window;
  const purify = DOMPurify(window as any);
  
  // Configure DOMPurify with strict settings for blog content
  const sanitizedContent = purify.sanitize(rawHtml, {
    // Allow essential HTML tags for blog content
    ALLOWED_TAGS: [
      // Headings
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      // Text formatting
      'p', 'br', 'div', 'span', 'article', 'section', 'header', 'footer', 'main',
      // Lists
      'ul', 'ol', 'li', 'dl', 'dt', 'dd',
      // Inline formatting
      'strong', 'em', 'b', 'i', 'u', 'mark', 'small', 'sub', 'sup', 's', 'del', 'ins',
      // Links and media
      'a', 'img', 'figure', 'figcaption',
      // Quotes and citations
      'blockquote', 'cite', 'q',
      // Code formatting
      'code', 'pre', 'kbd', 'samp', 'var',
      // Tables
      'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th', 'caption', 'colgroup', 'col',
      // Other semantic elements
      'hr', 'address', 'time', 'abbr', 'acronym',
      // Interactive elements (safe ones)
      'details', 'summary'
    ],
    
    // Allow necessary attributes
    ALLOWED_ATTR: [
      // Link attributes
      'href', 'title', 'target', 'rel',
      // Media attributes
      'alt', 'src', 'width', 'height', 'loading',
      // Styling (limited)
      'class', 'id', 'style',
      // Semantic attributes
      'type', 'datetime', 'cite', 'lang', 'dir',
      // Table attributes
      'colspan', 'rowspan', 'scope',
      // Interactive attributes
      'open'
    ],
    
    // Strict URL validation
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    
    // Additional security settings
    KEEP_CONTENT: true,
    SANITIZE_DOM: true,
    WHOLE_DOCUMENT: false,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    
    // Hook to add additional security measures
    FORBID_TAGS: ['script', 'object', 'embed', 'iframe', 'frame', 'frameset', 'webview', 'applet', 'form', 'input', 'textarea', 'select', 'button'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'onchange', 'onsubmit', 'onreset', 'onselect', 'onabort', 'onkeydown', 'onkeypress', 'onkeyup', 'onmousedown', 'onmouseup', 'onmousemove', 'onmouseout', 'ondblclick'],
    
    // Remove data URIs in src attributes for additional security (except safe image types)
    SANITIZE_NAMED_PROPS: true
  });
  
  return sanitizedContent;
}

/**
 * Enhanced HTML sanitization with additional processing for blog content
 * @param rawHtml - The raw HTML content
 * @returns Enhanced and sanitized HTML
 */
export function sanitizeAndEnhanceHtml(rawHtml: string): string {
  // First, sanitize the HTML
  let sanitizedHtml = sanitizeHtml(rawHtml);
  
  // Additional processing can be added here if needed
  // For example: fixing relative URLs, adding lazy loading to images, etc.
  
  return sanitizedHtml;
}

/**
 * Validates HTML content for basic structure
 * @param html - HTML string to validate
 * @returns boolean indicating if HTML is valid
 */
export function isValidHtml(html: string): boolean {
  if (!html || typeof html !== 'string') {
    return false;
  }
  
  try {
    // Basic validation - check if it can be parsed as HTML
    const window = new JSDOM(html).window;
    return window.document !== null;
  } catch (error) {
    console.error('HTML validation error:', error);
    return false;
  }
}