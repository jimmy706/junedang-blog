import { API_URL, API_CACHE_TTL } from "$env/static/private";
import axios from "axios";
import NodeCache from "node-cache";

const cacheTime = API_CACHE_TTL ? Number.parseInt(API_CACHE_TTL) : 3600;

export class Api {
  private webclient = axios.create({
    baseURL: API_URL,
  });

  private cache = new NodeCache();

  async performGet<T>(
    path: string,
    cachingKey: NodeCache.Key
  ): Promise<T> {
    console.log(`Checking cache for key: ${cachingKey}`);
    if (this.cache.has(cachingKey)) {
      console.log(`Cache hit for key: ${cachingKey}`);
      return this.cache.get<T>(cachingKey)!;
    }
    console.log(`Cache miss for key: ${cachingKey}. Making API call to: ${path}`);
    const response = await this.webclient.get<T>(path);
    console.log(`API response received for path: ${path}`, response.data);
    this.cache.set(cachingKey, response.data, cacheTime);
    console.log(`Data cached for key: ${cachingKey} with TTL: ${cacheTime} seconds`);
    return response.data;
  }
}

export const apiInstance = new Api();
