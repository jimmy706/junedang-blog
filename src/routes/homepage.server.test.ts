import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Post } from '../types/posts';

// Mock the getPosts API function
vi.mock('../api/posts.api', () => ({
  getPosts: vi.fn()
}));

describe('homepage server load', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load posts', async () => {
    const { getPosts } = await import('../api/posts.api');
    const { load } = await import('./+page.server');

    const mockPosts: Post[] = [
      { title: 'Post 1', url: 'post1.html', date: '2023-12-01' },
      { title: 'Post 2', url: 'post2.html', date: '2023-12-02' }
    ];

    vi.mocked(getPosts).mockResolvedValue(mockPosts);

    const result = await load();

    expect(getPosts).toHaveBeenCalledOnce();
    expect(result.posts).toEqual(mockPosts);
  });

  it('should handle empty posts array', async () => {
    const { getPosts } = await import('../api/posts.api');
    const { load } = await import('./+page.server');

    vi.mocked(getPosts).mockResolvedValue([]);

    const result = await load();

    expect(result.posts).toEqual([]);
  });

  it('should handle API errors', async () => {
    const { getPosts } = await import('../api/posts.api');
    const { load } = await import('./+page.server');

    const error = new Error('API Error');
    vi.mocked(getPosts).mockRejectedValue(error);

    await expect(load()).rejects.toThrow('API Error');
  });

  it('should return posts structure expected by homepage', async () => {
    const { getPosts } = await import('../api/posts.api');
    const { load } = await import('./+page.server');

    const mockPosts: Post[] = [
      { 
        title: 'Recent Post', 
        url: 'recent.html', 
        date: '2023-12-01',
        description: 'A recent post',
        image: '/images/recent.jpg'
      }
    ];

    vi.mocked(getPosts).mockResolvedValue(mockPosts);

    const result = await load();

    expect(result).toHaveProperty('posts');
    expect(Array.isArray(result.posts)).toBe(true);
    
    // Verify the structure is what the homepage expects
    if (result.posts.length > 0) {
      const post = result.posts[0];
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('url');
      expect(post).toHaveProperty('date');
      expect(post).toHaveProperty('description');
      expect(post).toHaveProperty('image');
    }
  });
});