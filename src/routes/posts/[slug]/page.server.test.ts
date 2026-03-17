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

// Mock the getMarkdownContent and getPosts functions
vi.mock('../../../api/posts.api', () => ({
  getMarkdownContent: vi.fn(),
  getPosts: vi.fn()
}));

describe('posts/[slug] page server load', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load post content successfully', async () => {
    const axios = (await import('axios')).default;
    const { getMarkdownContent, getPosts } = await import('../../../api/posts.api');
    const { load } = await import('./+page.server');

    const mockHtmlContent = '<article><h1>Test Post</h1><p>Content</p></article>';
    const mockMarkdownContent = '# Test Post\n\nContent';
    const mockPosts = [
      {
        title: 'Test Post',
        url: 'https://test.github.io/test-blog/test-post.html',
        description: 'A test post',
        image: 'https://example.com/test-image.jpg',
        date: '2024-01-01',
        tags: ['test']
      }
    ];
    
    vi.mocked(axios.get).mockResolvedValue({ data: mockHtmlContent });
    vi.mocked(getMarkdownContent).mockResolvedValue(mockMarkdownContent);
    vi.mocked(getPosts).mockResolvedValue(mockPosts);

    const params = { slug: 'test-post' };
    const result = await load({ params } as any);

    expect(axios.get).toHaveBeenCalledWith('https://test.github.io/test-blog/test-post.html');
    expect(getMarkdownContent).toHaveBeenCalledWith('test-post');
    expect(getPosts).toHaveBeenCalled();
    expect(result).toEqual({
      slug: 'test-post',
      blogPostUrl: 'https://test.github.io/test-blog/test-post.html',
      htmlContent: mockHtmlContent,
      markdownContent: mockMarkdownContent,
      blogUrlPrefix: 'https://test.github.io',
      success: true,
      post: mockPosts[0]
    });
  });

  it('should handle fetch errors gracefully', async () => {
    const axios = (await import('axios')).default;
    const { getMarkdownContent, getPosts } = await import('../../../api/posts.api');
    const { load } = await import('./+page.server');

    vi.mocked(axios.get).mockRejectedValue(new Error('Network error'));
    vi.mocked(getMarkdownContent).mockResolvedValue(null);
    vi.mocked(getPosts).mockResolvedValue([]);

    const params = { slug: 'missing-post' };
    const result = await load({ params } as any);

    expect(result).toEqual({
      slug: 'missing-post',
      blogPostUrl: 'https://test.github.io/test-blog/missing-post.html',
      htmlContent: null,
      markdownContent: null,
      blogUrlPrefix: 'https://test.github.io',
      success: false,
      error: 'Failed to load blog content',
      post: null
    });
  });

  it('should handle different slugs correctly', async () => {
    const axios = (await import('axios')).default;
    const { getMarkdownContent, getPosts } = await import('../../../api/posts.api');
    const { load } = await import('./+page.server');

    const mockHtmlContent = '<article>Different content</article>';
    const mockMarkdownContent = '# Another Post\n\nDifferent content';
    const mockPosts = [
      {
        title: 'Another Post',
        url: 'https://test.github.io/test-blog/another-post.html',
        description: 'Another test post'
      }
    ];
    
    vi.mocked(axios.get).mockResolvedValue({ data: mockHtmlContent });
    vi.mocked(getMarkdownContent).mockResolvedValue(mockMarkdownContent);
    vi.mocked(getPosts).mockResolvedValue(mockPosts);

    const params = { slug: 'another-post' };
    const result = await load({ params } as any);

    expect(axios.get).toHaveBeenCalledWith('https://test.github.io/test-blog/another-post.html');
    expect(getMarkdownContent).toHaveBeenCalledWith('another-post');
    expect(getPosts).toHaveBeenCalled();
    expect(result.slug).toBe('another-post');
    expect(result.htmlContent).toBe(mockHtmlContent);
    expect(result.markdownContent).toBe(mockMarkdownContent);
    expect(result.success).toBe(true);
    expect(result.post).toEqual(mockPosts[0]);
  });
});
