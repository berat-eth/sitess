'use client';

import { motion } from 'framer-motion';
import { BarChart3, Users, TrendingUp, Lightbulb } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Pazar Araştırmaları',
    description: 'Pazarın dinamiklerini, tüketici davranışlarını ve kompetitor analizi yaparak stratejik kararlar verebilirsiniz.',
    icon: BarChart3,
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: 2,
    title: 'Müşteri Anketleri',
    description: 'Müşteri memnuniyetini ölçün, beklentilerini anlayın ve hizmet kalitesini geliştirin.',
    icon: Users,
    color: 'from-purple-400 to-purple-600',
  },
  {
    id: 3,
    title: 'Kamuoyu Yoklamaları',
    description: 'Toplumun görüşlerini objektif olarak ölçün ve kamusal konularda veri temelli perspektif elde edin.',
    icon: TrendingUp,
    color: 'from-green-400 to-green-600',
  },
  {
    id: 4,
    title: 'Marka & İnovasyon',
    description: 'Marka algınızı değerlendirin, yeni ürün fikirlerinizi test edin ve pazar talebi analiz edin.',
    icon: Lightbulb,
    color: 'from-orange-400 to-orange-600',
  },
];

export default function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Hizmetlerimiz</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Her türlü araştırma ihtiyacınız için kapsamlı ve profesyonel çözümler sunuyoruz
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="card p-8 card-hover group"
              >
                {/* Icon */}
                <div
                  className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform`}
                >
                  <IconComponent className="text-white" size={32} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-primary-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Link */}
                <div className="mt-6">
                  <a
                    href="/surveys"
                    className="inline-flex items-center text-accent-500 font-semibold group/link"
                  >
                    Daha Fazla Bilgi
                    <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
