'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { mockSystemMetrics, mockUsers, mockAdminProjects, mockSecurityLogs } from '@/data/adminData';

const AdminStatsCard = ({ title, value, change, icon, color, href }: {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  color: string;
  href?: string;
}) => {
  const CardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1">
              <span className="font-medium">{change}</span> bu ay
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );

  return href ? <Link href={href}>{CardContent}</Link> : CardContent;
};

const QuickActionCard = ({ title, description, href, icon, color }: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}) => (
  <Link href={href}>
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`${color} rounded-lg p-6 text-white hover:shadow-lg cursor-pointer transition-all duration-200`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-white/20 rounded-lg">
          {icon}
        </div>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-white/80 text-sm">{description}</p>
    </motion.div>
  </Link>
);

export default function AdminDashboard() {
  const recentUsers = mockUsers.slice(0, 3);
  const pendingProjects = mockAdminProjects.filter(p => p.status === 'pending');
  const recentLogs = mockSecurityLogs.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-lg p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-slate-200 text-lg">
          Sistem durumu ve kritik metrikleri takip edin.
        </p>
      </motion.div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatsCard
          title="Toplam Kullanıcı"
          value={mockSystemMetrics.totalUsers}
          change="+12%"
          href="/admin/users"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          }
          color="bg-blue-500"
        />
        <AdminStatsCard
          title="Aktif Projeler"
          value={mockSystemMetrics.activeProjects}
          change="+5"
          href="/admin/projects"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4H3m16 8H1m18 4H7" />
            </svg>
          }
          color="bg-green-500"
        />
        <AdminStatsCard
          title="Aylık Gelir"
          value={`₺${mockSystemMetrics.monthlyRevenue.toLocaleString()}`}
          change="+18%"
          href="/admin/payments"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          }
          color="bg-purple-500"
        />
        <AdminStatsCard
          title="Sistem Uptime"
          value={`%${mockSystemMetrics.systemUptime}`}
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          }
          color="bg-emerald-500"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickActionCard
            title="Kullanıcı Ekle"
            description="Yeni kullanıcı hesabı oluştur"
            href="/admin/users"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            }
          />
          <QuickActionCard
            title="Proje Onayla"
            description={`${pendingProjects.length} proje onay bekliyor`}
            href="/admin/projects"
            color="bg-gradient-to-br from-orange-500 to-orange-600"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <QuickActionCard
            title="Sistem Raporu"
            description="Detaylı sistem analizi"
            href="/admin/analytics"
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />
          <QuickActionCard
            title="Güvenlik Logları"
            description="Son güvenlik olayları"
            href="/admin/security"
            color="bg-gradient-to-br from-red-500 to-red-600"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Son Kullanıcılar</h3>
              <Link href="/admin/users" className="text-sm text-blue-600 hover:text-blue-700">
                Tümünü Gör
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentUsers.map((user) => (
              <div key={user.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{user.name[0]}</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status === 'active' ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Security Logs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Güvenlik Logları</h3>
              <Link href="/admin/security" className="text-sm text-blue-600 hover:text-blue-700">
                Tümünü Gör
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentLogs.map((log) => (
              <div key={log.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        log.severity === 'critical' ? 'bg-red-500' :
                        log.severity === 'high' ? 'bg-orange-500' :
                        log.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <p className="text-sm font-medium text-gray-900">{log.details}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{log.user} - {log.ip}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(log.timestamp).toLocaleTimeString('tr-TR')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
