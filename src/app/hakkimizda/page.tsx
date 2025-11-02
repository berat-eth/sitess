import Link from 'next/link';
import Image from 'next/image';

export default function HakkimizdaPage() {
  const values = [
    {
      title: 'Güvenilirlik',
      description: 'Tüm araştırma süreçlerimizde şeffaflık ve dürüstlük ilkelerini benimser, müşterilerimize her zaman doğru ve objektif veriler sunarız.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'İnovasyon',
      description: 'Teknolojinin sunduğu imkanları araştırma metodolojilerimizle birleştirerek, sektörde öncü çözümler geliştiriyoruz.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'Kalite',
      description: 'ISO standartlarına uygun süreçlerimiz ve sürekli kalite kontrol sistemimizle en yüksek standartlarda hizmet veriyoruz.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: 'Etik',
      description: 'Araştırma etiği kurallarına sıkı sıkıya bağlı kalarak, katılımcıların haklarını korur ve gizlilik prensiplerini uygularız.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const milestones = [
    {
      year: '2008',
      title: 'Şirket Kuruluşu',
      description: 'İstanbul\'da küçük bir ekiple araştırma yolculuğumuza başladık.'
    },
    {
      year: '2012',
      title: 'İlk Büyük Proje',
      description: 'Fortune 500 şirketi ile ilk büyük ölçekli pazar araştırması projesini tamamladık.'
    },
    {
      year: '2015',
      title: 'Teknoloji Yatırımı',
      description: 'Veri analizi ve sosyal medya araştırmaları için gelişmiş teknoloji altyapısını kurduk.'
    },
    {
      year: '2018',
      title: 'Sağlık Sektörü',
      description: 'Sağlık araştırmaları bölümümüzü kurduk ve ilk klinik araştırma projemizi başlattık.'
    },
    {
      year: '2020',
      title: 'Dijital Dönüşüm',
      description: 'Pandemi döneminde tamamen dijital araştırma metodolojilerine geçiş yaptık.'
    },
    {
      year: '2023',
      title: 'AI Entegrasyonu',
      description: 'Yapay zeka destekli analiz araçlarını araştırma süreçlerimize entegre ettik.'
    }
  ];

  const certifications = [
    {
      name: 'ISO 20252',
      description: 'Pazar, kamuoyu ve sosyal araştırma hizmetleri standardı',
      year: '2019'
    },
    {
      name: 'ISO 27001',
      description: 'Bilgi güvenliği yönetim sistemi sertifikası',
      year: '2020'
    },
    {
      name: 'GCP Sertifikası',
      description: 'İyi Klinik Uygulamalar sertifikası',
      year: '2021'
    },
    {
      name: 'ESOMAR Üyeliği',
      description: 'Dünya Pazar Araştırması Derneği üyeliği',
      year: '2018'
    }
  ];

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="relative py-32 border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/about-hero.jpg"
            alt="Professional business team"
            fill
            className="object-cover"
            priority
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/85 via-blue-800/75 to-slate-900/85" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Araştırma Dünyasında 
                <span className="text-blue-200"> 15 Yıllık</span> Deneyim
              </h1>
              <p className="text-xl text-gray-100 mb-8 leading-relaxed">
                2008 yılından bu yana, bilimsel metodoloji ve teknolojik yenilikleri 
                harmanlayarak işletmelerin doğru kararlar almasına yardımcı oluyoruz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/ekip"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 text-center"
                >
                  Ekibimizi Tanıyın
                </Link>
                <Link
                  href="/referanslar"
                  className="border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 text-center backdrop-blur-sm"
                >
                  Referanslarımız
                </Link>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg text-center border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-gray-200">Tamamlanan Proje</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg text-center border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">98%</div>
                <div className="text-gray-200">Müşteri Memnuniyeti</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg text-center border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">25+</div>
                <div className="text-gray-200">Uzman Araştırmacı</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg text-center border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">15</div>
                <div className="text-gray-200">Yıllık Deneyim</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white relative">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <Image
            src="/images/about-team.jpg"
            alt="Team collaboration"
            fill
            className="object-cover opacity-10"
            unoptimized={true}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Misyonumuz</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                İşletmelerin stratejik kararlarını destekleyecek güvenilir, objektif ve 
                bilimsel verileri sağlamak. Araştırma metodolojilerindeki en son gelişmeleri 
                takip ederek müşterilerimize en kaliteli hizmeti sunmak.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Pazar araştırması, sosyal medya analizi ve sağlık araştırmaları alanlarında 
                sektörün öncü şirketi olmaya devam etmek.
              </p>
            </div>

            <div>
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Vizyonumuz</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Türkiye\'nin en güvenilir ve yenilikçi araştırma şirketi olmak. 
                Uluslararası standartlarda hizmet vererek, müşterilerimizin global 
                pazarlarda rekabet avantajı elde etmesine katkı sağlamak.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Yapay zeka ve büyük veri teknolojilerini araştırma metodolojilerimizle 
                birleştirerek, geleceğin araştırma çözümlerini bugünden sunmak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Değerlerimiz</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Çalışma prensiplerimizdeki temel değerler, her projede kaliteli 
              ve güvenilir sonuçlar elde etmemizi sağlar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Yolculuğumuz</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              15 yıllık serüvenimizde attığımız önemli adımlar ve elde ettiğimiz başarılar.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Sertifikalarımız</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uluslararası standartlara uygunluğumuzu gösteren sertifikalar ve üyeliklerimiz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{cert.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{cert.description}</p>
                <div className="text-blue-600 font-semibold text-sm">{cert.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Bizimle Çalışmaya Hazır mısınız?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            15 yıllık deneyimimiz ve uzman ekibimizle projenizi başarıya ulaştıralım.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/iletisim"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              İletişime Geçin
            </Link>
            <Link
              href="/hizmetler"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              Hizmetlerimizi İnceleyin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
