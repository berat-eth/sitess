'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const researchSteps = [
    { title: 'Veri Toplama', icon: '📊', color: 'bg-blue-500' },
    { title: 'Analiz', icon: '🔍', color: 'bg-green-500' },
    { title: 'Raporlama', icon: '📈', color: 'bg-purple-500' },
    { title: 'Sunum', icon: '🎯', color: 'bg-orange-500' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % researchSteps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6"
            >
              Güvenilir{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Araştırma
              </span>{' '}
              Çözümleri
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Pazar araştırması, sosyal medya analizi ve sağlık araştırmalarında 
              uzman ekibimizle işletmenizin doğru kararlar almasına yardımcı oluyoruz.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/hizmetler"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 inline-flex items-center justify-center"
              >
                Hizmetlerimizi Keşfedin
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/iletisim"
                className="border-2 border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 inline-flex items-center justify-center"
              >
                Ücretsiz Danışmanlık
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="text-center lg:text-left"
              >
                <motion.div 
                  className="text-3xl font-bold text-blue-600 mb-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  500+
                </motion.div>
                <div className="text-sm text-gray-600">Tamamlanan Proje</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="text-center lg:text-left"
              >
                <motion.div 
                  className="text-3xl font-bold text-blue-600 mb-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 0.5 }}
                >
                  15+
                </motion.div>
                <div className="text-sm text-gray-600">Yıllık Deneyim</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="text-center lg:text-left"
              >
                <motion.div 
                  className="text-3xl font-bold text-blue-600 mb-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 1 }}
                >
                  98%
                </motion.div>
                <div className="text-sm text-gray-600">Müşteri Memnuniyeti</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10">
              {/* Research Process Animation */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-white rounded-2xl shadow-2xl p-8 mb-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-3 h-3 bg-red-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div 
                      className="w-3 h-3 bg-yellow-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    />
                    <motion.div 
                      className="w-3 h-3 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    />
                  </div>
                  <motion.div 
                    className="text-sm text-gray-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Araştırma Dashboard
                  </motion.div>
                </div>

                {/* Research Process Steps */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">Araştırma Süreci</h3>
                    <motion.div 
                      className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      Aktif
                    </motion.div>
                  </div>
                  
                  <div className="space-y-3">
                    {researchSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        className={`flex items-center p-3 rounded-lg transition-all duration-500 ${
                          currentStep === index 
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500' 
                            : 'bg-gray-50'
                        }`}
                        animate={{
                          scale: currentStep === index ? 1.02 : 1,
                          x: currentStep === index ? 5 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg mr-3 ${
                            currentStep === index ? step.color : 'bg-gray-400'
                          }`}
                          animate={{
                            rotate: currentStep === index ? [0, 360] : 0,
                            scale: currentStep === index ? [1, 1.1, 1] : 1
                          }}
                          transition={{ 
                            rotate: { duration: 1, ease: "easeInOut" },
                            scale: { duration: 0.5 }
                          }}
                        >
                          {step.icon}
                        </motion.div>
                        <div className="flex-1">
                          <div className={`font-medium ${currentStep === index ? 'text-blue-700' : 'text-gray-700'}`}>
                            {step.title}
                          </div>
                          <motion.div 
                            className="w-full bg-gray-200 rounded-full h-1.5 mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <motion.div
                              className={`h-1.5 rounded-full ${step.color}`}
                              initial={{ width: 0 }}
                              animate={{ 
                                width: currentStep === index ? '100%' : 
                                       currentStep > index ? '100%' : '0%'
                              }}
                              transition={{ duration: 0.8, ease: "easeInOut" }}
                            />
                          </motion.div>
                        </div>
                        {currentStep === index && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-green-500"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Animated Chart representation */}
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    <span className="text-sm text-gray-600">Pazar Analizi</span>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-blue-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                      />
                    </div>
                    <motion.span 
                      className="text-sm font-semibold text-gray-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.5 }}
                    >
                      85%
                    </motion.span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    <span className="text-sm text-gray-600">Sosyal Medya</span>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-green-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '92%' }}
                        transition={{ duration: 1.5, delay: 1.4, ease: "easeOut" }}
                      />
                    </div>
                    <motion.span 
                      className="text-sm font-semibold text-gray-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.7 }}
                    >
                      92%
                    </motion.span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                  >
                    <span className="text-sm text-gray-600">Sağlık Araştırması</span>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-purple-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '78%' }}
                        transition={{ duration: 1.5, delay: 1.6, ease: "easeOut" }}
                      />
                    </div>
                    <motion.span 
                      className="text-sm font-semibold text-gray-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.9 }}
                    >
                      78%
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Animated Floating cards */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-blue-600 text-white p-4 rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 2, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <motion.div 
                  className="text-2xl font-bold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  24/7
                </motion.div>
                <div className="text-sm opacity-90">Destek</div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-green-500 text-white p-4 rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 2.2, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, rotate: -5 }}
              >
                <motion.div 
                  className="text-2xl font-bold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 1 }}
                >
                  ISO
                </motion.div>
                <div className="text-sm opacity-90">Sertifikalı</div>
              </motion.div>

              {/* Data Flow Animation */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full"
                    animate={{
                      x: [0, 50, 100, 150],
                      y: [0, -20, 20, 0],
                      opacity: [0, 1, 1, 0],
                      scale: [0.5, 1, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Animated Background decorations */}
            <motion.div 
              className="absolute -top-8 -left-8 w-24 h-24 bg-blue-100 rounded-full opacity-50"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-100 rounded-full opacity-50"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [360, 180, 0]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Floating Research Icons */}
            <motion.div 
              className="absolute top-20 left-10 text-2xl"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              📊
            </motion.div>
            <motion.div 
              className="absolute bottom-20 right-10 text-2xl"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              🔍
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
