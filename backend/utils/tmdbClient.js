import axios from 'axios';
import axiosRetry from 'axios-retry';
import dotenv from 'dotenv';

dotenv.config();

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 10000, 
});


tmdb.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: process.env.TMDB_API_KEY,
  };
  return config;
});

// Setup automatic retries for network errors or server issues
axiosRetry(tmdb, {
  retries: 3,
  // Use exponential backoff for retries
  retryDelay: axiosRetry.exponentialDelay,
  // Retry on network errors, 5xx status codes, and ECONNRESET
  retryCondition: (error) =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) ||
    error.code === 'ECONNRESET',
});

export default tmdb;