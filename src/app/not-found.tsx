'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight">
              4<span className="text-blue-600">0</span>4
            </h1>
            <p className="mt-4 text-2xl font-semibold text-slate-800">
              Aradığınız sayfayı bulamadık.
            </p>
            <p className="mt-3 text-slate-600">
              Bağlantı yanlış olabilir ya da sayfa taşınmış olabilir. Aşağıdaki seçeneklerle devam edebilirsiniz.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                Ana Sayfaya Dön
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-white"
              >
                Dashboard
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl bg-white p-8 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="text-sm text-slate-400">mikarastirma.com</span>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-3/4 rounded bg-slate-200" />
                <div className="h-3 w-2/3 rounded bg-slate-200" />
                <div className="h-3 w-5/6 rounded bg-slate-200" />
                <div className="h-3 w-1/2 rounded bg-slate-200" />
              </div>
              <div className="mt-6 h-40 rounded-xl bg-gradient-to-r from-blue-200/40 via-purple-200/40 to-pink-200/40" />
            </div>

            <motion.div
              className="absolute -top-6 -right-6 rounded-xl bg-blue-600 px-4 py-3 text-white shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-sm">Hata Kodu</div>
              <div className="text-2xl font-bold">404</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 rounded-xl bg-green-500 px-4 py-3 text-white shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-sm">Destek</div>
              <div className="text-2xl font-bold">24/7</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute -top-10 -left-10 h-28 w-28 rounded-full bg-blue-200/50"
        animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-purple-200/50"
        animate={{ scale: [1, 1.1, 1], rotate: [360, 180, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
    </section>
  );
}


