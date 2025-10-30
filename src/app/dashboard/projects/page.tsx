'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockProjects, getProjectTypeLabel, getProjectStatusLabel, getProjectStatusColor, Project } from '@/data/dashboardData';

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-200"
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getProjectStatusColor(project.status)}`}>
            {getProjectStatusLabel(project.status)}
          </span>
          <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
            {getProjectTypeLabel(project.type)}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {project.description}
        </p>
      </div>
      <div className="text-right ml-4">
        <p className="text-lg font-bold text-gray-900">₺{project.budget.toLocaleString()}</p>
      </div>
    </div>

    <div className="space-y-2 mb-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">İlerleme</span>
        <span className="font-medium">{project.progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            project.status === 'completed' 
              ? 'bg-green-500'
              : project.status === 'active'
              ? 'bg-blue-500'
              : 'bg-gray-400'
          }`}
          style={{ width: `${project.progress}%` }}
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
      <div>
        <p className="text-gray-500">Müşteri</p>
        <p className="font-medium text-gray-900 truncate">{project.client}</p>
      </div>
      <div>
        <p className="text-gray-500">Başlangıç</p>
        <p className="font-medium text-gray-900">
          {new Date(project.startDate).toLocaleDateString('tr-TR')}
        </p>
      </div>
    </div>

    <div className="flex gap-2">
      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors duration-200">
        Detaylar
      </button>
      {project.status === 'active' && (
        <button className="px-3 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-sm font-medium transition-colors duration-200">
          Rapor
        </button>
      )}
    </div>
  </motion.div>
);

export default function ProjectsPage() {
  const [filter, setFilter] = useState<'all' | Project['status']>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | Project['type']>('all');

  const filteredProjects = mockProjects.filter(project => {
    const statusMatch = filter === 'all' || project.status === filter;
    const typeMatch = typeFilter === 'all' || project.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const statusCounts = {
    all: mockProjects.length,
    active: mockProjects.filter(p => p.status === 'active').length,
    completed: mockProjects.filter(p => p.status === 'completed').length,
    pending: mockProjects.filter(p => p.status === 'pending').length,
    cancelled: mockProjects.filter(p => p.status === 'cancelled').length,
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
          <h1 className="text-3xl font-bold text-gray-900">Projelerim</h1>
          <p className="text-gray-600 mt-1">Araştırma projelerinizi yönetin ve takip edin</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-gradient-primary hover:bg-gradient-secondary text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover-lift">
          Yeni Proje Talebi
        </button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
          <p className="text-sm text-gray-600">Toplam</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-blue-600">{statusCounts.active}</p>
          <p className="text-sm text-gray-600">Aktif</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-green-600">{statusCounts.completed}</p>
          <p className="text-sm text-gray-600">Tamamlandı</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
          <p className="text-sm text-gray-600">Beklemede</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-red-600">{statusCounts.cancelled}</p>
          <p className="text-sm text-gray-600">İptal</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 p-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="completed">Tamamlandı</option>
              <option value="pending">Beklemede</option>
              <option value="cancelled">İptal Edildi</option>
            </select>
          </div>
          <div className="flex-1">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm Türler</option>
              <option value="market">Pazar Araştırması</option>
              <option value="social">Sosyal Medya</option>
              <option value="health">Sağlık Araştırması</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

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
