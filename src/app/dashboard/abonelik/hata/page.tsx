'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center"
      >
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Ödeme Hatası
        </h1>
        <p className="text-gray-600 mb-6">
          {error || 'Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyiniz.'}
        </p>

        <div className="space-y-3">
          <Link
            href="/dashboard/abonelik"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 hover:from-blue-700 hover:to-purple-700 block"
          >
            Tekrar Dene
          </Link>
          <Link
            href="/iletisim"
            className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-200 block"
          >
            Destek ile İletişime Geç
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function SubscriptionErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}

