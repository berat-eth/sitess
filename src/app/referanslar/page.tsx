import Link from 'next/link';

export default function ReferanslarPage() {
  const clients = [
    {
      name: 'TechCorp A.Ş.',
      sector: 'Teknoloji',
      project: 'Pazar Araştırması',
      description: 'Yeni ürün lansmanı için kapsamlı pazar analizi ve tüketici davranış araştırması.',
      year: '2023',
      logo: '/clients/techcorp.png'
    },
    {
      name: 'HealthPlus Hastanesi',
      sector: 'Sağlık',
      project: 'Hasta Memnuniyet Araştırması',
      description: 'Hasta deneyimi ve hizmet kalitesi ölçümü için kapsamlı anket çalışması.',
      year: '2023',
      logo: '/clients/healthplus.png'
    },
    {
      name: 'RetailMax Zinciri',
      sector: 'Perakende',
      project: 'Müşteri Segmentasyonu',
      description: 'Müşteri davranış analizi ve hedef kitle segmentasyonu çalışması.',
      year: '2022',
      logo: '/clients/retailmax.png'
    },
    {
      name: 'FinanceFirst Bank',
      sector: 'Finans',
      project: 'Dijital Dönüşüm Araştırması',
      description: 'Müşteri dijital bankacılık tercihleri ve kullanım alışkanlıkları araştırması.',
      year: '2022',
      logo: '/clients/financefirst.png'
    },
    {
      name: 'EduTech Platform',
      sector: 'Eğitim',
      project: 'Kullanıcı Deneyimi Araştırması',
      description: 'Online eğitim platformu kullanıcı deneyimi ve memnuniyet ölçümü.',
      year: '2023',
      logo: '/clients/edutech.png'
    },
    {
      name: 'GreenEnergy Ltd.',
      sector: 'Enerji',
      project: 'Sosyal Medya Analizi',
      description: 'Yenilenebilir enerji konusunda kamuoyu algısı ve sosyal medya sentiment analizi.',
      year: '2023',
      logo: '/clients/greenenergy.png'
    }
  ];

  const testimonials = [
    {
      quote: "Araştırma Şirketi ile çalıştığımız projede aldığımız sonuçlar beklentilerimizi fazlasıyla karşıladı. Profesyonel yaklaşımları ve detaylı analizleri sayesinde doğru stratejik kararlar alabildik.",
      author: "Mehmet Kaya",
      position: "Pazarlama Direktörü",
      company: "TechCorp A.Ş.",
      rating: 5
    },
    {
      quote: "Sağlık sektöründeki deneyimleri ve etik yaklaşımları ile hasta memnuniyet araştırmamızı başarıyla tamamladılar. Sonuçlar hizmet kalitemizi artırmamızda büyük rol oynadı.",
      author: "Dr. Ayşe Demir",
      position: "Başhekim",
      company: "HealthPlus Hastanesi",
      rating: 5
    },
    {
      quote: "Müşteri segmentasyonu çalışmasında gösterdikleri titizlik ve sundukları içgörüler, pazarlama stratejimizi yeniden şekillendirmemize yardımcı oldu. Kesinlikle tavsiye ederim.",
      author: "Can Özkan",
      position: "Genel Müdür",
      company: "RetailMax Zinciri",
      rating: 5
    }
  ];

  const sectors = [
    {
      name: 'Teknoloji',
      count: 15,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: 'Sağlık',
      count: 12,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      name: 'Finans',
      count: 18,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      name: 'Perakende',
      count: 22,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      name: 'Eğitim',
      count: 8,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      name: 'Enerji',
      count: 6,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-slate-800 mb-6">
            Referanslarımız
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            15 yıllık deneyimimiz boyunca farklı sektörlerden 500+ şirketle 
            başarılı projeler gerçekleştirdik.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Tamamlanan Proje</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
              <div className="text-gray-600">Mutlu Müşteri</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Memnuniyet Oranı</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">15</div>
              <div className="text-gray-600">Yıllık Deneyim</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Çalıştığımız Sektörler
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Farklı sektörlerdeki deneyimimiz sayesinde her alana özel 
              çözümler sunabiliyoruz.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {sectors.map((sector, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-6 text-center hover:bg-blue-50 hover:shadow-lg transition-all duration-300">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {sector.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{sector.name}</h3>
                <p className="text-blue-600 font-medium">{sector.count} Proje</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Projects */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Örnek Projelerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Son dönemde tamamladığımız başarılı projelerin örnekleri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Logo placeholder */}
                <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-2xl font-bold text-gray-400">{client.name.charAt(0)}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-800">{client.name}</h3>
                    <span className="text-sm text-gray-500">{client.year}</span>
                  </div>
                  
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-2">
                      {client.sector}
                    </span>
                    <h4 className="text-lg font-semibold text-slate-700 mb-2">{client.project}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{client.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">Tamamlandı</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Müşteri Görüşleri
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Çalıştığımız şirketlerin bizim hakkımızdaki görüşleri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-8 relative">
                {/* Quote icon */}
                <div className="absolute top-6 right-6 text-blue-200">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">"{testimonial.quote}"</p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="font-semibold text-slate-800">{testimonial.author}</div>
                  <div className="text-blue-600 font-medium">{testimonial.position}</div>
                  <div className="text-gray-500 text-sm">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Siz de Referanslarımıza Katılın
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Başarılı projeler gerçekleştiren müşterilerimize katılmak için 
            bizimle iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/iletisim"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              Projenizi Başlatın
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
