'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const DashboardSidebar = ({ isOpen, onClose }: DashboardSidebarProps) => {
  const pathname = usePathname();

  const navigation = [
    {
      name: 'Ana Sayfa',
      href: '/dashboard',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      ),
    },
    {
      name: 'Projelerim',
      href: '/dashboard/projects',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4H3m16 8H1m18 4H7" />
        </svg>
      ),
    },
    {
      name: 'Raporlar',
      href: '/dashboard/reports',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      name: 'Ödemeler',
      href: '/dashboard/payments',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      name: 'Abonelik',
      href: '/dashboard/abonelik',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      name: 'Profil',
      href: '/dashboard/profile',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-800 px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/" className="flex items-center group">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center mr-3 animate-pulse-glow">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Mik Araştırma
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className={`
                            group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold transition-all duration-300
                            ${isActive
                              ? 'bg-gradient-primary text-white shadow-lg glow-blue'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                            }
                          `}
                        >
                          <span className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                            {item.icon}
                          </span>
                          {item.name}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>

          {/* Bottom section */}
          <div className="mt-auto">
            <Link
              href="/"
              className="group -mx-2 flex gap-x-3 rounded-xl p-3 text-sm font-semibold leading-6 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              <svg className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Ana Siteye Dön
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`
        lg:hidden fixed inset-y-0 z-50 flex w-64 flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-800 px-6 pb-4">
          {/* Mobile Header */}
          <div className="flex h-16 shrink-0 items-center justify-between">
            <Link href="/" className="flex items-center group">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Mik Araştırma
              </span>
            </Link>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={`
                            group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold transition-all duration-300
                            ${isActive
                              ? 'bg-gradient-primary text-white shadow-lg'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                            }
                          `}
                        >
                          <span className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                            {item.icon}
                          </span>
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>

          {/* Mobile Bottom section */}
          <div className="mt-auto">
            <Link
              href="/"
              className="group -mx-2 flex gap-x-3 rounded-xl p-3 text-sm font-semibold leading-6 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              <svg className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Ana Siteye Dön
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
