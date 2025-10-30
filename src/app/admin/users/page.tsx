'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockUsers, getUserRoleLabel, getUserStatusLabel, getUserStatusColor, User } from '@/data/adminData';

const UserRow = ({ user, index }: { user: User; index: number }) => (
  <motion.tr
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="hover:bg-gray-50 transition-colors duration-200"
  >
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-sm">{user.name[0]}</span>
        </div>
        <div className="ml-3">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
        {getUserRoleLabel(user.role)}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUserStatusColor(user.status)}`}>
        {getUserStatusLabel(user.status)}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {user.company || '-'}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {user.projects}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      ₺{user.totalSpent.toLocaleString()}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {new Date(user.lastLogin).toLocaleDateString('tr-TR')}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <div className="flex items-center gap-2 justify-end">
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
        {user.status !== 'suspended' && (
          <button className="text-red-600 hover:text-red-900 transition-colors duration-200" title="Askıya Al">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
            </svg>
          </button>
        )}
      </div>
    </td>
  </motion.tr>
);

export default function UsersPage() {
  const [filter, setFilter] = useState<'all' | User['role']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | User['status']>('all');

  const filteredUsers = mockUsers.filter(user => {
    const roleMatch = filter === 'all' || user.role === filter;
    const statusMatch = statusFilter === 'all' || user.status === statusFilter;
    return roleMatch && statusMatch;
  });

  const roleCounts = {
    all: mockUsers.length,
    admin: mockUsers.filter(u => u.role === 'admin').length,
    customer: mockUsers.filter(u => u.role === 'customer').length,
    researcher: mockUsers.filter(u => u.role === 'researcher').length,
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
          <h1 className="text-3xl font-bold text-gray-900">Kullanıcı Yönetimi</h1>
          <p className="text-gray-600 mt-1">Sistem kullanıcılarını yönetin ve izinlerini düzenleyin</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
          Yeni Kullanıcı Ekle
        </button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-gray-900">{roleCounts.all}</p>
          <p className="text-sm text-gray-600">Toplam Kullanıcı</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-blue-600">{roleCounts.admin}</p>
          <p className="text-sm text-gray-600">Yönetici</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-green-600">{roleCounts.customer}</p>
          <p className="text-sm text-gray-600">Müşteri</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-purple-600">{roleCounts.researcher}</p>
          <p className="text-sm text-gray-600">Araştırmacı</p>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        {/* Table Header with Filters */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-medium text-gray-900">Kullanıcı Listesi</h3>
            <div className="flex gap-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Roller</option>
                <option value="admin">Yönetici</option>
                <option value="customer">Müşteri</option>
                <option value="researcher">Araştırmacı</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
                <option value="suspended">Askıya Alındı</option>
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
                  Kullanıcı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Şirket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projeler
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harcama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Giriş
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <UserRow key={user.id} user={user} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Kullanıcı Bulunamadı</h3>
          <p className="text-gray-600">Seçilen filtrelere uygun kullanıcı bulunmuyor.</p>
        </motion.div>
      )}
    </div>
  );
}
