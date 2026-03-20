import React from 'react';
import { Github, Linkedin, Activity, ExternalLink, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Replace these with your actual profile links
  const githubLink = "https://github.com/Gokulraj00793";
  const linkedinLink = "https://www.linkedin.com/in/gokulraj71845/";

  return (
    <footer className="relative mt-20 pb-12 px-4 overflow-hidden border-t border-slate-200/50 dark:border-slate-800/50">
      {/* Decorative Background Element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 rotate-3">
                <Activity className="text-white" size={16} strokeWidth={3} />
              </div>
              <span className="text-xl font-black tracking-tighter gradient-text">
                CryptoPulse
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-dark-muted leading-relaxed max-w-xs">
              Next-generation market intelligence platform providing institutional-grade data at your fingertips.
            </p>
          </div>

          {/* Connect Section */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 dark:text-dark-muted">
              Connect With Me
            </h4>
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-600 dark:text-dark-text hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                title="GitHub Profile"
              >
                <Github size={20} strokeWidth={2.5} />
              </motion.a>
              <motion.a
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-600 dark:text-dark-text hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin size={20} strokeWidth={2.5} />
              </motion.a>
            </div>
          </div>

          {/* Quick Info Section */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 dark:text-dark-muted">
              Data Provider
            </h4>
            <a 
              href="https://www.coingecko.com/en/api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-dark-muted hover:text-brand-500 transition-colors"
            >
              <span>Powered by CoinGecko API</span>
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-dark-muted uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              API Status: Operational
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-200/30 dark:border-slate-800/30">
          <p className="text-xs font-black text-slate-400 dark:text-dark-muted uppercase tracking-[0.2em]">
            © {currentYear} CryptoPulse. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-xs font-black text-slate-400 dark:text-dark-muted uppercase tracking-widest">
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
