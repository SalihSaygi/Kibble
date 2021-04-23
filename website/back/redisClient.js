import Redis from 'ioredis'
import { REDIS_OPTIONS } from './config/redis.js'

const config = process.env.NODE_ENV.trim() === "dev" ? "" : REDIS_OPTIONS

const client = new Redis(config)

export default client