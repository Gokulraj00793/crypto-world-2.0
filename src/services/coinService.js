import api from './api';

const coinService = {
  /**
   * Fetch top 10 coins by market cap
   * @returns {Promise<Array>} List of coins
   */
  getTopCoins: async (page = 1, perPage = 10) => {
    try {
      const response = await api.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: perPage,
          page: page,
          sparkline: false,
          price_change_percentage: '24h'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top coins:', error);
      throw error;
    }
  },

  /**
   * Fetch specific coin details
   * @param {string} id - Coin ID (e.g., 'bitcoin')
   * @returns {Promise<Object>} Coin details
   */
  getCoinDetails: async (id) => {
    try {
      const response = await api.get(`/coins/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching coin details for ${id}:`, error);
      throw error;
    }
  }
};

export default coinService;
