<<<<<<< HEAD
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Shield, Zap, Heart } from 'lucide-react';
import { aboutUs } from '@/data/mockData';

export default function AboutSectionPreview() {
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <p className="text-accent-600 font-semibold mb-2">Biz Kimiz?</p>
              <h2 className="section-title">Araştırmada Güvenin Adı</h2>
            </div>

            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              15 yıldan fazla deneyimle, Türkiye&apos;nin en güvenilir araştırma platformu olarak hizmet vermekteyiz.
              Binlerce işletmeye ve kuruma veri temelli kararlar almalarında yardımcı olmuşuz.
            </p>

            {/* Values */}
            <motion.div className="space-y-4 mb-8">
              {aboutUs.values.slice(0, 2).map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="p-2 bg-accent-100 rounded-lg mt-0.5">
                    <Check className="text-accent-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-900">{value.title}</h4>
                    <p className="text-slate-600 text-sm">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <Link href="/about" className="btn-primary group inline-flex items-center gap-2">
              Hakkımızda Devamını Oku
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {/* Card 1 */}
            <div className="card p-8 text-center">
              <div className="inline-flex p-4 bg-blue-100 rounded-lg mb-4">
                <Shield className="text-blue-600" size={32} />
              </div>
              <h4 className="font-bold text-primary-900 mb-2">Güvenilir</h4>
              <p className="text-sm text-slate-600">
                En yüksek veri güvenliği standartlarını uyguluyoruz
              </p>
            </div>

            {/* Card 2 */}
            <div className="card p-8 text-center">
              <div className="inline-flex p-4 bg-green-100 rounded-lg mb-4">
                <Zap className="text-green-600" size={32} />
              </div>
              <h4 className="font-bold text-primary-900 mb-2">Hızlı</h4>
              <p className="text-sm text-slate-600">
                Anket sonuçlarını gerçek zamanda görüntüleyin
              </p>
            </div>

            {/* Card 3 */}
            <div className="card p-8 text-center">
              <div className="inline-flex p-4 bg-purple-100 rounded-lg mb-4">
                <Heart className="text-purple-600" size={32} />
              </div>
              <h4 className="font-bold text-primary-900 mb-2">Detaylı</h4>
              <p className="text-sm text-slate-600">
                Kapsamlı analiz ve raporlama yapıyoruz
              </p>
            </div>

            {/* Card 4 */}
            <div className="card p-8 text-center">
              <div className="inline-flex p-4 bg-orange-100 rounded-lg mb-4">
                <Check className="text-orange-600" size={32} />
              </div>
              <h4 className="font-bold text-primary-900 mb-2">Profesyonel</h4>
              <p className="text-sm text-slate-600">
                Deneyimli uzman ekibimiz her zaman hazır
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
=======
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Shield, Zap, Heart } from 'lucide-react';
import { aboutUs } from '@/data/mockData';

export default function AboutSectionPreview() {
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <p className="text-accent-600 font-semibold mb-2">Biz Kimiz?</p>
              <h2 className="section-title">Araştırmada Güvenin Adı</h2>
            </div>

            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              15 yıldan fazla deneyimle, Türkiye'nin en güvenilir araştırma platformu olarak hizmet vermekteyiz.
              Binlerce işletmeye ve kuruma veri temelli kararlar almalarında yardımcı olmuşuz.
            </p>

            {/* Values */}
            <motion.div className="space-y-4 mb-8">
              {aboutUs.values.slice(0, 2).map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="p-2 bg-accent-100 rounded-lg mt-0.5">
                    <Check className="text-accent-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-900">{value.title}</h4>
                    <p className="text-slate-600 text-sm">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <Link href="/about" className="btn-primary group inline-flex items-center gap-2">
              Hakkımızda Devamını Oku
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {/* Card 1 */}
            <div className="card p-8 text-center">
              <div className="inline-flex p-4 bg-blue-100 rounded-lg mb-4">
                <Shield className="text-blue-600" size={32} />
              </div>
              <h4 className="font-bold text-primary-900 mb-2">Güvenilir</h4>
              <p className="text-sm text-slate-600">
                En yüksek veri güvenliği standartlarını uyguluyoruz
              </p>
            </div>

            {/* Card 2 */}
            <div className="card p-8 text-center">
              <div className="inline-flex p-4 bg-green-100 rounded-lg mb-4">
                <Zap className="text-green-600" size={32} />
              </div>
              <h4 className="font-bold text-primary-900 mb-2">Hızlı</h4>
              <p className="text-sm text-slate-600">
                Anket sonuçlarını gerçek zamanda görüntüleyin
              </p>
            </div>

            {/* Card 3 */}
            <div className="card p-8 text-center">
              <div className="inline-flex p-4 bg-purple-100 rounded-lg mb-4">
                <Heart className="text-purple-600" size={32} />
              </div>
              <h4 className="font-bold text-primary-900 mb-2">Detaylı</h4>
              <p className="text-sm text-slate-600">
                Kapsamlı analiz ve raporlama yapıyoruz
              </p>
            </div>

            {/* Card 4 */}
            <div className="card p-8 text-center">
              <div className="inline-flex p-4 bg-orange-100 rounded-lg mb-4">
                <Check className="text-orange-600" size={32} />
              </div>
              <h4 className="font-bold text-primary-900 mb-2">Profesyonel</h4>
              <p className="text-sm text-slate-600">
                Deneyimli uzman ekibimiz her zaman hazır
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
>>>>>>> 4855e23d27390993c3739d0f6d832d04426b1d54
