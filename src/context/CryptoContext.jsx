import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import coinService from '../services/coinService';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CryptoContext = createContext();

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
};

export const CryptoProvider = ({ children }) => {
  const [marketData, setMarketData] = useState([]);
  const [watchlist, setWatchlist] = useLocalStorage('watchlist', []);
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  // Handle Online/Offline Status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch data
  const fetchMarketData = useCallback(async () => {
    if (!isOnline) return;

    setLoading(true);
    setError(null);
    try {
      const data = await coinService.getTopCoins();
      setMarketData(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  }, [isOnline]);

  // Initial fetch
  useEffect(() => {
    fetchMarketData();
  }, [fetchMarketData]);

  // Watchlist operations
  const toggleWatchlist = useCallback((coinId) => {
    setWatchlist(prev => {
      if (prev.includes(coinId)) {
        return prev.filter(id => id !== coinId);
      }
      return [...prev, coinId];
    });
  }, [setWatchlist]);

  // Theme operations
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, [setTheme]);

  // Filtered market data (useMemo for performance)
  const filteredData = useMemo(() => {
    if (!searchQuery) return marketData;
    const query = searchQuery.toLowerCase();
    return marketData.filter(coin => 
      coin.name.toLowerCase().includes(query) || 
      coin.symbol.toLowerCase().includes(query)
    );
  }, [marketData, searchQuery]);

  // Theme propagation
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const value = {
    marketData: filteredData,
    watchlist,
    theme,
    loading,
    error,
    lastUpdated,
    searchQuery,
    setSearchQuery,
    isOnline,
    toggleWatchlist,
    toggleTheme,
    refreshData: fetchMarketData,
  };

  return (
    <CryptoContext.Provider value={value}>
      {children}
    </CryptoContext.Provider>
  );
};
