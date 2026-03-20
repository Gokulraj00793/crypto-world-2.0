import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CryptoTable from './components/CryptoTable';
import CryptoModal from './components/CryptoModal';
import OfflineBanner from './components/OfflineBanner';
import Footer from './components/Footer';
import { useCrypto } from './context/CryptoContext';
import { Star, Activity, AlertCircle, Sparkles, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const { marketData, loading, error, watchlist, toggleWatchlist, refreshData } = useCrypto();
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectCoin = (coin) => {
    setSelectedCoin(coin);
    setIsModalOpen(true);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val);
  };

  const isPositive = (val) => val >= 0;

  // Watchlist filter
  const watchedCoins = marketData.filter(coin => watchlist.includes(coin.id));

  return (
    <div className="min-h-screen relative">
      <div className="bg-mesh" />
      
      {/* Decorative background blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />

      {/* Floating Geometric Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20 dark:opacity-30">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-32 h-32 border-2 border-brand-500/20 rounded-3xl rotate-12"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-20 w-48 h-48 border-2 border-indigo-500/20 rounded-[3rem] -rotate-6"
        />
        <motion.div 
          animate={{ x: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-gradient-to-br from-brand-500/10 to-transparent rounded-full blur-xl"
        />
      </div>

      <OfflineBanner />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-black uppercase tracking-widest mb-6"
            >
              <Sparkles size={14} />
              Real-time Market Analytics
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-7xl font-black text-slate-900 dark:text-dark-text tracking-tighter leading-[0.9] mb-6"
            >
              Monitor the <span className="gradient-text">Pulse</span> of Crypto.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-500 dark:text-dark-muted font-medium leading-relaxed"
            >
              A high-performance dashboard for institutional-grade market data. 
              Track, analyze, and pulse with the global digital economy.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-auto"
          >
            <SearchBar />
          </motion.div>
        </header>

        {/* Watchlist Section - Bento Grid Style */}
        <AnimatePresence>
          {watchedCoins.length > 0 && (
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-24 overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-10 px-4">
                <div className="w-1.5 h-8 bg-brand-500 rounded-full" />
                <h3 className="text-xl font-black text-slate-900 dark:text-dark-text tracking-tighter uppercase">
                  Personal Terminal
                </h3>
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black text-slate-400 dark:text-dark-muted uppercase tracking-widest">
                  {watchedCoins.length} Assets Tracked
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 min-h-[500px]">
                {watchedCoins.map((coin, index) => {
                  const isLarge = index === 0; // First item is always a "Hero" bento
                  const isWide = index === 1;  // Second item is "Wide" bento
                  
                  return (
                    <motion.div
                      layoutId={coin.id}
                      key={`bento-${coin.id}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
                      onClick={() => handleSelectCoin(coin)}
                      className={`group cursor-pointer bento-card ${isLarge ? 'bento-lg' : isWide ? 'bento-md' : ''}`}
                    >
                      {/* Interactive background glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-10">
                          <div className={`p-4 bg-white dark:bg-dark-bg rounded-3xl shadow-2xl group-hover:rotate-6 transition-transform duration-500 ${isLarge ? 'w-20 h-20' : 'w-14 h-14'}`}>
                            <img src={coin.image} alt={coin.name} className="w-full h-full object-contain rounded-2xl" />
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWatchlist(coin.id);
                            }}
                            className="text-yellow-400 p-3 hover:bg-yellow-400/10 rounded-2xl transition-all hover:scale-110 active:scale-90"
                          >
                            <Star size={24} fill="currentColor" />
                          </button>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className={`${isLarge ? 'text-4xl' : 'text-2xl'} font-black text-slate-900 dark:text-dark-text tracking-tighter`}>
                              {coin.name}
                            </h4>
                            <span className="asset-chip bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-dark-muted">
                              {coin.symbol}
                            </span>
                          </div>
                          
                          {isLarge && (
                            <p className="text-slate-400 dark:text-dark-muted font-bold mb-6 max-w-xs">
                              Real-time market depth analysis for {coin.name}. 
                              Global rank #{coin.market_cap_rank}.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="relative z-10 flex items-end justify-between mt-auto">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-400 dark:text-dark-muted uppercase tracking-widest mb-1 opacity-60">Value</span>
                          <p className={`${isLarge ? 'text-5xl' : 'text-3xl'} font-black text-slate-900 dark:text-dark-text tabular-nums tracking-tighter`}>
                            {formatCurrency(coin.current_price)}
                          </p>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-sm ${isPositive(coin.price_change_percentage_24h) ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          {isPositive(coin.price_change_percentage_24h) ? <TrendingUp size={16} strokeWidth={3} /> : <Activity size={16} strokeWidth={3} />}
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Decorative Stats Bento (always present if there are watched coins) */}
                {watchedCoins.length > 0 && watchedCoins.length < 4 && (
                  <div className="bento-card bg-brand-500 dark:bg-brand-600 border-none shadow-brand-500/30 overflow-hidden group">
                    <div className="absolute inset-0 bg-mesh opacity-30" />
                    <div className="relative z-10 text-white">
                      <Sparkles className="mb-6 opacity-80" size={32} />
                      <h4 className="text-2xl font-black tracking-tight leading-none mb-4">Market Insight Ready</h4>
                      <p className="text-sm font-bold text-white/70">
                        Add more assets to your terminal for a holistic portfolio view.
                      </p>
                    </div>
                    <div className="relative z-10 flex items-center justify-between mt-auto">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                        <Activity size={20} strokeWidth={3} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest opacity-80">v1.0.4</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Main Feed Section */}
        <section>
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
                <Activity size={18} />
              </div>
              <h3 className="text-sm font-black text-slate-400 dark:text-dark-muted uppercase tracking-[0.2em]">
                Market Overview
              </h3>
            </div>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-rose-500 text-xs font-black bg-rose-500/10 px-4 py-2 rounded-xl border border-rose-500/20"
              >
                <AlertCircle size={14} />
                <span>{error}</span>
              </motion.div>
            )}
          </div>

          {loading && marketData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-40 space-y-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-brand-500/20 rounded-full" />
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-slate-400 dark:text-dark-muted font-black uppercase tracking-[0.3em] text-xs animate-pulse">Syncing Engine</p>
            </div>
          ) : (
            <CryptoTable coins={marketData} onSelectCoin={handleSelectCoin} />
          )}

          {marketData.length === 0 && !loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-40 card-premium border-dashed"
            >
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                <Activity size={32} className="text-slate-300 dark:text-slate-500" />
              </div>
              <p className="text-xl text-slate-500 dark:text-dark-muted font-bold mb-4">No matching assets found.</p>
              <button 
                onClick={() => refreshData()}
                className="text-brand-500 font-black uppercase tracking-widest text-xs hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </section>
      </main>

      <CryptoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        coin={selectedCoin}
      />

      <Footer />
    </div>
  );
};

export default App;
