'use client';

import { motion } from 'framer-motion';
import { mockUser, badges } from '@/data/dashboardMockData';
import { User, Mail, Calendar, Lock, Award } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="flex-1 overflow-auto bg-slate-50 min-h-screen">
      <div className="p-6 lg:p-8 max-w-4xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">Profilim</h1>
          <p className="text-slate-600">Hesap bilgilerinizi yönetin ve ayarları düzenleyin</p>
        </motion.div>

        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 border border-slate-100 shadow-soft mb-8"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-accent-200 mb-4">
                <img src={mockUser.avatar} alt={mockUser.name} className="w-full h-full object-cover" />
              </div>
              <button className="text-accent-600 hover:text-accent-700 font-medium text-sm">
                Fotoğrafı Değiştir
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-primary-900 mb-2">{mockUser.name}</h2>
              <p className="text-slate-600 mb-4">{mockUser.role}</p>
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                <div>
                  <p className="text-2xl font-bold text-accent-600">{mockUser.totalSurveys}</p>
                  <p className="text-xs text-slate-600">Toplam Katılım</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{mockUser.completedSurveys}</p>
                  <p className="text-xs text-slate-600">Tamamlanan</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{mockUser.points}</p>
                  <p className="text-xs text-slate-600">Puan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="border-t border-slate-200 pt-8 space-y-6">
            <h3 className="text-lg font-bold text-primary-900 flex items-center gap-2">
              <User size={20} /> Kişisel Bilgiler
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-900 mb-2">Ad Soyad</label>
                <input
                  type="text"
                  value={mockUser.name}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-900 mb-2 flex items-center gap-2">
                  <Mail size={16} /> E-posta
                </label>
                <input
                  type="email"
                  value={mockUser.email}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-900 mb-2 flex items-center gap-2">
                <Calendar size={16} /> Katılım Tarihi
              </label>
              <input
                type="text"
                value={mockUser.joinDate}
                readOnly
                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Security Section */}
          <div className="border-t border-slate-200 mt-8 pt-8">
            <h3 className="text-lg font-bold text-primary-900 flex items-center gap-2 mb-6">
              <Lock size={20} /> Güvenlik
            </h3>

            <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
              Şifreyi Değiştir
            </button>
          </div>
        </motion.div>

        {/* Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 20 }}
          className="bg-white rounded-2xl p-8 border border-slate-100 shadow-soft"
        >
          <h3 className="text-lg font-bold text-primary-900 mb-6 flex items-center gap-2">
            <Award size={20} /> Rozetler ve Başarılar
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {badges.map((badge) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: badge.id * 0.1 }}
                className={`flex flex-col items-center text-center p-4 rounded-lg border transition-all ${
                  badge.unlocked
                    ? 'bg-gradient-to-br from-accent-50 to-blue-50 border-accent-200 cursor-pointer hover:border-accent-400'
                    : 'bg-slate-100 border-slate-200 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <p className="text-xs font-semibold text-primary-900">{badge.name}</p>
                <p className="text-xs text-slate-600 mt-1">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
