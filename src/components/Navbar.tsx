'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/surveys', label: 'Anketler' },
    { href: '/results', label: 'Sonuçlar' },
    { href: '/about', label: 'Hakkımızda' },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-white shadow-soft border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-2 rounded-lg">
              <BarChart3 className="text-white" size={24} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary-900 group-hover:text-primary-600 transition-colors">
                AraştırmaHub
              </h1>
              <p className="text-xs text-slate-500">Güvenilir Araştırmalar</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-700 font-medium hover:text-primary-600 transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            
            {/* Auth Buttons */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <Link href="/login" className="btn-secondary btn-small">
                Giriş Yap
              </Link>
              <Link href="/register" className="btn-primary btn-small">
                Kayıt Ol
              </Link>
              <Link href="/dashboard" className="btn-accent btn-small">
                Dashboard
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t border-slate-100 bg-white"
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            
            <div className="border-t border-slate-200 pt-3 mt-3 space-y-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block btn-secondary btn-small w-full text-center"
              >
                Giriş Yap
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="block btn-primary btn-small w-full text-center"
              >
                Kayıt Ol
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block btn-accent btn-small w-full text-center"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
