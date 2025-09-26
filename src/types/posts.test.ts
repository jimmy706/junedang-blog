import { describe, it, expect } from 'vitest';
import type { Post } from '../types/posts';

describe('Post type definition', () => {
  it('should allow creating post with all properties', () => {
    const post: Post = {
      title: 'Test Post',
      url: 'test-post.html',
      date: '2023-12-01',
      categories: 'tech',
      tags: 'svelte, testing',
      layout: 'post',
      description: 'A test post',
      image: '/images/test.jpg'
    };

    expect(post.title).toBe('Test Post');
    expect(post.url).toBe('test-post.html');
    expect(post.date).toBe('2023-12-01');
    expect(post.categories).toBe('tech');
    expect(post.tags).toBe('svelte, testing');
    expect(post.layout).toBe('post');
    expect(post.description).toBe('A test post');
    expect(post.image).toBe('/images/test.jpg');
  });

  it('should allow creating post with minimal properties', () => {
    const post: Post = {};

    expect(post.title).toBeUndefined();
    expect(post.url).toBeUndefined();
    expect(post.date).toBeUndefined();
    expect(post.categories).toBeUndefined();
    expect(post.tags).toBeUndefined();
    expect(post.layout).toBeUndefined();
    expect(post.description).toBeUndefined();
    expect(post.image).toBeUndefined();
  });

  it('should allow creating post with only title', () => {
    const post: Post = {
      title: 'Simple Post'
    };

    expect(post.title).toBe('Simple Post');
    expect(post.url).toBeUndefined();
  });

  it('should validate post has required fields for display', () => {
    const validPost: Post = {
      title: 'Valid Post',
      url: 'valid-post.html'
    };

    const invalidPost: Post = {
      url: 'no-title.html'
    };

    // Check if post is valid for display (has title)
    expect(!!validPost.title).toBe(true);
    expect(!!invalidPost.title).toBe(false);
  });
});