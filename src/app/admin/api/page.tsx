'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockApiKeys, ApiKey } from '@/data/adminData';

const ApiKeyRow = ({ apiKey, index }: { apiKey: ApiKey; index: number }) => {
  const getStatusBadge = (status: ApiKey['status']) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Aktif</span>;
      case 'inactive':
        return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Pasif</span>;
      case 'expired':
        return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Süresi Dolmuş</span>;
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="hover:bg-gray-50 transition-colors duration-200"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <div className="text-sm font-medium text-gray-900">{apiKey.name}</div>
          <div className="text-sm text-gray-500 font-mono">{apiKey.key.substring(0, 20)}...</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getStatusBadge(apiKey.status)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {apiKey.requests.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {apiKey.rateLimit}/dakika
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(apiKey.createdAt).toLocaleDateString('tr-TR')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleDateString('tr-TR') : 'Hiç'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center gap-2 justify-end">
          <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" title="Düzenle">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200" title="Kopyala">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          {apiKey.status === 'active' ? (
            <button className="text-red-600 hover:text-red-900 transition-colors duration-200" title="Devre Dışı Bırak">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
              </svg>
            </button>
          ) : (
            <button className="text-green-600 hover:text-green-900 transition-colors duration-200" title="Etkinleştir">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          )}
        </div>
      </td>
    </motion.tr>
  );
};

export default function ApiPage() {
  const [filter, setFilter] = useState<'all' | ApiKey['status']>('all');

  const filteredApiKeys = mockApiKeys.filter(apiKey => {
    return filter === 'all' || apiKey.status === filter;
  });

  const statusCounts = {
    all: mockApiKeys.length,
    active: mockApiKeys.filter(k => k.status === 'active').length,
    inactive: mockApiKeys.filter(k => k.status === 'inactive').length,
    expired: mockApiKeys.filter(k => k.status === 'expired').length,
  };

  const totalRequests = mockApiKeys.reduce((sum, key) => sum + key.requests, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">API Yönetimi</h1>
          <p className="text-gray-600 mt-1">API anahtarları ve rate limiting ayarları</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
          Yeni API Key Oluştur
        </button>
      </motion.div>

      {/* API Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Toplam İstek</p>
              <p className="text-2xl font-bold text-blue-600">{totalRequests.toLocaleString()}</p>
            </div>
            <div className="text-blue-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Günlük İstek</p>
              <p className="text-2xl font-bold text-green-600">15.2K</p>
            </div>
            <div className="text-green-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Ortalama Yanıt</p>
              <p className="text-2xl font-bold text-purple-600">245ms</p>
            </div>
            <div className="text-purple-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Hata Oranı</p>
              <p className="text-2xl font-bold text-red-600">0.2%</p>
            </div>
            <div className="text-red-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Status Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
          <p className="text-sm text-gray-600">Toplam Key</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-green-600">{statusCounts.active}</p>
          <p className="text-sm text-gray-600">Aktif</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-gray-600">{statusCounts.inactive}</p>
          <p className="text-sm text-gray-600">Pasif</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-red-600">{statusCounts.expired}</p>
          <p className="text-sm text-gray-600">Süresi Dolmuş</p>
        </div>
      </motion.div>

      {/* API Keys Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        {/* Table Header with Filters */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-medium text-gray-900">API Anahtarları</h3>
            <div className="flex gap-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
                <option value="expired">Süresi Dolmuş</option>
              </select>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Rapor İndir
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  API Key
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İstekler
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate Limit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Oluşturulma
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Kullanım
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApiKeys.map((apiKey, index) => (
                <ApiKeyRow key={apiKey.id} apiKey={apiKey} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
