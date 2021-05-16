import Redis from 'ioredis';
import { DEV_REDIS_OPTIONS, PROD_REDIS_OPTIONS } from './config/redis.js';

const config =
  process.env.NODE_ENV.trim() === 'dev'
    ? DEV_REDIS_OPTIONS
    : PROD_REDIS_OPTIONS;

const client = new Redis(config);

export default client;
