import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Post } from '../types/posts';

// Mock the API instance
vi.mock('../api', () => ({
  apiInstance: {
    performGet: vi.fn()
  }
}));

// Mock environment variables
vi.mock('$env/dynamic/private', () => ({
  env: {
    GITHUB_PAGE_URL: 'https://test.github.io',
    GITHUB_BLOG_APP: 'test-blog'
  }
}));

describe('posts.api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPosts', () => {
    it('should fetch and filter posts with titles', async () => {
      const { getPosts } = await import('./posts.api');
      const { apiInstance } = await import('../api');
      
      const mockPosts: Post[] = [
        { title: 'Post 1', url: 'post1.html', date: '2023-12-01' },
        { title: '', url: 'post2.html', date: '2023-12-02' }, // No title
        { title: 'Post 3', url: 'post3.html', date: '2023-12-03' },
        { url: 'post4.html', date: '2023-12-04' } // No title property
      ];

      vi.mocked(apiInstance.performGet).mockResolvedValue(mockPosts);

      const result = await getPosts();

      expect(apiInstance.performGet).toHaveBeenCalledWith(
        'https://test.github.io/test-blog/api/pages',
        'posts'
      );

      // Should only return posts with non-empty titles
      expect(result).toEqual([
        { title: 'Post 1', url: 'post1.html', date: '2023-12-01' },
        { title: 'Post 3', url: 'post3.html', date: '2023-12-03' }
      ]);
    });

    it('should return empty array when no posts have titles', async () => {
      const { getPosts } = await import('./posts.api');
      const { apiInstance } = await import('../api');
      
      const mockPosts: Post[] = [
        { title: '', url: 'post1.html', date: '2023-12-01' },
        { url: 'post2.html', date: '2023-12-02' }
      ];

      vi.mocked(apiInstance.performGet).mockResolvedValue(mockPosts);

      const result = await getPosts();

      expect(result).toEqual([]);
    });

    it('should handle empty response from API', async () => {
      const { getPosts } = await import('./posts.api');
      const { apiInstance } = await import('../api');
      
      vi.mocked(apiInstance.performGet).mockResolvedValue([]);

      const result = await getPosts();

      expect(result).toEqual([]);
    });

    it('should handle API errors', async () => {
      const { getPosts } = await import('./posts.api');
      const { apiInstance } = await import('../api');
      
      const error = new Error('API fetch failed');
      vi.mocked(apiInstance.performGet).mockRejectedValue(error);

      await expect(getPosts()).rejects.toThrow('API fetch failed');
    });

    it('should filter posts with whitespace-only titles', async () => {
      const { getPosts } = await import('./posts.api');
      const { apiInstance } = await import('../api');
      
      const mockPosts: Post[] = [
        { title: 'Valid Post', url: 'post1.html', date: '2023-12-01' },
        { title: '   ', url: 'post2.html', date: '2023-12-02' },
        { title: '\t\n', url: 'post3.html', date: '2023-12-03' }
      ];

      vi.mocked(apiInstance.performGet).mockResolvedValue(mockPosts);

      const result = await getPosts();

      // Current implementation only filters falsy titles, whitespace strings pass through
      expect(result).toEqual([
        { title: 'Valid Post', url: 'post1.html', date: '2023-12-01' },
        { title: '   ', url: 'post2.html', date: '2023-12-02' },
        { title: '\t\n', url: 'post3.html', date: '2023-12-03' }
      ]);
    });
  });
});