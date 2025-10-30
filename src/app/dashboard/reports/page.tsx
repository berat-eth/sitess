'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockReports, mockProjects, Report } from '@/data/dashboardData';

const ReportRow = ({ report, index }: { report: Report; index: number }) => {
  const project = mockProjects.find(p => p.id === report.projectId);
  
  const getFileIcon = (type: Report['type']) => {
    switch (type) {
      case 'pdf':
        return <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>;
      case 'excel':
        return <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>;
      case 'powerpoint':
        return <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 16h14l-2-16" />
          </svg>
        </div>;
    }
  };

  const getStatusBadge = (status: Report['status']) => {
    switch (status) {
      case 'ready':
        return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Hazır</span>;
      case 'processing':
        return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">İşleniyor</span>;
      case 'failed':
        return <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Hata</span>;
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
        <div className="flex items-center">
          {getFileIcon(report.type)}
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">{report.title}</div>
            <div className="text-sm text-gray-500">{project?.title || 'Proje bulunamadı'}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{report.size}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getStatusBadge(report.status)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(report.createdAt).toLocaleDateString('tr-TR')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center gap-2 justify-end">
          {report.status === 'ready' ? (
            <>
              <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" title="İndir">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200" title="Önizle">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </>
          ) : report.status === 'processing' ? (
            <span className="text-sm text-gray-500">İşleniyor...</span>
          ) : (
            <button className="text-red-600 hover:text-red-900 transition-colors duration-200" title="Yeniden Oluştur">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}
        </div>
      </td>
    </motion.tr>
  );
};

export default function ReportsPage() {
  const [filter, setFilter] = useState<'all' | Report['status']>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | Report['type']>('all');

  const filteredReports = mockReports.filter(report => {
    const statusMatch = filter === 'all' || report.status === filter;
    const typeMatch = typeFilter === 'all' || report.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const statusCounts = {
    all: mockReports.length,
    ready: mockReports.filter(r => r.status === 'ready').length,
    processing: mockReports.filter(r => r.status === 'processing').length,
    failed: mockReports.filter(r => r.status === 'failed').length,
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
          <h1 className="text-3xl font-bold text-gray-900">Raporlar</h1>
          <p className="text-gray-600 mt-1">Araştırma raporlarınızı görüntüleyin ve indirin</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-gradient-primary hover:bg-gradient-secondary text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover-lift">
          Rapor Talep Et
        </button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
          <p className="text-sm text-gray-600">Toplam Rapor</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-green-600">{statusCounts.ready}</p>
          <p className="text-sm text-gray-600">Hazır</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-yellow-600">{statusCounts.processing}</p>
          <p className="text-sm text-gray-600">İşleniyor</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-red-600">{statusCounts.failed}</p>
          <p className="text-sm text-gray-600">Hata</p>
        </div>
      </motion.div>

      {/* Reports Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        {/* Table Header with Filters */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-medium text-gray-900">Rapor Listesi</h3>
            <div className="flex gap-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="ready">Hazır</option>
                <option value="processing">İşleniyor</option>
                <option value="failed">Hata</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Türler</option>
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="powerpoint">PowerPoint</option>
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
                  Rapor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Boyut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Oluşturulma
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report, index) => (
                <ReportRow key={report.id} report={report} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {filteredReports.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Rapor Bulunamadı</h3>
          <p className="text-gray-600">Seçilen filtrelere uygun rapor bulunmuyor.</p>
        </motion.div>
      )}
    </div>
  );
}
