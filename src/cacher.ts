import { RedisClient } from "redis";
import { promisify } from "util";

export type MemoryCacheStore = { [key: string]: string }

export const newInMemoryCacher = (): Cacher => {
    return (() => {
        let cache: MemoryCacheStore = {}

        setInterval(() => {
            cache = {}
        }, 1000 * 60)
        
        return {
            get: async (key: string) => cache[key] || null,
            set: async (key: string, value: string) => {
                cache[key] = value
            }
        }
    })();
}

export const newRedisCacher = (redisClient: RedisClient): Cacher => {

    const getAsync = promisify(redisClient.get)
    const setAsync = promisify(redisClient.set)
    
    return {
        get: (key: string) => getAsync(key),
        set: (key: string, value: string) => setAsync(key, value)
    }
}