import NodeCache from 'node-cache';

// Initialize cache with a default TTL of 12 hours
export const cache = new NodeCache({
  stdTTL: 60 * 60 * 12, // 12 hours in seconds
  checkperiod: 60 * 60, // Check for expired keys every hour
});
