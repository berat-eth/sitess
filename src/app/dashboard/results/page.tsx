<<<<<<< HEAD
'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { resultsSummary, surveyResultsBreakdown } from '@/data/dashboardMockData';
import { TrendingUp, PieChart as PieChartIcon } from 'lucide-react';

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

export default function ResultsPage() {
  return (
    <div className="flex-1 overflow-auto bg-slate-50 min-h-screen">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">Sonuçlarım</h1>
          <p className="text-slate-600">Katıldığınız anketlerin sonuçları ve istatistikleri</p>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft"
          >
            <h2 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-2">
              <TrendingUp size={24} className="text-blue-600" />
              Memnuniyet Durumu
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resultsSummary}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="question" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                <Bar dataKey="satisfied" fill="#10b981" radius={[8, 8, 0, 0]} name="Memnun" />
                <Bar dataKey="neutral" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Nötr" />
                <Bar dataKey="unsatisfied" fill="#ef4444" radius={[8, 8, 0, 0]} name="Memnun Değil" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft flex flex-col"
          >
            <h2 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-2">
              <PieChartIcon size={24} className="text-purple-600" />
              Genel Dağılım
            </h2>

            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={surveyResultsBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {surveyResultsBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Genel Memnuniyet', value: '68%', color: 'from-green-400 to-green-600' },
            { label: 'Ortalama Puan', value: '4.2/5', color: 'from-blue-400 to-blue-600' },
            { label: 'Katılım Oranı', value: '87%', color: 'from-purple-400 to-purple-600' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft"
            >
              <p className="text-sm text-slate-600 mb-2">{item.label}</p>
              <p className={`text-3xl font-bold bg-gradient-to-r ${item.color} text-transparent bg-clip-text`}>
                {item.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-soft"
        >
          <h2 className="text-xl font-bold text-primary-900 mb-6">Detaylı Sonuçlar</h2>

          <div className="space-y-4">
            {resultsSummary.map((item, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-primary-900">{item.question}</p>
                  <span className="text-sm text-slate-600">Toplam: {item.satisfied + item.neutral + item.unsatisfied}</span>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-green-700">Memnun</span>
                      <span className="text-xs font-semibold text-green-700">{item.satisfied}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <motion.div
                        className="h-full rounded-full bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.satisfied}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-yellow-700">Nötr</span>
                      <span className="text-xs font-semibold text-yellow-700">{item.neutral}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <motion.div
                        className="h-full rounded-full bg-yellow-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.neutral}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.1 }}
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-red-700">Memnun Değil</span>
                      <span className="text-xs font-semibold text-red-700">{item.unsatisfied}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <motion.div
                        className="h-full rounded-full bg-red-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.unsatisfied}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
=======
'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { resultsSummary, surveyResultsBreakdown } from '@/data/dashboardMockData';
import { TrendingUp, PieChart as PieChartIcon } from 'lucide-react';

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

export default function ResultsPage() {
  return (
    <div className="flex-1 overflow-auto bg-slate-50 min-h-screen">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">Sonuçlarım</h1>
          <p className="text-slate-600">Katıldığınız anketlerin sonuçları ve istatistikleri</p>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft"
          >
            <h2 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-2">
              <TrendingUp size={24} className="text-blue-600" />
              Memnuniyet Durumu
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resultsSummary}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="question" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                <Bar dataKey="satisfied" fill="#10b981" radius={[8, 8, 0, 0]} name="Memnun" />
                <Bar dataKey="neutral" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Nötr" />
                <Bar dataKey="unsatisfied" fill="#ef4444" radius={[8, 8, 0, 0]} name="Memnun Değil" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft flex flex-col"
          >
            <h2 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-2">
              <PieChartIcon size={24} className="text-purple-600" />
              Genel Dağılım
            </h2>

            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={surveyResultsBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {surveyResultsBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Genel Memnuniyet', value: '68%', color: 'from-green-400 to-green-600' },
            { label: 'Ortalama Puan', value: '4.2/5', color: 'from-blue-400 to-blue-600' },
            { label: 'Katılım Oranı', value: '87%', color: 'from-purple-400 to-purple-600' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft"
            >
              <p className="text-sm text-slate-600 mb-2">{item.label}</p>
              <p className={`text-3xl font-bold bg-gradient-to-r ${item.color} text-transparent bg-clip-text`}>
                {item.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-soft"
        >
          <h2 className="text-xl font-bold text-primary-900 mb-6">Detaylı Sonuçlar</h2>

          <div className="space-y-4">
            {resultsSummary.map((item, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-primary-900">{item.question}</p>
                  <span className="text-sm text-slate-600">Toplam: {item.satisfied + item.neutral + item.unsatisfied}</span>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-green-700">Memnun</span>
                      <span className="text-xs font-semibold text-green-700">{item.satisfied}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <motion.div
                        className="h-full rounded-full bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.satisfied}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-yellow-700">Nötr</span>
                      <span className="text-xs font-semibold text-yellow-700">{item.neutral}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <motion.div
                        className="h-full rounded-full bg-yellow-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.neutral}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.1 }}
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-red-700">Memnun Değil</span>
                      <span className="text-xs font-semibold text-red-700">{item.unsatisfied}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <motion.div
                        className="h-full rounded-full bg-red-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.unsatisfied}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
>>>>>>> 4855e23d27390993c3739d0f6d832d04426b1d54
