'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { mockStats, mockProjects, getProjectStatusLabel, getProjectStatusColor } from '@/data/dashboardData';

const StatsCard = ({ title, value, change, icon, color }: {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  color: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover-lift"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        {change && (
          <p className="text-sm text-green-600 mt-1">
            <span className="font-medium">+{change}</span> bu ay
          </p>
        )}
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

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
      className={`${color} rounded-2xl p-6 text-white hover-lift cursor-pointer`}
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

export default function DashboardPage() {
  const recentProjects = mockProjects.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Hoş Geldiniz, Ahmet Kaya!</h1>
        <p className="text-blue-100 text-lg">
          Araştırma projelerinizi yönetin ve raporlarınıza erişin.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Toplam Proje"
          value={mockStats.totalProjects}
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4H3m16 8H1m18 4H7" />
            </svg>
          }
          color="bg-blue-500"
        />
        <StatsCard
          title="Aktif Projeler"
          value={mockStats.activeProjects}
          change="2"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
          color="bg-green-500"
        />
        <StatsCard
          title="Toplam Gelir"
          value={`₺${mockStats.totalRevenue.toLocaleString()}`}
          change={`${mockStats.monthlyGrowth}%`}
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          }
          color="bg-purple-500"
        />
        <StatsCard
          title="Bekleyen Ödemeler"
          value={mockStats.pendingPayments}
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="bg-orange-500"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickActionCard
            title="Yeni Proje Talebi"
            description="Araştırma projesi için teklif alın"
            href="/iletisim"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          />
          <QuickActionCard
            title="Raporları İncele"
            description="Hazır raporlarınızı görüntüleyin"
            href="/dashboard/reports"
            color="bg-gradient-to-br from-green-500 to-green-600"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
          <QuickActionCard
            title="Ödeme Durumu"
            description="Fatura ve ödemelerinizi kontrol edin"
            href="/dashboard/payments"
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Son Projeler</h2>
          <Link
            href="/dashboard/projects"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
          >
            Tümünü Gör
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {recentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover-lift"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getProjectStatusColor(project.status)}`}>
                  {getProjectStatusLabel(project.status)}
                </span>
                <span className="text-sm text-gray-500">
                  ₺{project.budget.toLocaleString()}
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {project.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">İlerleme</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{project.client}</span>
                  <span>{new Date(project.startDate).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
