'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockSecurityLogs, SecurityLog } from '@/data/adminData';

const SecurityLogRow = ({ log, index }: { log: SecurityLog; index: number }) => {
  const getEventIcon = (event: SecurityLog['event']) => {
    switch (event) {
      case 'login':
        return <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        </div>;
      case 'logout':
        return <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>;
      case 'failed_login':
        return <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>;
      case 'data_access':
        return <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>;
      case 'system_change':
        return <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>;
    }
  };

  const getSeverityBadge = (severity: SecurityLog['severity']) => {
    switch (severity) {
      case 'critical':
        return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Kritik</span>;
      case 'high':
        return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">Yüksek</span>;
      case 'medium':
        return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Orta</span>;
      case 'low':
        return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Düşük</span>;
    }
  };

  const getEventLabel = (event: SecurityLog['event']) => {
    const labels = {
      login: 'Giriş',
      logout: 'Çıkış',
      failed_login: 'Başarısız Giriş',
      data_access: 'Veri Erişimi',
      system_change: 'Sistem Değişikliği'
    };
    return labels[event];
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="hover:bg-gray-50 transition-colors duration-200"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {getEventIcon(log.event)}
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">{getEventLabel(log.event)}</div>
            <div className="text-sm text-gray-500">{log.details}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{log.user}</div>
        <div className="text-sm text-gray-500">{log.ip}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getSeverityBadge(log.severity)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div>{new Date(log.timestamp).toLocaleDateString('tr-TR')}</div>
        <div className="text-gray-500">{new Date(log.timestamp).toLocaleTimeString('tr-TR')}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center gap-2 justify-end">
          <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" title="Detayları Gör">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          {log.severity === 'critical' || log.severity === 'high' ? (
            <button className="text-red-600 hover:text-red-900 transition-colors duration-200" title="Engelle">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
              </svg>
            </button>
          ) : null}
        </div>
      </td>
    </motion.tr>
  );
};

export default function SecurityPage() {
  const [filter, setFilter] = useState<'all' | SecurityLog['severity']>('all');
  const [eventFilter, setEventFilter] = useState<'all' | SecurityLog['event']>('all');

  const filteredLogs = mockSecurityLogs.filter(log => {
    const severityMatch = filter === 'all' || log.severity === filter;
    const eventMatch = eventFilter === 'all' || log.event === eventFilter;
    return severityMatch && eventMatch;
  });

  const severityCounts = {
    all: mockSecurityLogs.length,
    critical: mockSecurityLogs.filter(l => l.severity === 'critical').length,
    high: mockSecurityLogs.filter(l => l.severity === 'high').length,
    medium: mockSecurityLogs.filter(l => l.severity === 'medium').length,
    low: mockSecurityLogs.filter(l => l.severity === 'low').length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Güvenlik</h1>
          <p className="text-gray-600 mt-1">Güvenlik logları ve sistem olaylarını izleyin</p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
            Acil Durum
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
            Log İndir
          </button>
        </div>
      </motion.div>

      {/* Security Status Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Sistem Durumu</p>
              <p className="text-2xl font-bold text-green-600">Güvenli</p>
            </div>
            <div className="text-green-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Aktif Oturumlar</p>
              <p className="text-2xl font-bold text-blue-600">247</p>
            </div>
            <div className="text-blue-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Başarısız Girişler</p>
              <p className="text-2xl font-bold text-yellow-600">12</p>
            </div>
            <div className="text-yellow-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Engellenen IP</p>
              <p className="text-2xl font-bold text-red-600">3</p>
            </div>
            <div className="text-red-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Severity Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-gray-900">{severityCounts.all}</p>
          <p className="text-sm text-gray-600">Toplam Log</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-red-600">{severityCounts.critical}</p>
          <p className="text-sm text-gray-600">Kritik</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-orange-600">{severityCounts.high}</p>
          <p className="text-sm text-gray-600">Yüksek</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-yellow-600">{severityCounts.medium}</p>
          <p className="text-sm text-gray-600">Orta</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-green-600">{severityCounts.low}</p>
          <p className="text-sm text-gray-600">Düşük</p>
        </div>
      </motion.div>

      {/* Security Logs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        {/* Table Header with Filters */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-medium text-gray-900">Güvenlik Logları</h3>
            <div className="flex gap-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Seviyeler</option>
                <option value="critical">Kritik</option>
                <option value="high">Yüksek</option>
                <option value="medium">Orta</option>
                <option value="low">Düşük</option>
              </select>
              <select
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Olaylar</option>
                <option value="login">Giriş</option>
                <option value="logout">Çıkış</option>
                <option value="failed_login">Başarısız Giriş</option>
                <option value="data_access">Veri Erişimi</option>
                <option value="system_change">Sistem Değişikliği</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Olay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı / IP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seviye
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zaman
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log, index) => (
                <SecurityLogRow key={log.id} log={log} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
