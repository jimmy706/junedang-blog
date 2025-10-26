import { describe, it, expect } from 'vitest';
import { sanitizeHtml, sanitizeAndEnhanceHtml, isValidHtml } from './html-sanitizer.js';

describe('HTML Sanitizer', () => {
  describe('sanitizeHtml', () => {
    it('should allow safe HTML tags', () => {
      const input = '<h1>Title</h1><p>Some <strong>bold</strong> text</p>';
      const result = sanitizeHtml(input);
      expect(result).toBe('<h1>Title</h1><p>Some <strong>bold</strong> text</p>');
    });

    it('should remove script tags', () => {
      const input = '<p>Safe content</p><script>alert("xss")</script>';
      const result = sanitizeHtml(input);
      expect(result).toBe('<p>Safe content</p>');
    });

    it('should remove dangerous attributes', () => {
      const input = '<div onclick="alert(\'xss\')">Click me</div>';
      const result = sanitizeHtml(input);
      expect(result).toBe('<div>Click me</div>');
    });

    it('should preserve safe attributes', () => {
      const input = '<a href="https://example.com" title="Link">Link</a>';
      const result = sanitizeHtml(input);
      expect(result).toContain('href="https://example.com"');
      expect(result).toContain('title="Link"');
    });

    it('should allow safe image tags', () => {
      const input = '<img src="https://example.com/image.jpg" alt="Test" width="100" height="100" />';
      const result = sanitizeHtml(input);
      expect(result).toContain('<img');
      expect(result).toContain('src="https://example.com/image.jpg"');
      expect(result).toContain('alt="Test"');
    });

    it('should allow code blocks', () => {
      const input = '<pre><code>const x = 1;</code></pre>';
      const result = sanitizeHtml(input);
      expect(result).toBe('<pre><code>const x = 1;</code></pre>');
    });

    it('should allow tables', () => {
      const input = '<table><tr><th>Header</th></tr><tr><td>Cell</td></tr></table>';
      const result = sanitizeHtml(input);
      expect(result).toContain('<table>');
      expect(result).toContain('<th>Header</th>');
      expect(result).toContain('<td>Cell</td>');
    });

    it('should remove iframe tags', () => {
      const input = '<p>Content</p><iframe src="malicious.html"></iframe>';
      const result = sanitizeHtml(input);
      expect(result).toBe('<p>Content</p>');
    });
  });

  describe('sanitizeAndEnhanceHtml', () => {
    it('should sanitize and return enhanced HTML', () => {
      const input = '<h1>Title</h1><p>Content</p><script>alert("bad")</script>';
      const result = sanitizeAndEnhanceHtml(input);
      expect(result).toContain('<h1>Title</h1>');
      expect(result).toContain('<p>Content</p>');
      expect(result).not.toContain('script');
    });
  });

  describe('isValidHtml', () => {
    it('should return true for valid HTML', () => {
      const validHtml = '<h1>Title</h1><p>Content</p>';
      expect(isValidHtml(validHtml)).toBe(true);
    });

    it('should return true for empty string', () => {
      expect(isValidHtml('')).toBe(false);
    });

    it('should return false for null or undefined', () => {
      expect(isValidHtml(null as any)).toBe(false);
      expect(isValidHtml(undefined as any)).toBe(false);
    });

    it('should return false for non-string input', () => {
      expect(isValidHtml(123 as any)).toBe(false);
      expect(isValidHtml({} as any)).toBe(false);
    });
  });
});