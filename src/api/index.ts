import { env } from "$env/dynamic/private";
import NodeCache from "node-cache";

const { API_URL, API_CACHE_TTL } = env;

const cacheTime = API_CACHE_TTL ? Number.parseInt(API_CACHE_TTL) : 3600;

export class Api {
  private cache = new NodeCache();

  async performGet<T>(path: string, cachingKey: NodeCache.Key): Promise<T> {
    console.log(`Checking cache for key: ${cachingKey}`);
    if (this.cache.has(cachingKey)) {
      console.log(`Cache hit for key: ${cachingKey}`);
      return this.cache.get<T>(cachingKey)!;
    }
    console.log(
      `Cache miss for key: ${cachingKey}. Making API call to: ${path}`
    );
    const url = API_URL ? new URL(path, API_URL).toString() : path;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json() as T;
    console.log(`API response received for path: ${path}`, data);
    this.cache.set(cachingKey, data, cacheTime);
    console.log(
      `Data cached for key: ${cachingKey} with TTL: ${cacheTime} seconds`
    );
    return data;
  }
}

export const apiInstance = new Api();
