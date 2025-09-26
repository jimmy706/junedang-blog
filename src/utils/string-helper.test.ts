import { describe, it, expect } from 'vitest';
import { constructArticleSlug } from './string-helper';

describe('string-helper utilities', () => {
  describe('constructArticleSlug', () => {
    it('should return empty string when url is undefined', () => {
      expect(constructArticleSlug(undefined)).toBe('');
    });

    it('should return empty string when url is empty', () => {
      expect(constructArticleSlug('')).toBe('');
    });

    it('should construct slug from valid URL', () => {
      const url = 'path/to/my-article.html';
      const expected = '/posts/my-article';
      expect(constructArticleSlug(url)).toBe(expected);
    });

    it('should handle URL with multiple directory levels', () => {
      const url = 'blog/2023/12/awesome-post.html';
      const expected = '/posts/awesome-post';
      expect(constructArticleSlug(url)).toBe(expected);
    });

    it('should handle URL with single file name', () => {
      const url = 'single-post.html';
      const expected = '/posts/single-post';
      expect(constructArticleSlug(url)).toBe(expected);
    });

    it('should handle URL without .html extension', () => {
      const url = 'path/to/my-article';
      const expected = '/posts/my-article';
      expect(constructArticleSlug(url)).toBe(expected);
    });

    it('should handle URL with query parameters', () => {
      const url = 'path/to/my-article.html?param=value';
      const expected = '/posts/my-article';
      expect(constructArticleSlug(url)).toBe(expected);
    });
  });
});