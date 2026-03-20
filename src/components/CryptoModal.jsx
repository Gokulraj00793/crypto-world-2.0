import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, TrendingUp, TrendingDown, DollarSign, BarChart3, TrendingUp as VolIcon, ArrowUpRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const CryptoModal = ({ isOpen, onClose, coin }) => {
  if (!coin) return null;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const formatNumber = (val) => {
    return new Intl.NumberFormat('en-US', {
      compactDisplay: 'short',
      notation: 'compact',
    }).format(val);
  };

  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md dark:bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-95 translate-y-10"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-10"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-[3rem] bg-white dark:bg-dark-surface p-10 text-left align-middle shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-all border border-slate-200 dark:border-slate-800 relative">
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none" />

                <div className="flex justify-between items-start mb-10">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-brand-500/20 blur-xl rounded-full" />
                      <img src={coin.image} alt={coin.name} className="w-20 h-20 rounded-[2rem] relative z-10 shadow-2xl" />
                    </div>
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-4xl font-black text-slate-900 dark:text-dark-text tracking-tighter"
                      >
                        {coin.name}
                        <span className="ml-3 text-sm font-black text-slate-400 dark:text-dark-muted uppercase tracking-[0.2em]">
                          {coin.symbol}
                        </span>
                      </Dialog.Title>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="asset-chip bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-dark-muted">
                          Rank #{coin.market_cap_rank}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                        <span className="text-xs font-bold text-slate-400 dark:text-dark-muted uppercase">Global Market</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-3 rounded-2xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X size={24} strokeWidth={3} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-dark-muted mb-2 text-[10px] font-black uppercase tracking-widest">
                      <TrendingUp size={14} className="text-emerald-500" />
                      <span>24h High</span>
                    </div>
                    <p className="text-xl font-black text-slate-900 dark:text-dark-text tabular-nums">
                      {formatCurrency(coin.high_24h)}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-dark-muted mb-2 text-[10px] font-black uppercase tracking-widest">
                      <TrendingDown size={14} className="text-rose-500" />
                      <span>24h Low</span>
                    </div>
                    <p className="text-xl font-black text-slate-900 dark:text-dark-text tabular-nums">
                      {formatCurrency(coin.low_24h)}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-dark-muted mb-2 text-[10px] font-black uppercase tracking-widest">
                      <VolIcon size={14} className="text-brand-500" />
                      <span>Volume</span>
                    </div>
                    <p className="text-xl font-black text-slate-900 dark:text-dark-text tabular-nums">
                      {formatNumber(coin.total_volume)}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-dark-muted mb-2 text-[10px] font-black uppercase tracking-widest">
                      <BarChart3 size={14} className="text-indigo-500" />
                      <span>Market Cap</span>
                    </div>
                    <p className="text-xl font-black text-slate-900 dark:text-dark-text tabular-nums">
                      {formatNumber(coin.market_cap)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between p-8 bg-brand-500 rounded-[2.5rem] shadow-2xl shadow-brand-500/40 text-white relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 mb-4 sm:mb-0">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Current Value</span>
                    <p className="text-4xl font-black tabular-nums tracking-tighter mt-1">
                      {formatCurrency(coin.current_price)}
                    </p>
                  </div>
                  <div className="relative z-10 text-right">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-md font-black text-sm`}>
                      {isPositive ? <TrendingUp size={16} strokeWidth={3} /> : <TrendingDown size={16} strokeWidth={3} />}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mt-2">Last 24 Hours</p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CryptoModal;
