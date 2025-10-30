import HeroSection from '@/components/HeroSection';
import ServiceCard from '@/components/ServiceCard';
import { FadeInUp, FadeInLeft, FadeInRight, ScaleIn, FloatingElement, StaggerContainer, StaggerItem, GradientText, GlowCard, CountUp } from '@/components/AnimatedElements';
import Link from 'next/link';

export default function Home() {
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
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <FloatingElement className="absolute top-20 left-10 w-32 h-32">
            <div className="w-full h-full bg-blue-500/10 rounded-full blur-xl" />
          </FloatingElement>
          <FloatingElement className="absolute top-60 right-20 w-40 h-40">
            <div className="w-full h-full bg-purple-500/10 rounded-full blur-xl" />
          </FloatingElement>
          <FloatingElement className="absolute bottom-20 left-1/4 w-28 h-28">
            <div className="w-full h-full bg-pink-500/10 rounded-full blur-xl" />
          </FloatingElement>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <GradientText gradient="from-blue-400 via-purple-400 to-pink-400">
                Yapay Zeka
              </GradientText>
              <span className="text-white"> Destekli Araştırma</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              En son AI teknolojileri ile araştırma süreçlerinizi hızlandırın ve daha doğru sonuçlar elde edin
            </p>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <StaggerItem>
              <GlowCard className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Akıllı Analiz</h3>
                <p className="text-gray-300 text-sm">AI ile büyük veri setlerini anında analiz</p>
              </GlowCard>
            </StaggerItem>

            <StaggerItem>
              <GlowCard glowColor="purple" className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                <div className="bg-purple-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">NLP Analizi</h3>
                <p className="text-gray-300 text-sm">Doğal dil işleme ile metin analizi</p>
              </GlowCard>
            </StaggerItem>

            <StaggerItem>
              <GlowCard glowColor="green" className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                <div className="bg-green-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Otomatik Rapor</h3>
                <p className="text-gray-300 text-sm">AI ile otomatik rapor oluşturma</p>
              </GlowCard>
            </StaggerItem>

            <StaggerItem>
              <GlowCard glowColor="pink" className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                <div className="bg-pink-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Görüntü Analizi</h3>
                <p className="text-gray-300 text-sm">Computer vision ile görsel analiz</p>
              </GlowCard>
            </StaggerItem>
          </StaggerContainer>

          {/* AI Stats */}
          <FadeInUp delay={0.4} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                <CountUp end={98} suffix="%" />
              </div>
              <div className="text-gray-300">AI Doğruluk</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                <CountUp end={10} suffix="x" />
              </div>
              <div className="text-gray-300">Hız Artışı</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">
                <CountUp end={24} suffix="/7" />
              </div>
              <div className="text-gray-300">Otomatik</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">
                <CountUp end={50} suffix="+" />
              </div>
              <div className="text-gray-300">AI Modeli</div>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.6} className="text-center">
            <Link
              href="/hizmetler"
              className="bg-gradient-primary hover:bg-gradient-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover-lift glow-blue animate-gradient inline-flex items-center"
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
              <GradientText>Şeffaf Fiyatlandırma</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              İhtiyaçlarınıza uygun paket seçin, AI destekli araştırma gücünü keşfedin
            </p>
          </FadeInUp>

          {/* Billing Toggle */}
          <FadeInUp delay={0.2} className="text-center mb-12">
            <div className="inline-flex items-center bg-gray-100 rounded-2xl p-2">
              <div className="px-6 py-3 bg-white text-blue-600 shadow-md rounded-xl font-semibold">
                Aylık Ödeme
              </div>
              <div className="px-6 py-3 text-gray-600 rounded-xl font-semibold">
                Yıllık Ödeme
                <span className="ml-2 bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                  %17 İndirim
                </span>
              </div>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <StaggerItem>
              <GlowCard className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 text-center border border-blue-200 hover-lift">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">Başlangıç</h3>
                <div className="text-4xl font-bold text-blue-600 mb-4">₺2.500</div>
                <p className="text-blue-700 mb-6">Küçük işletmeler için</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center text-blue-800">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Aylık 1 araştırma projesi
                  </li>
                  <li className="flex items-center text-blue-800">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Temel AI analiz
                  </li>
                  <li className="flex items-center text-blue-800">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Email desteği
                  </li>
                  <li className="flex items-center text-blue-800">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Online anket (100 katılımcı)
                  </li>
                </ul>
                <Link
                  href="/iletisim"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300 block text-center"
                >
                  Başla
                </Link>
              </GlowCard>
            </StaggerItem>

            <StaggerItem>
              <GlowCard glowColor="purple" className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 text-center border border-purple-200 transform scale-105 ring-4 ring-purple-500/20 hover-lift">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-semibold rounded-xl mb-4">
                  En Popüler
                </div>
                <h3 className="text-2xl font-bold text-purple-800 mb-2">Profesyonel</h3>
                <div className="text-4xl font-bold text-purple-600 mb-4">₺5.000</div>
                <p className="text-purple-700 mb-6">Büyüyen şirketler için</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center text-purple-800">
                    <svg className="w-4 h-4 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Aylık 3 araştırma projesi
                  </li>
                  <li className="flex items-center text-purple-800">
                    <svg className="w-4 h-4 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Gelişmiş AI suite
                  </li>
                  <li className="flex items-center text-purple-800">
                    <svg className="w-4 h-4 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Öncelikli destek
                  </li>
                  <li className="flex items-center text-purple-800">
                    <svg className="w-4 h-4 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Online anket (500 katılımcı)
                  </li>
                </ul>
                <Link
                  href="/iletisim"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300 block text-center"
                >
                  En Popüler
                </Link>
              </GlowCard>
            </StaggerItem>

            <StaggerItem>
              <GlowCard glowColor="green" className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 text-center border border-green-200 hover-lift">
                <h3 className="text-2xl font-bold text-green-800 mb-2">Kurumsal</h3>
                <div className="text-4xl font-bold text-green-600 mb-4">₺10.000</div>
                <p className="text-green-700 mb-6">Büyük organizasyonlar için</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center text-green-800">
                    <svg className="w-4 h-4 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Sınırsız araştırma projesi
                  </li>
                  <li className="flex items-center text-green-800">
                    <svg className="w-4 h-4 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Tam AI erişimi
                  </li>
                  <li className="flex items-center text-green-800">
                    <svg className="w-4 h-4 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    7/24 premium destek
                  </li>
                  <li className="flex items-center text-green-800">
                    <svg className="w-4 h-4 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Sınırsız anket katılımcısı
                  </li>
                </ul>
                <Link
                  href="/iletisim"
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300 block text-center"
                >
                  İletişime Geç
                </Link>
              </GlowCard>
            </StaggerItem>
          </StaggerContainer>

          {/* Add-ons */}
          <FadeInUp delay={0.4} className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                <GradientText gradient="from-blue-600 to-purple-600">Ek Hizmetler</GradientText>
              </h3>
              <p className="text-gray-600">Paketinizi ihtiyaçlarınıza göre özelleştirin</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <GlowCard className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift text-center">
                <h4 className="text-lg font-semibold text-slate-800 mb-2">Ek Araştırma Projesi</h4>
                <p className="text-gray-600 text-sm mb-4">Paketinize ek araştırma projesi ekleyin</p>
                <div className="text-2xl font-bold text-blue-600 mb-3">₺1.500</div>
                <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 w-full">
                  Ekle
                </button>
              </GlowCard>

              <GlowCard glowColor="purple" className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift text-center">
                <h4 className="text-lg font-semibold text-slate-800 mb-2">Premium AI Analiz</h4>
                <p className="text-gray-600 text-sm mb-4">Gelişmiş yapay zeka analiz araçları</p>
                <div className="text-2xl font-bold text-purple-600 mb-3">₺2.000</div>
                <button className="bg-purple-100 hover:bg-purple-200 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 w-full">
                  Ekle
                </button>
              </GlowCard>

              <GlowCard glowColor="green" className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift text-center">
                <h4 className="text-lg font-semibold text-slate-800 mb-2">Acil Proje Desteği</h4>
                <p className="text-gray-600 text-sm mb-4">24 saat içinde proje teslimi</p>
                <div className="text-2xl font-bold text-green-600 mb-3">₺3.000</div>
                <button className="bg-green-100 hover:bg-green-200 text-green-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 w-full">
                  Ekle
                </button>
              </GlowCard>

              <GlowCard glowColor="pink" className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover-lift text-center">
                <h4 className="text-lg font-semibold text-slate-800 mb-2">Özel Eğitim</h4>
                <p className="text-gray-600 text-sm mb-4">Ekibiniz için özel araştırma eğitimi</p>
                <div className="text-2xl font-bold text-pink-600 mb-3">₺5.000</div>
                <button className="bg-pink-100 hover:bg-pink-200 text-pink-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 w-full">
                  Ekle
                </button>
              </GlowCard>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* AI Features Detailed Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <FloatingElement className="absolute top-20 left-10 w-32 h-32">
            <div className="w-full h-full bg-blue-500/10 rounded-full blur-xl" />
          </FloatingElement>
          <FloatingElement className="absolute top-60 right-20 w-40 h-40">
            <div className="w-full h-full bg-purple-500/10 rounded-full blur-xl" />
          </FloatingElement>
          <FloatingElement className="absolute bottom-20 left-1/4 w-28 h-28">
            <div className="w-full h-full bg-pink-500/10 rounded-full blur-xl" />
          </FloatingElement>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <GradientText gradient="from-blue-400 via-purple-400 to-pink-400">
                Yapay Zeka
              </GradientText>
              <span className="text-white"> Teknolojilerimiz</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              En son AI teknolojileri ile araştırma süreçlerinizi devrim niteliğinde değiştiriyoruz
            </p>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <StaggerItem>
              <GlowCard className="bg-gradient-to-br from-blue-500 to-cyan-500 p-8 rounded-3xl text-white hover-lift">
                <div className="flex items-center mb-6">
                  <div className="bg-white/20 backdrop-blur-lg w-16 h-16 rounded-2xl flex items-center justify-center mr-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Akıllı Veri Analizi</h3>
                </div>
                
                <p className="text-white/90 mb-6 leading-relaxed">
                  Büyük veri setlerini yapay zeka algoritmaları ile analiz ederek gizli kalıpları ve trendleri ortaya çıkarıyoruz.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Makine Öğrenmesi</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Derin Öğrenme</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Predictive Analytics</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Pattern Recognition</span>
                  </div>
                </div>
              </GlowCard>
            </StaggerItem>

            <StaggerItem>
              <GlowCard glowColor="purple" className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 rounded-3xl text-white hover-lift">
                <div className="flex items-center mb-6">
                  <div className="bg-white/20 backdrop-blur-lg w-16 h-16 rounded-2xl flex items-center justify-center mr-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Doğal Dil İşleme</h3>
                </div>
                
                <p className="text-white/90 mb-6 leading-relaxed">
                  Metin verilerini anlayarak sentiment analizi, konu modelleme ve otomatik özetleme yapıyoruz.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Sentiment Analysis</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Text Mining</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Language Detection</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Auto Summarization</span>
                  </div>
                </div>
              </GlowCard>
            </StaggerItem>

            <StaggerItem>
              <GlowCard glowColor="green" className="bg-gradient-to-br from-green-500 to-emerald-500 p-8 rounded-3xl text-white hover-lift">
                <div className="flex items-center mb-6">
                  <div className="bg-white/20 backdrop-blur-lg w-16 h-16 rounded-2xl flex items-center justify-center mr-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Görüntü Analizi</h3>
                </div>
                
                <p className="text-white/90 mb-6 leading-relaxed">
                  Görsel içerikleri yapay zeka ile analiz ederek marka görünürlüğü ve müşteri davranışlarını ölçüyoruz.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Computer Vision</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Object Detection</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Image Classification</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">OCR Technology</span>
                  </div>
                </div>
              </GlowCard>
            </StaggerItem>

            <StaggerItem>
              <GlowCard glowColor="pink" className="bg-gradient-to-br from-orange-500 to-red-500 p-8 rounded-3xl text-white hover-lift">
                <div className="flex items-center mb-6">
                  <div className="bg-white/20 backdrop-blur-lg w-16 h-16 rounded-2xl flex items-center justify-center mr-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Otomatik Raporlama</h3>
                </div>
                
                <p className="text-white/90 mb-6 leading-relaxed">
                  AI destekli raporlama sistemi ile analizlerinizi otomatik olarak raporlayıp öngörüler sunuyoruz.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Auto Report Generation</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Data Visualization</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Insight Discovery</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Trend Forecasting</span>
                  </div>
                </div>
              </GlowCard>
            </StaggerItem>
          </StaggerContainer>

          {/* AI Tools Dashboard */}
          <FadeInUp delay={0.4} className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">AI Araçlarımız</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Özel geliştirdiğimiz yapay zeka araçları ile araştırma süreçlerinizi otomatikleştirin
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <GlowCard className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                <h4 className="text-lg font-bold text-white mb-2">MikBot</h4>
                <p className="text-gray-300 text-sm mb-4">AI destekli araştırma asistanı</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">Doğruluk:</span>
                  <span className="text-lg font-bold text-blue-400">98%</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{width: '98%'}}></div>
                </div>
              </GlowCard>

              <GlowCard glowColor="purple" className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                <h4 className="text-lg font-bold text-white mb-2">DataMiner Pro</h4>
                <p className="text-gray-300 text-sm mb-4">Akıllı veri madenciliği platformu</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">Doğruluk:</span>
                  <span className="text-lg font-bold text-purple-400">95%</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full" style={{width: '95%'}}></div>
                </div>
              </GlowCard>

              <GlowCard glowColor="green" className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                <h4 className="text-lg font-bold text-white mb-2">SentimentAI</h4>
                <p className="text-gray-300 text-sm mb-4">Gelişmiş duygu analizi motoru</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">Doğruluk:</span>
                  <span className="text-lg font-bold text-green-400">97%</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: '97%'}}></div>
                </div>
              </GlowCard>

              <GlowCard glowColor="pink" className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                <h4 className="text-lg font-bold text-white mb-2">PredictiveCore</h4>
                <p className="text-gray-300 text-sm mb-4">Tahminleme ve öngörü sistemi</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">Doğruluk:</span>
                  <span className="text-lg font-bold text-pink-400">94%</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-pink-400 to-pink-600 h-2 rounded-full" style={{width: '94%'}}></div>
                </div>
              </GlowCard>
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
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Hızlı Teslimat</h3>
              <p className="text-gray-600">Acil projeleriniz için 24-48 saat içinde ön rapor</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Uzman Ekip</h3>
              <p className="text-gray-600">PhD ve yüksek lisans dereceli araştırma uzmanları</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
