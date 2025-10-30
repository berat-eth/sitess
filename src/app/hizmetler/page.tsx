import Link from 'next/link';
import { FadeInUp, FadeInLeft, FadeInRight, ScaleIn, FloatingElement, StaggerContainer, StaggerItem, GradientText, GlowCard } from '@/components/AnimatedElements';

export default function HizmetlerPage() {
  const services = [
    {
      id: 'pazar',
      title: 'Pazar Araştırması',
      description: 'Hedef kitlenizi daha iyi anlayın ve pazar fırsatlarını keşfedin. Kapsamlı pazar analizleri ile rekabet avantajı elde edin.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: [
        'AI destekli tüketici davranış analizi',
        'Otomatik rekabet analizi ve benchmarking',
        'Predictive pazar büyüklüğü analizi',
        'Machine learning ile müşteri segmentasyonu',
        'AI tabanlı fiyat duyarlılık analizi',
        'Akıllı marka konumlandırma araştırması'
      ],
      process: [
        'Araştırma hedeflerinin belirlenmesi',
        'Metodoloji tasarımı',
        'Veri toplama süreci',
        'İstatistiksel analiz',
        'Rapor hazırlama ve sunum'
      ],
      color: 'blue'
    },
    {
      id: 'sosyal-medya',
      title: 'Sosyal Medya Araştırması',
      description: 'Sosyal medya platformlarındaki marka algısını ölçün ve dijital stratejinizi güçlendirin.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      features: [
        'AI destekli sentiment analizi',
        'Otomatik influencer etki ölçümü',
        'Machine learning hashtag ve trend analizi',
        'Akıllı sosyal medya ROI ölçümü',
        'AI tabanlı rekabet analizi',
        'Predictive crisis management analizi'
      ],
      process: [
        'Platform ve anahtar kelime belirleme',
        'Veri madenciliği',
        'Sentiment ve içerik analizi',
        'Görselleştirme ve raporlama',
        'Strateji önerileri'
      ],
      color: 'green'
    },
    {
      id: 'saglik',
      title: 'Sağlık Araştırmaları',
      description: 'Sağlık sektöründe güvenilir ve etik araştırma metodolojileri ile bilimsel veriler sağlıyoruz.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      features: [
        'AI destekli klinik araştırma desteği',
        'Otomatik hasta memnuniyet analizi',
        'Machine learning sağlık hizmet kalite ölçümü',
        'AI tabanlı epidemiyolojik çalışmalar',
        'Predictive ilaç pazar araştırması',
        'Akıllı sağlık teknolojileri değerlendirmesi'
      ],
      process: [
        'Etik kurul onayı alınması',
        'Çalışma protokolü hazırlama',
        'Veri toplama ve kayıt',
        'İstatistiksel analiz',
        'Bilimsel rapor yazımı'
      ],
      color: 'purple'
    }
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700',
      border: 'border-blue-200'
    },
    green: {
      bg: 'bg-green-50',
      iconBg: 'bg-green-100',
      iconText: 'text-green-600',
      button: 'bg-green-600 hover:bg-green-700',
      border: 'border-green-200'
    },
    purple: {
      bg: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      iconText: 'text-purple-600',
      button: 'bg-purple-600 hover:bg-purple-700',
      border: 'border-purple-200'
    }
  };

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            <GradientText gradient="from-blue-600 via-purple-600 to-pink-600">
              AI Destekli
            </GradientText>
            <span className="text-slate-800"> Araştırma Hizmetlerimiz</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Yapay zeka teknolojileri ile güçlendirilmiş araştırma süreçlerimizle 
            işletmenizin ihtiyaç duyduğu güvenilir verileri sağlıyoruz.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm border border-gray-200"
              >
                {service.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => {
              const classes = colorClasses[service.color as keyof typeof colorClasses];
              const isEven = index % 2 === 0;
              
              return (
                <div key={service.id} id={service.id} className="scroll-mt-20">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                    {/* Content */}
                    <div className={!isEven ? 'lg:col-start-2' : ''}>
                      <div className={`${classes.iconBg} ${classes.iconText} w-20 h-20 rounded-2xl flex items-center justify-center mb-6`}>
                        {service.icon}
                      </div>
                      
                      <h2 className="text-4xl font-bold text-slate-800 mb-6">
                        {service.title}
                      </h2>
                      
                      <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="mb-8">
                        <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                          Hizmet Kapsamımız
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center">
                              <svg className={`w-5 h-5 ${classes.iconText} mr-3 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Link
                        href="/iletisim"
                        className={`${classes.button} text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 inline-flex items-center group`}
                      >
                        Teklif Al
                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>

                    {/* Process Card */}
                    <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
                      <div className={`${classes.bg} ${classes.border} border rounded-2xl p-8`}>
                        <h3 className="text-2xl font-semibold text-slate-800 mb-6">
                          Çalışma Sürecimiz
                        </h3>
                        <div className="space-y-4">
                          {service.process.map((step, idx) => (
                            <div key={idx} className="flex items-start">
                              <div className={`${classes.iconBg} ${classes.iconText} w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0 font-semibold text-sm`}>
                                {idx + 1}
                              </div>
                              <div>
                                <p className="text-gray-700 font-medium">{step}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-gray-200">
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>Ortalama Süre:</span>
                            <span className="font-semibold">2-4 hafta</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Araştırma Metodolojimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bilimsel standartlara uygun, güvenilir ve objektif sonuçlar için 
              kanıtlanmış metodolojiler kullanıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Nicel Araştırma
              </h3>
              <p className="text-gray-600">
                Anketler, istatistiksel analizler ve büyük veri setleri ile 
                ölçülebilir sonuçlar elde ediyoruz.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Nitel Araştırma
              </h3>
              <p className="text-gray-600">
                Derinlemesine görüşmeler, odak grupları ve gözlem teknikleri 
                ile detaylı içgörüler sağlıyoruz.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Karma Yöntem
              </h3>
              <p className="text-gray-600">
                Nicel ve nitel yöntemleri birleştirerek en kapsamlı ve 
                güvenilir sonuçları elde ediyoruz.
              </p>
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
