import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Post } from '../../types/posts';

// Mock the getPosts API function
vi.mock('../../api/posts.api', () => ({
  getPosts: vi.fn()
}));

describe('posts page server load', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load and sort posts by date descending', async () => {
    const { getPosts } = await import('../../api/posts.api');
    const { load } = await import('./+page.server');

    const mockPosts: Post[] = [
      { title: 'Post 1', url: 'post1.html', date: '2023-12-01' },
      { title: 'Post 3', url: 'post3.html', date: '2023-12-03' },
      { title: 'Post 2', url: 'post2.html', date: '2023-12-02' }
    ];

    vi.mocked(getPosts).mockResolvedValue(mockPosts);

    const mockUrl = {
      searchParams: new URLSearchParams()
    };
    const result = await load({ url: mockUrl } as any);

    expect(getPosts).toHaveBeenCalledOnce();
    expect(result.posts).toEqual([
      { title: 'Post 3', url: 'post3.html', date: '2023-12-03' },
      { title: 'Post 2', url: 'post2.html', date: '2023-12-02' },
      { title: 'Post 1', url: 'post1.html', date: '2023-12-01' }
    ]);
  });

  it('should handle posts with missing dates', async () => {
    const { getPosts } = await import('../../api/posts.api');
    const { load } = await import('./+page.server');

    const mockPosts: Post[] = [
      { title: 'Post with date', url: 'post1.html', date: '2023-12-01' },
      { title: 'Post without date', url: 'post2.html' },
      { title: 'Another post with date', url: 'post3.html', date: '2023-12-03' }
    ];

    vi.mocked(getPosts).mockResolvedValue(mockPosts);

    const mockUrl = {
      searchParams: new URLSearchParams()
    };
    const result = await load({ url: mockUrl } as any);

    // Posts without dates should be sorted to the end (treated as 0)
    expect(result.posts).toEqual([
      { title: 'Another post with date', url: 'post3.html', date: '2023-12-03' },
      { title: 'Post with date', url: 'post1.html', date: '2023-12-01' },
      { title: 'Post without date', url: 'post2.html' }
    ]);
  });

  it('should handle empty posts array', async () => {
    const { getPosts } = await import('../../api/posts.api');
    const { load } = await import('./+page.server');

    vi.mocked(getPosts).mockResolvedValue([]);

    const mockUrl = {
      searchParams: new URLSearchParams()
    };
    const result = await load({ url: mockUrl } as any);

    expect(result.posts).toEqual([]);
  });

  it('should handle API errors', async () => {
    const { getPosts } = await import('../../api/posts.api');
    const { load } = await import('./+page.server');

    const error = new Error('API Error');
    vi.mocked(getPosts).mockRejectedValue(error);

    const mockUrl = {
      searchParams: new URLSearchParams()
    };
    await expect(load({ url: mockUrl } as any)).rejects.toThrow('API Error');
  });

  it('should handle posts with invalid date strings', async () => {
    const { getPosts } = await import('../../api/posts.api');
    const { load } = await import('./+page.server');

    const mockPosts: Post[] = [
      { title: 'Post 1', url: 'post1.html', date: '2023-12-01' },
      { title: 'Post with invalid date', url: 'post2.html', date: 'invalid-date' },
      { title: 'Post 3', url: 'post3.html', date: '2023-12-03' }
    ];

    vi.mocked(getPosts).mockResolvedValue(mockPosts);

    const mockUrl = {
      searchParams: new URLSearchParams()
    };
    const result = await load({ url: mockUrl } as any);

    // Invalid dates result in NaN which has unpredictable sort behavior
    // Just verify we get all posts back
    expect(result.posts).toHaveLength(3);
    expect(result.posts.find(p => p.title === 'Post 1')).toBeTruthy();
    expect(result.posts.find(p => p.title === 'Post 3')).toBeTruthy();
    expect(result.posts.find(p => p.title === 'Post with invalid date')).toBeTruthy();
  });
});