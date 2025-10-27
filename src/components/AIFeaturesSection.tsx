'use client';

import { motion } from 'framer-motion';
import { Brain, Zap, BarChart4, MessageSquare, TrendingUp, Lock } from 'lucide-react';

const aiFeatures = [
  {
    id: 1,
    title: 'Akıllı Veri Analizi',
    description: 'Yapay zeka destekli algoritmaları kullanarak anket sonuçlarını otomatik olarak analiz edin',
    icon: Brain,
    color: 'from-blue-400 to-blue-600',
    benefits: ['İstatistiksel İçgörüler', 'Trend Tespiti', 'Anomali Algılama'],
  },
  {
    id: 2,
    title: 'Akıllı Anket Önerisi',
    description: 'AI algoritması, verilerinize göre en uygun anket türlerini önerir',
    icon: Zap,
    color: 'from-yellow-400 to-yellow-600',
    benefits: ['Otomatik Soru Oluşturma', 'Hedef Kitlesi Belirleme', 'Zaman Optimizasyonu'],
  },
  {
    id: 3,
    title: 'Gerçek Zamanlı Raporlama',
    description: 'Yapay zeka ile güçlendirilmiş otomatik raporlama sistemi',
    icon: BarChart4,
    color: 'from-purple-400 to-purple-600',
    benefits: ['Dinamik Grafikler', 'Özel Raporlar', 'Otomatik Güncelleme'],
  },
  {
    id: 4,
    title: 'Doğal Dil İşleme',
    description: 'Açık uçlu yanıtları anlayarak kelime bulutu ve tema analizi yapın',
    icon: MessageSquare,
    color: 'from-pink-400 to-pink-600',
    benefits: ['Duygu Analizi', 'Kelime Bulutu', 'Tema Gruplandırması'],
  },
  {
    id: 5,
    title: 'Tahmin Modelleri',
    description: 'Makine öğrenmesi modelleriyle gelecekteki trendleri tahmin edin',
    icon: TrendingUp,
    color: 'from-green-400 to-green-600',
    benefits: ['Davranış Tahmini', 'Satış Projeksiyonu', 'Pazar Trendleri'],
  },
  {
    id: 6,
    title: 'Güvenli İşleme',
    description: 'Açık kaynak AI modelleriniz tamamen özel ortamda çalışır',
    icon: Lock,
    color: 'from-red-400 to-red-600',
    benefits: ['Veri Gizliliği', 'Şifreleme', 'Uyum Sertifikaları'],
  },
];

export default function AIFeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="py-20 md:py-32 bg-gradient-to-b from-slate-900 to-primary-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-accent-500 bg-opacity-20 text-accent-300 rounded-full text-sm font-medium border border-accent-400 border-opacity-30">
              🤖 Yapay Zeka Destekli
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Yapay Zeka ile <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-accent-400">Güçlendirilmiş</span> Araştırmalar
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Yapay zeka teknolojisini kullanarak anketleri daha akıllı, daha hızlı ve daha etkili hale getirin
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {aiFeatures.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className="group bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 border border-white border-opacity-20 hover:border-opacity-40 transition-all duration-300 hover:bg-opacity-20"
              >
                {/* Icon */}
                <div
                  className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform`}
                >
                  <IconComponent className="text-white" size={32} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent-300 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2">
                  {feature.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent-400 rounded-full" />
                      <span className="text-sm text-slate-200">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-slate-300 mb-6">
            Yapay zeka özelliklerini kullanarak araştırmalarınızı sonraki seviyeye taşıyın
          </p>
          <a href="/surveys" className="btn-accent inline-block group">
            Şimdi Başla
            <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
