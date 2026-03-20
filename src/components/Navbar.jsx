import React from 'react';
import { Sun, Moon, RefreshCw, Activity, LayoutGrid } from 'lucide-react';
import { useCrypto } from '../context/CryptoContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { theme, toggleTheme, lastUpdated, refreshData, loading } = useCrypto();

  const formattedTime = lastUpdated 
    ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '--:--';

  return (
    <nav className="sticky top-6 z-40 mx-auto max-w-7xl px-4 mb-10">
      <div className="glass rounded-[2rem] px-6 py-4 flex items-center justify-between shadow-2xl shadow-brand-500/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-500 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/40 rotate-3">
            <Activity className="text-white" size={20} strokeWidth={3} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter gradient-text">
              CryptoPulse
            </h1>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-dark-muted leading-none">
              Market Intelligence
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex flex-col items-end px-4 border-r border-slate-200 dark:border-slate-800">
            <span className="text-[9px] uppercase font-black text-slate-400 dark:text-dark-muted tracking-widest">Live Sync</span>
            <span className="text-xs font-black text-slate-900 dark:text-dark-text">{formattedTime}</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={refreshData}
              disabled={loading}
              className={`p-3 rounded-2xl text-slate-600 dark:text-dark-text hover:bg-slate-100 dark:hover:bg-slate-800 transition-all ${loading ? 'animate-spin opacity-50' : ''}`}
              title="Refresh Market Feed"
            >
              <RefreshCw size={18} strokeWidth={2.5} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-3 rounded-2xl text-slate-600 dark:text-dark-text hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
            </motion.button>

            <button className="sm:hidden p-3 rounded-2xl text-slate-600 dark:text-dark-text hover:bg-slate-100 dark:hover:bg-slate-800">
              <LayoutGrid size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
