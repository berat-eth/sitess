'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { surveyResults, surveyQuestions } from '@/data/mockData';

const COLORS = ['#406eb4', '#f97316', '#10b981', '#8b5cf6', '#ef4444'];

export default function ResultsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="section-title">Anket Sonuçları</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Yapılan araştırmaların analizleri ve detaylı istatistikler
          </p>
        </motion.div>

        {/* Results Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {Object.entries(surveyResults).map((entry, index) => {
            const questionId = parseInt(entry[0]);
            const data = entry[1];
            const question = surveyQuestions.find((q) => q.id === questionId);

            if (!question) return null;

            return (
              <motion.div
                key={questionId}
                variants={itemVariants}
                className="card p-8"
              >
                <h3 className="text-2xl font-bold text-primary-900 mb-6">
                  {index + 1}. {question.question}
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Bar Chart */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6"
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                          dataKey="label"
                          stroke="#64748b"
                          style={{ fontSize: '12px' }}
                          tick={{ fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis stroke="#64748b" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                          }}
                        />
                        <Bar dataKey="percentage" fill="#f97316" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="space-y-4">
                      {data.map((item, idx) => (
                        <div key={item.label} className="group">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-slate-700">
                              {item.label}
                            </span>
                            <span className="text-sm font-bold text-primary-600">
                              {item.percentage}% ({item.value} kişi)
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full`}
                              style={{
                                backgroundColor: COLORS[idx % COLORS.length],
                              }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.percentage}%` }}
                              transition={{ duration: 0.8, delay: idx * 0.1 }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Summary Stats */}
                    <div className="mt-8 pt-8 border-t border-slate-200">
                      <h4 className="font-bold text-slate-700 mb-3">İstatistikler</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-primary-50 rounded-lg p-4">
                          <p className="text-xs text-slate-600 mb-1">Toplam Yanıt</p>
                          <p className="text-2xl font-bold text-primary-600">
                            {data.reduce((sum, item) => sum + item.value, 0)}
                          </p>
                        </div>
                        <div className="bg-accent-50 rounded-lg p-4">
                          <p className="text-xs text-slate-600 mb-1">Seçenek Sayısı</p>
                          <p className="text-2xl font-bold text-accent-600">
                            {data.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 card p-8 bg-gradient-to-r from-primary-50 to-accent-50 text-center"
        >
          <h3 className="text-2xl font-bold text-primary-900 mb-4">
            Sonuçlara Katıl
          </h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Henüz anketimize katılmadıysanız, hemen katılın ve siz de bu istatistikleri şekillendiren kişilerin arasında yer alın.
          </p>
          <a href="/surveys" className="btn-accent">
            Anketlere Katıl
          </a>
        </motion.div>
      </div>
    </div>
  );
}
