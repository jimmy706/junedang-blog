import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    create: vi.fn(() => ({
      get: vi.fn()
    }))
  }
}));

// Mock environment variables
vi.mock('$env/dynamic/private', () => ({
  env: {
    GITHUB_PAGE_URL: 'https://test.github.io',
    GITHUB_BLOG_APP: 'test-blog'
  }
}));

// Mock the getMarkdownContent function
vi.mock('../../../api/posts.api', () => ({
  getMarkdownContent: vi.fn()
}));

describe('posts/[slug] page server load', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load post content successfully', async () => {
    const axios = (await import('axios')).default;
    const { getMarkdownContent } = await import('../../../api/posts.api');
    const { load } = await import('./+page.server');

    const mockHtmlContent = '<article><h1>Test Post</h1><p>Content</p></article>';
    const mockMarkdownContent = '# Test Post\n\nContent';
    
    vi.mocked(axios.get).mockResolvedValue({ data: mockHtmlContent });
    vi.mocked(getMarkdownContent).mockResolvedValue(mockMarkdownContent);

    const params = { slug: 'test-post' };
    const result = await load({ params } as any);

    expect(axios.get).toHaveBeenCalledWith('https://test.github.io/test-blog/test-post.html');
    expect(getMarkdownContent).toHaveBeenCalledWith('test-post');
    expect(result).toEqual({
      slug: 'test-post',
      blogPostUrl: 'https://test.github.io/test-blog/test-post.html',
      htmlContent: mockHtmlContent,
      markdownContent: mockMarkdownContent,
      blogUrlPrefix: 'https://test.github.io',
      success: true
    });
  });

  it('should handle fetch errors gracefully', async () => {
    const axios = (await import('axios')).default;
    const { getMarkdownContent } = await import('../../../api/posts.api');
    const { load } = await import('./+page.server');

    vi.mocked(axios.get).mockRejectedValue(new Error('Network error'));
    vi.mocked(getMarkdownContent).mockResolvedValue(null);

    const params = { slug: 'missing-post' };
    const result = await load({ params } as any);

    expect(result).toEqual({
      slug: 'missing-post',
      blogPostUrl: 'https://test.github.io/test-blog/missing-post.html',
      htmlContent: null,
      markdownContent: null,
      blogUrlPrefix: 'https://test.github.io',
      success: false,
      error: 'Failed to load blog content'
    });
  });

  it('should handle different slugs correctly', async () => {
    const axios = (await import('axios')).default;
    const { getMarkdownContent } = await import('../../../api/posts.api');
    const { load } = await import('./+page.server');

    const mockHtmlContent = '<article>Different content</article>';
    const mockMarkdownContent = '# Another Post\n\nDifferent content';
    
    vi.mocked(axios.get).mockResolvedValue({ data: mockHtmlContent });
    vi.mocked(getMarkdownContent).mockResolvedValue(mockMarkdownContent);

    const params = { slug: 'another-post' };
    const result = await load({ params } as any);

    expect(axios.get).toHaveBeenCalledWith('https://test.github.io/test-blog/another-post.html');
    expect(getMarkdownContent).toHaveBeenCalledWith('another-post');
    expect(result.slug).toBe('another-post');
    expect(result.htmlContent).toBe(mockHtmlContent);
    expect(result.markdownContent).toBe(mockMarkdownContent);
    expect(result.success).toBe(true);
  });
});
