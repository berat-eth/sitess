'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const pricingPlans = [
  {
    id: 1,
    name: 'Başlangıç',
    price: '₺999',
    period: '/ay',
    description: 'Küçük işletmeler ve bireysel kullanıcılar için',
    features: [
      { name: 'Aylık 5 Anket', included: true },
      { name: 'Temel Analiz', included: true },
      { name: 'E-posta Desteği', included: true },
      { name: 'Maksimum 1.000 Katılımcı', included: true },
      { name: 'Temel Raporlar', included: true },
      { name: 'API Erişimi', included: false },
      { name: 'Yapay Zeka Özellikleri', included: false },
      { name: '24/7 Telefon Desteği', included: false },
    ],
    highlighted: false,
    buttonText: 'Başla',
    buttonColor: 'btn-secondary',
  },
  {
    id: 2,
    name: 'Profesyonel',
    price: '₺2.999',
    period: '/ay',
    description: 'Orta ölçekli işletmeler ve araştırmacılar için',
    features: [
      { name: 'Aylık 50 Anket', included: true },
      { name: 'Gelişmiş Analiz', included: true },
      { name: 'Öncelikli Destek', included: true },
      { name: 'Maksimum 50.000 Katılımcı', included: true },
      { name: 'Özel Raporlar', included: true },
      { name: 'API Erişimi', included: true },
      { name: 'Yapay Zeka Özellikleri (Sınırlı)', included: true },
      { name: '24/7 Telefon Desteği', included: false },
    ],
    highlighted: true,
    buttonText: 'En Popüler',
    buttonColor: 'btn-accent',
  },
  {
    id: 3,
    name: 'Kurumsal',
    price: 'Özel Fiyat',
    period: '',
    description: 'Büyük işletmeler ve kurumlar için özel çözümler',
    features: [
      { name: 'Sınırsız Anket', included: true },
      { name: 'Tam Analiz Paketi', included: true },
      { name: 'Özel Hesap Müdürü', included: true },
      { name: 'Sınırsız Katılımcı', included: true },
      { name: 'Kustom Raporlar', included: true },
      { name: 'API Erişimi', included: true },
      { name: 'Tüm Yapay Zeka Özellikleri', included: true },
      { name: '24/7 Telefon Desteği', included: true },
    ],
    highlighted: false,
    buttonText: 'İletişim Al',
    buttonColor: 'btn-primary',
  },
];

export default function PricingSection() {
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
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            💰 Şeffaf Fiyatlandırma
          </span>
          <h2 className="section-title">Herkesin Bütçesi İçin Bir Plan</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Basit, şeffaf fiyatlandırma. Gizli ücret yok. İstedikten sonra iptal edin.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              className={`relative rounded-xl transition-all duration-300 ${
                plan.highlighted
                  ? 'card card-hover md:scale-105 shadow-corporate border-2 border-accent-500 md:z-10'
                  : 'card card-hover'
              } p-8 flex flex-col`}
            >
              {/* Highlighted Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-block px-4 py-1 bg-accent-500 text-white rounded-full text-sm font-bold">
                    ⭐ ÖNERİLEN
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-600 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-bold text-primary-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-slate-600 font-medium">{plan.period}</span>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <button
                className={`${plan.buttonColor} w-full mb-8 text-lg`}
              >
                {plan.buttonText}
              </button>

              {/* Features List */}
              <div className="space-y-4 flex-1 mb-8">
                <p className="text-sm font-semibold text-slate-700 mb-4">
                  Neleri İçerir:
                </p>
                {plan.features.map((feature) => (
                  <div key={feature.name} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {feature.included ? (
                        <Check className="text-green-500" size={20} />
                      ) : (
                        <X className="text-slate-300" size={20} />
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        feature.included
                          ? 'text-slate-700 font-medium'
                          : 'text-slate-400'
                      }`}
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200 pt-6">
                <p className="text-xs text-slate-500 text-center">
                  Hiçbir kredi kartı gerekli değil. 14 gün ücretsiz deneme.
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-primary-50 rounded-lg p-8 md:p-12"
        >
          <h3 className="text-2xl font-bold text-primary-900 mb-4">
            Doğru Planı Seçmekte Yardıma mı İhtiyacınız var?
          </h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Uzmanlık konuları uzmanlarımız, ihtiyaçlarınız için en uygun planı bulmanıza yardımcı olmaktan mutlu olur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/about" className="btn-primary">
              Bize Ulaşın
            </a>
            <button className="btn-secondary">
              Canlı Demo İste
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
