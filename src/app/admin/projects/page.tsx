'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockAdminProjects, getProjectStatusLabel, getProjectStatusColor, getPriorityLabel, getPriorityColor, AdminProject } from '@/data/adminData';

const ProjectRow = ({ project, index }: { project: AdminProject; index: number }) => (
  <motion.tr
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="hover:bg-gray-50 transition-colors duration-200"
  >
    <td className="px-6 py-4 whitespace-nowrap">
      <div>
        <div className="text-sm font-medium text-gray-900">{project.title}</div>
        <div className="text-sm text-gray-500">{project.client}</div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProjectStatusColor(project.status)}`}>
        {getProjectStatusLabel(project.status)}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(project.priority)}`}>
        {getPriorityLabel(project.priority)}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      ₺{project.budget.toLocaleString()}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      <div className="flex items-center">
        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <span className="text-xs">{project.progress}%</span>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {project.assignedTo || '-'}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {new Date(project.startDate).toLocaleDateString('tr-TR')}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <div className="flex items-center gap-2 justify-end">
        {project.status === 'pending' && (
          <>
            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200">
              Onayla
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200">
              Reddet
            </button>
          </>
        )}
        <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" title="Düzenle">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200" title="Görüntüle">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>
    </td>
  </motion.tr>
);

export default function AdminProjectsPage() {
  const [filter, setFilter] = useState<'all' | AdminProject['status']>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | AdminProject['priority']>('all');

  const filteredProjects = mockAdminProjects.filter(project => {
    const statusMatch = filter === 'all' || project.status === filter;
    const priorityMatch = priorityFilter === 'all' || project.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const statusCounts = {
    all: mockAdminProjects.length,
    pending: mockAdminProjects.filter(p => p.status === 'pending').length,
    approved: mockAdminProjects.filter(p => p.status === 'approved').length,
    active: mockAdminProjects.filter(p => p.status === 'active').length,
    completed: mockAdminProjects.filter(p => p.status === 'completed').length,
    rejected: mockAdminProjects.filter(p => p.status === 'rejected').length,
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
          <h1 className="text-3xl font-bold text-gray-900">Proje Yönetimi</h1>
          <p className="text-gray-600 mt-1">Tüm projeleri yönetin, onaylayın ve takip edin</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
          Yeni Proje Oluştur
        </button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-6 gap-4"
      >
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
          <p className="text-sm text-gray-600">Toplam</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
          <p className="text-sm text-gray-600">Bekleyen</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-blue-600">{statusCounts.approved}</p>
          <p className="text-sm text-gray-600">Onaylı</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-green-600">{statusCounts.active}</p>
          <p className="text-sm text-gray-600">Aktif</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-gray-600">{statusCounts.completed}</p>
          <p className="text-sm text-gray-600">Tamamlanan</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-red-600">{statusCounts.rejected}</p>
          <p className="text-sm text-gray-600">Reddedilen</p>
        </div>
      </motion.div>

      {/* Projects Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        {/* Table Header with Filters */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-medium text-gray-900">Proje Listesi</h3>
            <div className="flex gap-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="pending">Onay Bekliyor</option>
                <option value="approved">Onaylandı</option>
                <option value="active">Aktif</option>
                <option value="completed">Tamamlandı</option>
                <option value="rejected">Reddedildi</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Öncelikler</option>
                <option value="urgent">Acil</option>
                <option value="high">Yüksek</option>
                <option value="medium">Orta</option>
                <option value="low">Düşük</option>
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
                  Proje
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Öncelik
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bütçe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İlerleme
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Atanan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başlangıç
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjects.map((project, index) => (
                <ProjectRow key={project.id} project={project} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4H3m16 8H1m18 4H7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Proje Bulunamadı</h3>
          <p className="text-gray-600">Seçilen filtrelere uygun proje bulunmuyor.</p>
        </motion.div>
      )}
    </div>
  );
}
