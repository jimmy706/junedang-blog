import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Api } from './index';
import type { Post } from '../types/posts';

// Mock dependencies
vi.mock('$env/dynamic/private', () => ({
  env: {
    API_URL: 'https://test-api.com',
    API_CACHE_TTL: '3600'
  }
}));

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn()
    }))
  }
}));

vi.mock('node-cache', () => ({
  default: class MockNodeCache {
    private cache = new Map();
    
    has(key: string) {
      return this.cache.has(key);
    }
    
    get(key: string) {
      return this.cache.get(key);
    }
    
    set(key: string, value: any, ttl: number) {
      this.cache.set(key, value);
    }
    
    clear() {
      this.cache.clear();
    }
  }
}));

describe('Api class', () => {
  let api: Api;
  let mockAxiosGet: any;

  beforeEach(() => {
    api = new Api();
    // Access the private webclient through type assertion for testing
    mockAxiosGet = vi.fn();
    (api as any).webclient = { get: mockAxiosGet };
    (api as any).cache.clear();
  });

  describe('performGet', () => {
    it('should fetch data from API when cache is empty', async () => {
      const mockData: Post[] = [
        { title: 'Test Post', url: 'test.html', date: '2023-12-01' }
      ];
      mockAxiosGet.mockResolvedValue({ data: mockData });

      const result = await api.performGet<Post[]>('/test', 'test-key');

      expect(mockAxiosGet).toHaveBeenCalledWith('/test');
      expect(result).toEqual(mockData);
    });

    it('should return cached data when available', async () => {
      const mockData: Post[] = [
        { title: 'Cached Post', url: 'cached.html', date: '2023-12-01' }
      ];
      
      // First call to populate cache
      mockAxiosGet.mockResolvedValue({ data: mockData });
      await api.performGet<Post[]>('/test', 'test-key');

      // Second call should use cache
      const result = await api.performGet<Post[]>('/test', 'test-key');

      expect(mockAxiosGet).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockData);
    });

    it('should handle API errors gracefully', async () => {
      const error = new Error('API Error');
      mockAxiosGet.mockRejectedValue(error);

      await expect(api.performGet<Post[]>('/test', 'test-key')).rejects.toThrow('API Error');
    });

    it('should cache data with correct TTL', async () => {
      const mockData = { test: 'data' };
      mockAxiosGet.mockResolvedValue({ data: mockData });

      const cacheSpy = vi.spyOn((api as any).cache, 'set');

      await api.performGet('/test', 'test-key');

      expect(cacheSpy).toHaveBeenCalledWith('test-key', mockData, 3600);
    });
  });
});