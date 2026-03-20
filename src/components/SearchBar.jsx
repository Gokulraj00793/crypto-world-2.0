import React from 'react';
import { Search, X, Command } from 'lucide-react';
import { useCrypto } from '../context/CryptoContext';
import { motion } from 'framer-motion';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useCrypto();

  const handleClear = () => setSearchQuery('');

  return (
    <div className="relative max-w-xl w-full group">
      <motion.div
        initial={false}
        animate={{ 
          scale: searchQuery ? 1.02 : 1,
          boxShadow: searchQuery ? '0 20px 40px -15px rgba(14, 165, 233, 0.2)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }}
        className="relative"
      >
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search size={18} className="text-slate-400 dark:text-dark-muted group-focus-within:text-brand-500 transition-colors" strokeWidth={2.5} />
        </div>
        <input
          type="text"
          placeholder="Search markets (BTC, ETH, etc...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-12 pr-12 py-4 bg-white/50 dark:bg-dark-surface/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/50 rounded-3xl text-slate-900 dark:text-dark-text placeholder:text-slate-400 dark:placeholder:text-dark-muted focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all font-medium"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-2">
          {searchQuery ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleClear}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-dark-muted hover:text-slate-600 dark:hover:text-dark-text transition-colors"
            >
              <X size={16} strokeWidth={3} />
            </motion.button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <Command size={10} className="text-slate-400" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">K</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SearchBar;
