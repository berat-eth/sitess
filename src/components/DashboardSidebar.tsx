<<<<<<< HEAD
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  BarChart3, 
  Home, 
  FileText, 
  TrendingUp, 
  User, 
  LogOut,
  ChevronRight,
  Plus,
  Share2,
  BarChart,
  CreditCard,
  Bot,
  Palette,
  Layers
} from 'lucide-react';

interface DashboardSidebarProps {
  currentPage: string;
}

export default function DashboardSidebar({ currentPage }: DashboardSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { id: 'home', label: 'Şirket Paneli', icon: Home, href: '/dashboard' },
    { id: 'surveys', label: 'Müşteri Anketleri', icon: FileText, href: '/dashboard/surveys' },
    { id: 'analysis', label: 'Veri Analizi', icon: BarChart, href: '/dashboard/analysis' },
    { id: 'charts', label: 'Gelişmiş Grafikler', icon: Layers, href: '/dashboard/charts' },
    { id: 'design', label: 'Tasarım & Özelleştirme', icon: Palette, href: '/dashboard/design' },
    { id: 'mik', label: 'Mik AI', icon: Bot, href: '/dashboard/mik' },
    { id: 'payments', label: 'Ödemelerim', icon: CreditCard, href: '/dashboard/payments' },
    { id: 'results', label: 'Raporlarım', icon: TrendingUp, href: '/dashboard/results' },
    { id: 'profile', label: 'Şirket Profili', icon: User, href: '/dashboard/profile' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed lg:relative lg:translate-x-0 left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-primary-900 text-white z-30 lg:z-20 pt-4"
      >
        {/* Sidebar Header */}
        <div className="px-6 py-8 lg:py-6 border-b border-white border-opacity-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg">
              <BarChart3 size={24} className="text-white" />
            </div>
            {isOpen && (
              <div>
                <h1 className="font-bold text-lg">AraştırmaPaneli</h1>
                <p className="text-xs text-slate-400">Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  // Sadece mobil cihazlarda sidebar'ı kapat
                  if (window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-accent-500 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Icon
                  size={20}
                  className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}
                />
                {isOpen && (
                  <>
                    <span className="text-sm font-medium flex-1">{item.label}</span>
                    {isActive && <ChevronRight size={16} />}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="px-4 my-8">
          <div className="h-px bg-white bg-opacity-10" />
        </div>

        {/* Logout Button */}
        <div className="px-4 pb-6">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200 group">
            <LogOut size={20} className="text-slate-400 group-hover:text-white" />
            {isOpen && <span className="text-sm font-medium flex-1 text-left">Çıkış Yap</span>}
          </button>
        </div>

        {/* Sidebar Footer Info */}
        {isOpen && (
          <div className="absolute bottom-6 left-4 right-4 bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-10">
            <p className="text-xs text-slate-400 mb-2">Premium Plan</p>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5">
              <div className="bg-accent-500 h-full rounded-full" style={{ width: '75%' }} />
            </div>
            <p className="text-xs text-slate-400 mt-2">3/4 anket kullanıldı</p>
          </div>
        )}
      </motion.aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
        />
      )}
    </>
  );
}
=======
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  BarChart3, 
  Home, 
  FileText, 
  TrendingUp, 
  User, 
  LogOut,
  ChevronRight,
  Plus,
  Share2,
  BarChart,
  CreditCard,
  Bot,
  Palette,
  Layers
} from 'lucide-react';

interface DashboardSidebarProps {
  currentPage: string;
}

export default function DashboardSidebar({ currentPage }: DashboardSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { id: 'home', label: 'Şirket Paneli', icon: Home, href: '/dashboard' },
    { id: 'surveys', label: 'Müşteri Anketleri', icon: FileText, href: '/dashboard/surveys' },
    { id: 'analysis', label: 'Veri Analizi', icon: BarChart, href: '/dashboard/analysis' },
    { id: 'charts', label: 'Gelişmiş Grafikler', icon: Layers, href: '/dashboard/charts' },
    { id: 'design', label: 'Tasarım & Özelleştirme', icon: Palette, href: '/dashboard/design' },
    { id: 'mik', label: 'Mik AI', icon: Bot, href: '/dashboard/mik' },
    { id: 'payments', label: 'Ödemelerim', icon: CreditCard, href: '/dashboard/payments' },
    { id: 'results', label: 'Raporlarım', icon: TrendingUp, href: '/dashboard/results' },
    { id: 'profile', label: 'Şirket Profili', icon: User, href: '/dashboard/profile' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed lg:relative lg:translate-x-0 left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-primary-900 text-white z-30 lg:z-20 pt-4"
      >
        {/* Sidebar Header */}
        <div className="px-6 py-8 lg:py-6 border-b border-white border-opacity-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg">
              <BarChart3 size={24} className="text-white" />
            </div>
            {isOpen && (
              <div>
                <h1 className="font-bold text-lg">AraştırmaPaneli</h1>
                <p className="text-xs text-slate-400">Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  // Sadece mobil cihazlarda sidebar'ı kapat
                  if (window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-accent-500 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Icon
                  size={20}
                  className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}
                />
                {isOpen && (
                  <>
                    <span className="text-sm font-medium flex-1">{item.label}</span>
                    {isActive && <ChevronRight size={16} />}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="px-4 my-8">
          <div className="h-px bg-white bg-opacity-10" />
        </div>

        {/* Logout Button */}
        <div className="px-4 pb-6">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200 group">
            <LogOut size={20} className="text-slate-400 group-hover:text-white" />
            {isOpen && <span className="text-sm font-medium flex-1 text-left">Çıkış Yap</span>}
          </button>
        </div>

        {/* Sidebar Footer Info */}
        {isOpen && (
          <div className="absolute bottom-6 left-4 right-4 bg-white bg-opacity-10 rounded-lg p-4 border border-white border-opacity-10">
            <p className="text-xs text-slate-400 mb-2">Premium Plan</p>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5">
              <div className="bg-accent-500 h-full rounded-full" style={{ width: '75%' }} />
            </div>
            <p className="text-xs text-slate-400 mt-2">3/4 anket kullanıldı</p>
          </div>
        )}
      </motion.aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
        />
      )}
    </>
  );
}
>>>>>>> 4855e23d27390993c3739d0f6d832d04426b1d54
