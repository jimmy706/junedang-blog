import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn()
  }
}));

// Mock environment variables
vi.mock('$env/dynamic/private', () => ({
  env: {
    GITHUB_PAGE_URL: 'https://test.github.io',
    GITHUB_BLOG_APP: 'test-blog'
  }
}));

describe('posts/[slug] page server load', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load post content successfully', async () => {
    const axios = (await import('axios')).default;
    const { load } = await import('./+page.server');

    const mockHtmlContent = '<article><h1>Test Post</h1><p>Content</p></article>';
    vi.mocked(axios.get).mockResolvedValue({ data: mockHtmlContent });

    const params = { slug: 'test-post' };
    const result = await load({ params } as any);

    expect(axios.get).toHaveBeenCalledWith('https://test.github.io/test-blog/test-post.html');
    expect(result).toEqual({
      slug: 'test-post',
      blogPostUrl: 'https://test.github.io/test-blog/test-post.html',
      htmlContent: mockHtmlContent,
      blogUrlPrefix: 'https://test.github.io',
      success: true
    });
  });

  it('should handle fetch errors gracefully', async () => {
    const axios = (await import('axios')).default;
    const { load } = await import('./+page.server');

    vi.mocked(axios.get).mockRejectedValue(new Error('Network error'));

    const params = { slug: 'missing-post' };
    const result = await load({ params } as any);

    expect(result).toEqual({
      slug: 'missing-post',
      blogPostUrl: 'https://test.github.io/test-blog/missing-post.html',
      htmlContent: null,
      blogUrlPrefix: 'https://test.github.io',
      success: false,
      error: 'Failed to load blog content'
    });
  });

  it('should handle different slugs correctly', async () => {
    const axios = (await import('axios')).default;
    const { load } = await import('./+page.server');

    const mockHtmlContent = '<article>Different content</article>';
    vi.mocked(axios.get).mockResolvedValue({ data: mockHtmlContent });

    const params = { slug: 'another-post' };
    const result = await load({ params } as any);

    expect(axios.get).toHaveBeenCalledWith('https://test.github.io/test-blog/another-post.html');
    expect(result.slug).toBe('another-post');
    expect(result.htmlContent).toBe(mockHtmlContent);
    expect(result.success).toBe(true);
  });
});
