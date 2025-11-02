'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});
  
  const slides = [
    {
      id: 1,
      title: 'Güvenilir Araştırma Çözümleri',
      subtitle: 'AI Destekli Profesyonel Hizmet',
      description: 'Pazar araştırması, sosyal medya analizi ve sağlık araştırmalarında uzman ekibimizle işletmenizin doğru kararlar almasına yardımcı oluyoruz.',
      image: '/images/hero-1.jpg',
      ctaText: 'Hizmetlerimizi Keşfedin',
      overlay: 'rgba(30, 58, 138, 0.85)',
      gradient: 'from-blue-900 via-blue-800 to-slate-900',
      accent: 'blue'
    },
    {
      id: 2,
      title: '15 Yıllık Deneyim',
      subtitle: 'Kanıtlanmış Başarı',
      description: '500+ tamamlanan proje ve %98 müşteri memnuniyeti ile sektörde öncü bir konumdayız.',
      image: '/images/hero-2.jpg',
      ctaText: 'Referanslarımız',
      overlay: 'rgba(37, 99, 235, 0.85)',
      gradient: 'from-blue-800 via-blue-700 to-slate-800',
      accent: 'blue'
    },
    {
      id: 3,
      title: 'Yapay Zeka Teknolojileri',
      subtitle: 'Modern Analiz Araçları',
      description: 'En son AI teknolojileri ile araştırma süreçlerinizi hızlandırın ve daha doğru sonuçlar elde edin.',
      image: '/images/hero-3.jpg',
      ctaText: 'AI Hizmetlerimiz',
      overlay: 'rgba(30, 64, 175, 0.85)',
      gradient: 'from-slate-900 via-blue-900 to-blue-800',
      accent: 'blue'
    },
    {
      id: 4,
      title: 'Özel Araştırma Çözümleri',
      subtitle: 'İhtiyaçlarınıza Özel',
      description: 'Kurumsal müşterilerimiz için özel tasarlanmış araştırma metodolojileri ile işletmenizin büyümesine katkı sağlıyoruz.',
      image: '/images/hero-4.jpg',
      ctaText: 'İletişime Geçin',
      overlay: 'rgba(37, 99, 235, 0.85)',
      gradient: 'from-blue-700 via-slate-800 to-blue-900',
      accent: 'blue'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-slate-900">
      {/* Split Screen Design */}
      <div className="absolute inset-0 flex">
        {/* Left Side - Image (60%) */}
        <div className="w-full lg:w-[60%] relative">
          <AnimatePresence mode="wait">
            {slides.map((slide, index) => (
              index === currentSlide && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  {!imageErrors[slide.id] ? (
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      className="object-cover"
                      unoptimized={true}
                      onError={() => setImageErrors((prev) => ({ ...prev, [slide.id]: true }))}
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
                  )}
                  {/* Subtle overlay on left */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Right Side - Content (40%) */}
        <div className="hidden lg:flex w-[40%] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
          
          <div className="relative z-10 flex flex-col justify-center px-12 py-20">
            <AnimatePresence mode="wait">
              {slides.map((slide, index) => (
                index === currentSlide && (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="inline-block"
                    >
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                        {slide.subtitle}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                    >
                      {slide.title}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg text-gray-300 leading-relaxed pr-8"
                    >
                      {slide.description}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex flex-col sm:flex-row gap-4 pt-4"
                    >
                      <Link
                        href="/hizmetler"
                        className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        {slide.ctaText}
                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <Link
                        href="/iletisim"
                        className="border-2 border-gray-600 hover:border-blue-600 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center"
                      >
                        Ücretsiz Danışmanlık
                      </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-700"
                    >
                      <div>
                        <div className="text-3xl font-bold text-blue-400 mb-1">500+</div>
                        <div className="text-xs text-gray-400">Proje</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-blue-400 mb-1">15+</div>
                        <div className="text-xs text-gray-400">Yıl</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-blue-400 mb-1">98%</div>
                        <div className="text-xs text-gray-400">Memnuniyet</div>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile/Full Screen Content (for mobile and when right side hidden) */}
      <div className="lg:hidden absolute inset-0 flex items-center justify-center z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatePresence mode="wait">
            {slides.map((slide, index) => (
              index === currentSlide && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold mb-4"
                  >
                    {slide.subtitle}
                  </motion.span>
                  <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-gray-200 leading-relaxed mb-8">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/hizmetler"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center justify-center"
                    >
                      {slide.ctaText}
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href="/iletisim"
                      className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center justify-center"
                    >
                      Ücretsiz Danışmanlık
                    </Link>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Navigation - Vertical on Right Side (Desktop) */}
      <div className="hidden lg:block absolute right-8 top-1/2 transform -translate-y-1/2 z-30">
        <div className="flex flex-col gap-3">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`relative group transition-all duration-300 ${
                index === currentSlide ? 'opacity-100' : 'opacity-50 hover:opacity-75'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className={`h-12 w-1 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-blue-500 w-2' 
                  : 'bg-white/30 group-hover:bg-white/50'
              }`} />
              {index === currentSlide && (
                <motion.div
                  className="absolute -right-8 top-1/2 transform -translate-y-1/2 whitespace-nowrap"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span className="text-white text-sm font-medium bg-slate-800/90 px-3 py-1 rounded-lg backdrop-blur-sm">
                    {slides[index].title.split(' ')[0]}
                  </span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>


      {/* Progress Bar - Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-black/20 z-30">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ width: '100%' }}
            transition={{ duration: 6, ease: "linear" }}
          />
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;
