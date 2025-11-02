'use client';

import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import ServiceCard from '@/components/ServiceCard';
import { FadeInUp, FadeInLeft, FadeInRight, ScaleIn, FloatingElement, StaggerContainer, StaggerItem, GradientText, GlowCard, CountUp } from '@/components/AnimatedElements';
import Link from 'next/link';

export default function Home() {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingPlans = {
    monthly: {
      starter: 2500,
      professional: 5000,
      enterprise: 10000
    },
    annual: {
      starter: 2075, // %17 indirim
      professional: 4150, // %17 indirim
      enterprise: 8300 // %17 indirim
    }
  };

  const currentPricing = isAnnual ? pricingPlans.annual : pricingPlans.monthly;
  const services = [
    {
      title: 'Pazar Araştırması',
      description: 'Hedef kitlenizi daha iyi anlayın ve pazar fırsatlarını keşfedin. Kapsamlı pazar analizleri ile rekabet avantajı elde edin.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: [
        'Tüketici davranış analizi',
        'Rekabet analizi ve benchmarking',
        'Pazar büyüklüğü ve trend analizi',
        'Müşteri segmentasyonu'
      ],
      href: '/hizmetler#pazar',
      color: 'blue' as const
    },
    {
      title: 'Sosyal Medya Araştırması',
      description: 'Sosyal medya platformlarındaki marka algısını ölçün ve dijital stratejinizi güçlendirin.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      features: [
        'Sentiment analizi',
        'Influencer etki ölçümü',
        'Hashtag ve trend analizi',
        'Sosyal medya ROI ölçümü'
      ],
      href: '/hizmetler#sosyal-medya',
      color: 'green' as const
    },
    {
      title: 'Sağlık Araştırmaları',
      description: 'Sağlık sektöründe güvenilir ve etik araştırma metodolojileri ile bilimsel veriler sağlıyoruz.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      features: [
        'Klinik araştırma desteği',
        'Hasta memnuniyet anketleri',
        'Sağlık hizmet kalite ölçümü',
        'Epidemiyolojik çalışmalar'
      ],
      href: '/hizmetler#saglik',
      color: 'purple' as const
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Uzman Araştırma Hizmetlerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Farklı sektörlerdeki deneyimimiz ve bilimsel metodolojimiz ile 
              işletmenizin ihtiyaç duyduğu güvenilir verileri sağlıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gray-800">
              <span className="text-blue-600">Yapay Zeka</span>
              <span className="text-gray-800"> Destekli Araştırma</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              En son AI teknolojileri ile araştırma süreçlerinizi hızlandırın ve daha doğru sonuçlar elde edin
            </p>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <StaggerItem>
              <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm">
                <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Akıllı Analiz</h3>
                <p className="text-gray-600 text-sm">AI ile büyük veri setlerini anında analiz</p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm">
                <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">NLP Analizi</h3>
                <p className="text-gray-600 text-sm">Doğal dil işleme ile metin analizi</p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm">
                <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Otomatik Rapor</h3>
                <p className="text-gray-600 text-sm">AI ile otomatik rapor oluşturma</p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm">
                <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Görüntü Analizi</h3>
                <p className="text-gray-600 text-sm">Computer vision ile görsel analiz</p>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* AI Stats */}
          <FadeInUp delay={0.4} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <CountUp end={98} suffix="%" />
              </div>
              <div className="text-gray-600">AI Doğruluk</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <CountUp end={10} suffix="x" />
              </div>
              <div className="text-gray-600">Hız Artışı</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <CountUp end={24} suffix="/7" />
              </div>
              <div className="text-gray-600">Otomatik</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <CountUp end={50} suffix="+" />
              </div>
              <div className="text-gray-600">AI Modeli</div>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.6} className="text-center">
            <Link
              href="/hizmetler"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 inline-flex items-center shadow-sm"
            >
              Hizmetlerimizi Keşfet
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </FadeInUp>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              <span className="text-blue-600">Şeffaf</span> Fiyatlandırma
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              İhtiyaçlarınıza uygun paket seçin, AI destekli araştırma gücünü keşfedin
            </p>
          </FadeInUp>

          {/* Billing Toggle */}
          <FadeInUp delay={0.2} className="text-center mb-12">
            <div className="inline-flex items-center bg-gray-100 rounded-2xl p-2">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  !isAnnual
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Aylık Ödeme
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  isAnnual
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yıllık Ödeme
                <span className="ml-2 bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                  %17 İndirim
                </span>
              </button>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <StaggerItem>
              <div className="bg-white rounded-xl p-8 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Başlangıç</h3>
                <div className="mb-2">
                  {isAnnual && (
                    <div className="text-sm text-gray-500 line-through mb-1">
                      ₺{pricingPlans.monthly.starter.toLocaleString('tr-TR')}
                    </div>
                  )}
                  <div className="text-4xl font-bold text-blue-600">
                    ₺{currentPricing.starter.toLocaleString('tr-TR')}
                    <span className="text-lg text-gray-600 font-normal">
                      {isAnnual ? '/yıl' : '/ay'}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">Küçük işletmeler için</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Aylık 1 araştırma projesi
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Temel AI analiz
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Email desteği
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Online anket (100 katılımcı)
                  </li>
                </ul>
                <Link
                  href="/iletisim"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 block text-center"
                >
                  Başla
                </Link>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-blue-50 rounded-xl p-8 text-center border-2 border-blue-200 shadow-lg transform scale-105">
                <div className="bg-blue-600 text-white text-center py-2 text-sm font-semibold rounded-lg mb-4">
                  En Popüler
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Profesyonel</h3>
                <div className="mb-2">
                  {isAnnual && (
                    <div className="text-sm text-gray-500 line-through mb-1">
                      ₺{pricingPlans.monthly.professional.toLocaleString('tr-TR')}
                    </div>
                  )}
                  <div className="text-4xl font-bold text-blue-600">
                    ₺{currentPricing.professional.toLocaleString('tr-TR')}
                    <span className="text-lg text-gray-600 font-normal">
                      {isAnnual ? '/yıl' : '/ay'}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">Büyüyen şirketler için</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Aylık 3 araştırma projesi
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Gelişmiş AI suite
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Öncelikli destek
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Online anket (500 katılımcı)
                  </li>
                </ul>
                <Link
                  href="/iletisim"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 block text-center"
                >
                  En Popüler
                </Link>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white rounded-xl p-8 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Kurumsal</h3>
                <div className="mb-2">
                  {isAnnual && (
                    <div className="text-sm text-gray-500 line-through mb-1">
                      ₺{pricingPlans.monthly.enterprise.toLocaleString('tr-TR')}
                    </div>
                  )}
                  <div className="text-4xl font-bold text-blue-600">
                    ₺{currentPricing.enterprise.toLocaleString('tr-TR')}
                    <span className="text-lg text-gray-600 font-normal">
                      {isAnnual ? '/yıl' : '/ay'}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">Büyük organizasyonlar için</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Sınırsız araştırma projesi
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Tam AI erişimi
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    7/24 premium destek
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Sınırsız anket katılımcısı
                  </li>
                </ul>
                <Link
                  href="/iletisim"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 block text-center"
                >
                  İletişime Geç
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Add-ons */}
          <FadeInUp delay={0.4} className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                <span className="text-blue-600">Ek Hizmetler</span>
              </h3>
              <p className="text-gray-600">Paketinizi ihtiyaçlarınıza göre özelleştirin</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center">
                <h4 className="text-lg font-semibold text-slate-800 mb-2">Ek Araştırma Projesi</h4>
                <p className="text-gray-600 text-sm mb-4">Paketinize ek araştırma projesi ekleyin</p>
                <div className="text-2xl font-bold text-blue-600 mb-3">₺1.500</div>
                <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 w-full">
                  Ekle
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center">
                <h4 className="text-lg font-semibold text-slate-800 mb-2">Premium AI Analiz</h4>
                <p className="text-gray-600 text-sm mb-4">Gelişmiş yapay zeka analiz araçları</p>
                <div className="text-2xl font-bold text-blue-600 mb-3">₺2.000</div>
                <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 w-full">
                  Ekle
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center">
                <h4 className="text-lg font-semibold text-slate-800 mb-2">Acil Proje Desteği</h4>
                <p className="text-gray-600 text-sm mb-4">24 saat içinde proje teslimi</p>
                <div className="text-2xl font-bold text-blue-600 mb-3">₺3.000</div>
                <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 w-full">
                  Ekle
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center">
                <h4 className="text-lg font-semibold text-slate-800 mb-2">Özel Eğitim</h4>
                <p className="text-gray-600 text-sm mb-4">Ekibiniz için özel araştırma eğitimi</p>
                <div className="text-2xl font-bold text-blue-600 mb-3">₺5.000</div>
                <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 w-full">
                  Ekle
                </button>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* AI Features Detailed Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gray-800">
              <span className="text-blue-600">Yapay Zeka</span>
              <span className="text-gray-800"> Teknolojilerimiz</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              En son AI teknolojileri ile araştırma süreçlerinizi devrim niteliğinde değiştiriyoruz
            </p>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <StaggerItem>
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Akıllı Veri Analizi</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Büyük veri setlerini yapay zeka algoritmaları ile analiz ederek gizli kalıpları ve trendleri ortaya çıkarıyoruz.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Makine Öğrenmesi</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Derin Öğrenme</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Predictive Analytics</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Pattern Recognition</span>
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Doğal Dil İşleme</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Metin verilerini anlayarak sentiment analizi, konu modelleme ve otomatik özetleme yapıyoruz.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Sentiment Analysis</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Text Mining</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Language Detection</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Auto Summarization</span>
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Görüntü Analizi</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Görsel içerikleri yapay zeka ile analiz ederek marka görünürlüğü ve müşteri davranışlarını ölçüyoruz.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Computer Vision</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Object Detection</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Image Classification</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">OCR Technology</span>
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Otomatik Raporlama</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  AI destekli raporlama sistemi ile analizlerinizi otomatik olarak raporlayıp öngörüler sunuyoruz.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Auto Report Generation</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Data Visualization</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Insight Discovery</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Trend Forecasting</span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* AI Tools Dashboard */}
          <FadeInUp delay={0.4} className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">AI Araçlarımız</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Özel geliştirdiğimiz yapay zeka araçları ile araştırma süreçlerinizi otomatikleştirin
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                <h4 className="text-lg font-bold text-gray-800 mb-2">MikBot</h4>
                <p className="text-gray-600 text-sm mb-4">AI destekli araştırma asistanı</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Doğruluk:</span>
                  <span className="text-lg font-bold text-blue-600">98%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '98%'}}></div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                <h4 className="text-lg font-bold text-gray-800 mb-2">DataMiner Pro</h4>
                <p className="text-gray-600 text-sm mb-4">Akıllı veri madenciliği platformu</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Doğruluk:</span>
                  <span className="text-lg font-bold text-blue-600">95%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '95%'}}></div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                <h4 className="text-lg font-bold text-gray-800 mb-2">SentimentAI</h4>
                <p className="text-gray-600 text-sm mb-4">Gelişmiş duygu analizi motoru</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Doğruluk:</span>
                  <span className="text-lg font-bold text-blue-600">97%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '97%'}}></div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                <h4 className="text-lg font-bold text-gray-800 mb-2">PredictiveCore</h4>
                <p className="text-gray-600 text-sm mb-4">Tahminleme ve öngörü sistemi</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Doğruluk:</span>
                  <span className="text-lg font-bold text-blue-600">94%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '94%'}}></div>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <p className="text-xl text-gray-600">
              15 yıllık deneyimimiz ve kanıtlanmış metodolojimizle fark yaratıyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Güvenilir Sonuçlar</h3>
              <p className="text-gray-600">ISO sertifikalı süreçlerimiz ile %98 doğruluk oranında veriler</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Hızlı Teslimat</h3>
              <p className="text-gray-600">Acil projeleriniz için 24-48 saat içinde ön rapor</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Uzman Ekip</h3>
              <p className="text-gray-600">PhD ve yüksek lisans dereceli araştırma uzmanları</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">7/24 Destek</h3>
              <p className="text-gray-600">Proje süresince kesintisiz iletişim ve destek</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Projenizi Başlatmaya Hazır mısınız?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Uzman ekibimizle ücretsiz danışmanlık alın ve projeniz için 
            en uygun araştırma metodolojisini belirleyin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/iletisim"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              Ücretsiz Danışmanlık Al
            </Link>
            <Link
              href="/referanslar"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              Referanslarımızı İncele
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
