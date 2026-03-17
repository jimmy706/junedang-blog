import { describe, expect, it } from 'vitest';
import { sanitizeHtml } from './sanitize-html';

describe('sanitizeHtml', () => {
  it('returns empty string for empty input', () => {
    expect(sanitizeHtml('')).toBe('');
  });

  it('removes script and iframe tags', () => {
    const input = '<div>safe</div><script>alert(1)</script><iframe src="https://example.com"></iframe>';
    expect(sanitizeHtml(input)).toBe('<div>safe</div>');
  });

  it('removes inline event handlers in quoted and unquoted forms', () => {
    const input = '<button onclick="alert(1)" onmouseover=test()>Click</button>';
    expect(sanitizeHtml(input)).toBe('<button>Click</button>');
  });

  it('neutralizes javascript href and src', () => {
    const input = '<a href="javascript:alert(1)">a</a><img src="javascript:alert(2)" />';
    expect(sanitizeHtml(input)).toBe('<a href="#">a</a><img src="#" />');
  });

  it('removes object and embed tags by default', () => {
    const input = '<object data="x"></object><embed src="y"></embed><p>ok</p>';
    expect(sanitizeHtml(input)).toBe('<p>ok</p>');
  });

  it('keeps object and embed tags when allowSvg is true', () => {
    const input = '<object data="x"></object><embed src="y"></embed>';
    expect(sanitizeHtml(input, { allowSvg: true })).toBe(input);
  });
});
