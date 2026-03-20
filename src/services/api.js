import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
  },
});

// Response interceptor for error handling (e.g., rate limits)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      console.error('CoinGecko Rate Limit Reached');
      return Promise.reject(new Error('Too many requests, try again in a minute'));
    }
    return Promise.reject(error);
  }
);

export default api;
