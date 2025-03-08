import Redis from 'ioredis';
import { logger } from './logger.service';

let redisClient: Redis | null = null;
const mockCache = new Map<string, { value: string, expiry?: number }>();

// Verifica se deve usar Redis real ou mock
const useRealRedis = process.env.REDIS_URL && !process.env.REDIS_URL.includes('test_redis_url') && process.env.NODE_ENV !== 'test';

if (useRealRedis) {
  redisClient = new Redis(process.env.REDIS_URL as string);
  
  redisClient.on('error', (err) => {
    logger.error('Erro na conexão Redis', { error: err.message });
  });
}

export const cacheService = {
  async get(key: string): Promise<any> {
    if (redisClient) {
      try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
      } catch (error) {
        logger.error('Erro ao buscar do cache', { key, error });
        return null;
      }
    } else {
      // Usando mock cache
      const item = mockCache.get(key);
      if (!item) return null;
      
      // Verifica expiração
      if (item.expiry && item.expiry < Date.now()) {
        mockCache.delete(key);
        return null;
      }
      
      return JSON.parse(item.value);
    }
  },
  
  async set(key: string, value: any, ttl?: number): Promise<void> {
    if (redisClient) {
      try {
        const stringValue = JSON.stringify(value);
        if (ttl) {
          await redisClient.set(key, stringValue, 'EX', ttl);
        } else {
          await redisClient.set(key, stringValue);
        }
      } catch (error) {
        logger.error('Erro ao salvar no cache', { key, error });
      }
    } else {
      // Usando mock cache
      const expiry = ttl ? Date.now() + (ttl * 1000) : undefined;
      mockCache.set(key, { 
        value: JSON.stringify(value),
        expiry
      });
    }
  }
}; 