<<<<<<< HEAD
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="hero-gradient py-32 md:py-48 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500 rounded-full opacity-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 bg-accent-500 bg-opacity-20 text-accent-300 rounded-full text-sm font-medium border border-accent-400 border-opacity-30">
              ✨ Türkiye&apos;nin En Güvenilir Araştırma Platformu
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Güvenilir Araştırmalar,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-500">
              Gerçek Sonuçlar
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Pazar araştırmalarından kamuoyu yoklamalarına kadar, tüm araştırma ihtiyaçlarınız için
            veri temelli çözümler sunuyoruz.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/surveys"
              className="btn-accent group flex items-center gap-2 text-lg"
            >
              Anketlere Katıl
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white bg-opacity-10 text-white border-2 border-white rounded-lg font-medium hover:bg-opacity-20 transition-all duration-300 flex items-center gap-2 group"
            >
              Daha Fazla Bilgi
              <TrendingUp size={20} className="group-hover:translate-y-[-2px] transition-transform" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white border-opacity-20"
          >
            <div>
              <p className="text-3xl md:text-4xl font-bold text-accent-300">50K+</p>
              <p className="text-primary-100 mt-2">Katılımcı</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-accent-300">25+</p>
              <p className="text-primary-100 mt-2">Aktif Anket</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-accent-300">98%</p>
              <p className="text-primary-100 mt-2">Memnuniyet</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-accent-300">15+</p>
              <p className="text-primary-100 mt-2">Yıl Deneyim</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
=======
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="hero-gradient py-32 md:py-48 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500 rounded-full opacity-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 bg-accent-500 bg-opacity-20 text-accent-300 rounded-full text-sm font-medium border border-accent-400 border-opacity-30">
              ✨ Türkiye'nin En Güvenilir Araştırma Platformu
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Güvenilir Araştırmalar,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-500">
              Gerçek Sonuçlar
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Pazar araştırmalarından kamuoyu yoklamalarına kadar, tüm araştırma ihtiyaçlarınız için
            veri temelli çözümler sunuyoruz.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/surveys"
              className="btn-accent group flex items-center gap-2 text-lg"
            >
              Anketlere Katıl
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white bg-opacity-10 text-white border-2 border-white rounded-lg font-medium hover:bg-opacity-20 transition-all duration-300 flex items-center gap-2 group"
            >
              Daha Fazla Bilgi
              <TrendingUp size={20} className="group-hover:translate-y-[-2px] transition-transform" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white border-opacity-20"
          >
            <div>
              <p className="text-3xl md:text-4xl font-bold text-accent-300">50K+</p>
              <p className="text-primary-100 mt-2">Katılımcı</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-accent-300">25+</p>
              <p className="text-primary-100 mt-2">Aktif Anket</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-accent-300">98%</p>
              <p className="text-primary-100 mt-2">Memnuniyet</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-accent-300">15+</p>
              <p className="text-primary-100 mt-2">Yıl Deneyim</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
>>>>>>> 4855e23d27390993c3739d0f6d832d04426b1d54
