'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bell, Settings, ChevronDown, Search, Sun, Moon } from 'lucide-react';
import { mockUser } from '@/data/dashboardMockData';
import { useState, useEffect } from 'react';

export default function DashboardHeader() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // localStorage'dan tema tercihini oku
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-soft"
    >
      <div className="flex items-center justify-between px-6 py-4 lg:px-8">
        {/* Left: Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Anket veya sonuç ara..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all"
            />
          </div>
        </div>

        {/* Right: Icons and Profile */}
        <div className="flex items-center gap-6 ml-auto">
          {/* Notification Bell */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 text-slate-600 hover:text-primary-900 hover:bg-slate-100 rounded-lg transition-all"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 text-slate-600 hover:text-primary-900 hover:bg-slate-100 rounded-lg transition-all"
            title={isDarkMode ? 'Açık tema' : 'Koyu tema'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-slate-600 hover:text-primary-900 hover:bg-slate-100 rounded-lg transition-all"
          >
            <Settings size={20} />
          </motion.button>

          {/* Divider */}
          <div className="w-px h-8 bg-slate-200" />

          {/* Profile */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 rounded-lg transition-all group"
          >
            <div className="flex flex-col items-end">
              <p className="text-sm font-semibold text-primary-900 group-hover:text-primary-600">
                {mockUser.name}
              </p>
              <p className="text-xs text-slate-500">{mockUser.role}</p>
            </div>
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-accent-200 group-hover:border-accent-400 transition-colors">
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
