'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import SurveyCard from '@/components/SurveyCard';
import { surveys, categories } from '@/data/mockData';
import { Filter } from 'lucide-react';

export default function SurveysPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Filtreleme
  const filteredSurveys = useMemo(() => {
    if (!selectedCategory) return surveys;
    return surveys.filter((survey) => survey.categoryId === selectedCategory);
  }, [selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
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
          <h1 className="section-title">Aktif Anketler</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Araştırmalarımıza katılın ve siz de veri oluşturucunun bir parçası olun
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <Filter size={20} className="text-primary-600" />
            <h3 className="text-lg font-semibold text-primary-900">Kategoriye Göre Filtrele</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* All Button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-primary-600 border-2 border-primary-200 hover:border-primary-400'
              }`}
            >
              Tüm Kategoriler ({surveys.length})
            </button>

            {/* Category Buttons */}
            {categories.map((category) => {
              const count = surveys.filter((s) => s.categoryId === category.id).length;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-accent-500 text-white shadow-lg'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-accent-400'
                  }`}
                >
                  {category.name} ({count})
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-600 mb-6 font-medium"
        >
          {filteredSurveys.length} anket bulundu
        </motion.p>

        {/* Surveys Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredSurveys.map((survey) => (
            <SurveyCard key={survey.id} {...survey} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredSurveys.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-slate-600 text-lg">
              Bu kategoride anket bulunmamaktadır.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
