'use client';

import { motion } from 'framer-motion';
import { 
  Activity, 
  CheckCircle2, 
  Star, 
  Award,
  TrendingUp,
  Clock,
  ArrowRight,
  Calendar,
  Users,
  Plus,
  Calculator,
  BarChart,
  FileText
} from 'lucide-react';
import { 
  dashboardStats, 
  activeSurveys, 
  recentActivity,
  mockUser 
} from '@/data/dashboardMockData';
import Link from 'next/link';

const iconMap: { [key: string]: any } = {
  activity: Activity,
  'check-circle': CheckCircle2,
  star: Star,
  award: Award,
};

const activityIconMap: { [key: string]: any } = {
  check: CheckCircle2,
  star: Star,
  award: Award,
  play: TrendingUp,
};

export default function DashboardHome() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="flex-1 overflow-auto bg-slate-50 min-h-screen">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-primary-900 mb-2">
            Şirket Paneli - {mockUser.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-slate-600">
            Müşteri geri bildirimlerini toplayın, analiz edin ve işinizi büyütün
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {dashboardStats.map((stat) => {
            const Icon = iconMap[stat.icon];
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft hover:shadow-corporate transition-all duration-300 group cursor-pointer"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-sm font-medium text-slate-600 group-hover:text-slate-700">
                    {stat.title}
                  </h3>
                  <div className={`p-2.5 rounded-lg bg-gradient-to-br ${stat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white" size={18} />
                  </div>
                </div>

                {/* Value */}
                <div className="mb-3">
                  <p className="text-3xl font-bold text-primary-900">{stat.value}</p>
                </div>

                {/* Change */}
                <div className="flex items-center gap-1">
                  <TrendingUp className="text-green-500" size={16} />
                  <span className="text-sm font-semibold text-green-600">
                    {stat.change}
                  </span>
                  <span className="text-xs text-slate-500">bu ay</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Surveys */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-soft"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-primary-900">Aktif Anketler</h2>
                <p className="text-sm text-slate-500">{activeSurveys.length} anket devam ediyor</p>
              </div>
              <Link href="/dashboard/surveys" className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-2">
                Tümünü Gör <ArrowRight size={16} />
              </Link>
            </div>

            <div className="space-y-4">
              {activeSurveys.map((survey, index) => {
                const isCompleted = survey.status === 'Tamamlandı';
                return (
                  <motion.div
                    key={survey.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-slate-50 to-white border border-slate-100 rounded-lg hover:border-accent-200 transition-all group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-primary-900 group-hover:text-accent-600 transition-colors">
                          {survey.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          {survey.respondents.toLocaleString()} katılımcı • {survey.category}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isCompleted
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {survey.status}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <motion.div
                        className={`h-full rounded-full ${
                          isCompleted
                            ? 'bg-gradient-to-r from-green-400 to-green-600'
                            : 'bg-gradient-to-r from-blue-400 to-blue-600'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${survey.progress}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      {survey.progress}% tamamlandı • Bitiş: {survey.dueDate}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Activity Sidebar */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft"
          >
            <h2 className="text-xl font-bold text-primary-900 mb-6">Son Aktivite</h2>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const ActivityIcon = activityIconMap[activity.icon];
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3 pb-4 border-b border-slate-100 last:border-0"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                        <ActivityIcon className="text-accent-600" size={18} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-primary-900">
                        {activity.title}
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {activity.description}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {activity.timestamp}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Link href="/dashboard/profile" className="mt-6 w-full block text-center py-2 text-accent-600 hover:text-accent-700 font-medium text-sm border border-accent-200 rounded-lg hover:bg-accent-50 transition-all">
              Tüm Aktiviteyi Gör
            </Link>
          </motion.div>
        </div>

        {/* Analysis Features Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-100 shadow-soft"
        >
          <h2 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-2">
            <Calculator size={24} className="text-primary-600" />
            Şirket Anket Sistemi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <Link href="/dashboard/surveys" className="group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-300 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                    <Plus className="h-5 w-5 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                    Müşteri Anketi Oluştur
                  </h3>
                </div>
                <p className="text-sm text-slate-600">
                  Müşteri memnuniyeti ve geri bildirim anketleri oluşturun
                </p>
              </motion.div>
            </Link>

            <Link href="/dashboard/analysis" className="group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-accent-300 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-accent-100 rounded-lg group-hover:bg-accent-200 transition-colors">
                    <BarChart className="h-5 w-5 text-accent-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-accent-600 transition-colors">
                    Veri Analizi
                  </h3>
                </div>
                <p className="text-sm text-slate-600">
                  Müşteri geri bildirimlerini analiz edin ve raporlar oluşturun
                </p>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Badges Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-soft"
        >
          <h2 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-2">
            <Award size={24} className="text-accent-600" />
            Kazanılan Rozetler
          </h2>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {mockUser.badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-4 bg-gradient-to-br from-accent-50 to-blue-50 rounded-lg border border-accent-100 hover:border-accent-300 transition-all"
              >
                <div className="text-4xl mb-2">🏆</div>
                <p className="text-xs font-semibold text-primary-900">{badge}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
