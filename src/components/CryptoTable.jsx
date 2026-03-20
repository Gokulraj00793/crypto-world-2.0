import React, { memo } from 'react';
import { Star, ChevronRight, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { useCrypto } from '../context/CryptoContext';
import { motion, AnimatePresence } from 'framer-motion';

const CryptoRow = memo(({ coin, index, onClick }) => {
  const { watchlist, toggleWatchlist } = useCrypto();
  const isWatched = watchlist.includes(coin.id);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val);
  };

  const isPositive = coin.price_change_percentage_24h >= 0;

  const handleToggle = (e) => {
    e.stopPropagation();
    toggleWatchlist(coin.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={() => onClick(coin)}
      className="group relative flex flex-col sm:flex-row items-center justify-between p-6 bg-white/50 dark:bg-dark-surface/50 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-[2rem] hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-all cursor-pointer shadow-xl shadow-slate-200/50 dark:shadow-none"
    >
      <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
        <div className="flex items-center gap-3">
          <span className="hidden lg:block text-xs font-black text-slate-300 dark:text-slate-500 w-6">
            {coin.market_cap_rank}
          </span>
          <div className="relative">
            <img src={coin.image} alt={coin.name} className="w-12 h-12 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute -top-2 -right-2 p-1.5 rounded-xl bg-white dark:bg-dark-bg border border-slate-100 dark:border-slate-800 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={10} className="text-brand-500" />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-slate-900 dark:text-dark-text tracking-tight">{coin.name}</span>
            <span className="asset-chip bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-dark-muted">
              {coin.symbol}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-400 dark:text-dark-muted uppercase tracking-wider">
            Market Rank #{coin.market_cap_rank}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto border-t sm:border-0 pt-4 sm:pt-0 border-slate-100 dark:border-slate-800">
        <div className="flex flex-col items-start sm:items-end">
          <span className="text-[10px] font-black uppercase text-slate-400 dark:text-dark-muted tracking-[0.1em] mb-1 lg:hidden">Price</span>
          <span className="text-lg font-black text-slate-900 dark:text-dark-text tabular-nums">
            {formatCurrency(coin.current_price)}
          </span>
        </div>

        <div className="flex flex-col items-start sm:items-end min-w-[100px]">
          <span className="text-[10px] font-black uppercase text-slate-400 dark:text-dark-muted tracking-[0.1em] mb-1 lg:hidden">24h Change</span>
          <div className={`flex items-center gap-1.5 text-sm font-black px-3 py-1.5 rounded-2xl ${isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
            {isPositive ? <TrendingUp size={14} strokeWidth={3} /> : <TrendingDown size={14} strokeWidth={3} />}
            {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
          </div>
        </div>

        {/* Sparkline Indicator */}
        <div className="hidden xl:flex flex-col items-center">
          <span className="text-[10px] font-black uppercase text-slate-400 dark:text-dark-muted tracking-[0.1em] mb-2">Trend</span>
          <div className={`sparkline ${isPositive ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, delay: index * 0.1 }}
              className={`h-full ${isPositive ? 'bg-emerald-500/40' : 'bg-rose-500/40'}`}
              style={{ 
                clipPath: 'polygon(0% 50%, 20% 40%, 40% 60%, 60% 30%, 80% 70%, 100% 20%, 100% 100%, 0% 100%)' 
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleToggle}
            className={`p-3 rounded-2xl transition-all ${isWatched ? 'text-yellow-400 bg-yellow-400/10' : 'text-slate-300 dark:text-slate-500 hover:text-yellow-400 hover:bg-yellow-400/5'}`}
          >
            <Star size={20} fill={isWatched ? 'currentColor' : 'none'} strokeWidth={2.5} />
          </button>
          <div className="hidden sm:flex p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/50 text-slate-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
            <ChevronRight size={18} strokeWidth={3} />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const CryptoTable = ({ coins, onSelectCoin }) => {
  return (
    <div className="space-y-4">
      <div className="hidden lg:flex items-center justify-between px-10 mb-4">
        <div className="flex items-center gap-4">
          <span className="table-header w-6">#</span>
          <span className="table-header">Asset Details</span>
        </div>
        <div className="flex items-center gap-24 pr-24">
          <span className="table-header">Market Price</span>
          <span className="table-header">24h Performance</span>
        </div>
      </div>
      <AnimatePresence mode="popLayout">
        {coins.map((coin, index) => (
          <CryptoRow 
            key={coin.id} 
            coin={coin} 
            index={index} 
            onClick={onSelectCoin} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CryptoTable;
