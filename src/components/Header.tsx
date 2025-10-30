'use client';

import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Hizmetler', href: '/hizmetler' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'Ekip', href: '/ekip' },
    { name: 'Referanslar', href: '/referanslar' },
    { name: 'Blog', href: '/blog' },
    { name: 'İletişim', href: '/iletisim' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center mr-3 animate-pulse-glow hover-glow transition-all duration-300">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mik Araştırma
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

                 {/* CTA Buttons */}
                 <div className="hidden md:flex items-center gap-3">
                   <Link
                     href="/dashboard"
                     className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover-lift"
                   >
                     Dashboard
                   </Link>
                   <Link
                     href="/admin"
                     className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover-lift"
                   >
                     Admin
                   </Link>
                   <Link
                     href="/iletisim"
                     className="bg-gradient-primary hover:bg-gradient-secondary text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover-lift glow-blue animate-gradient"
                   >
                     İletişime Geç
                   </Link>
                 </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Ana menüyü aç</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link
                  href="/dashboard"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin"
                  className="bg-slate-800 hover:bg-slate-900 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Panel
                </Link>
                <Link
                  href="/iletisim"
                  className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  İletişime Geç
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
