import ContactForm from '@/components/ContactForm';

export default function IletisimPage() {
  const contactInfo = [
    {
      title: 'Adres',
      content: 'Maslak Mahallesi, Büyükdere Cad. No: 123/A\nŞişli, İstanbul 34485',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: 'Telefon',
      content: '+90 212 XXX XX XX\n+90 212 XXX XX XX (Fax)',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      title: 'E-posta',
      content: 'info@arastirmasirketi.com\ndestek@arastirmasirketi.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Çalışma Saatleri',
      content: 'Pazartesi - Cuma: 09:00 - 18:00\nCumartesi: 09:00 - 13:00\nPazar: Kapalı',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const departments = [
    {
      name: 'Genel Bilgi',
      email: 'info@arastirmasirketi.com',
      description: 'Genel sorularınız ve bilgi almak için'
    },
    {
      name: 'Satış Ekibi',
      email: 'satis@arastirmasirketi.com',
      description: 'Yeni proje teklifleri ve fiyat bilgisi için'
    },
    {
      name: 'Proje Yönetimi',
      email: 'proje@arastirmasirketi.com',
      description: 'Mevcut projeleriniz hakkında'
    },
    {
      name: 'Teknik Destek',
      email: 'destek@arastirmasirketi.com',
      description: 'Teknik konular ve platform desteği için'
    },
    {
      name: 'İnsan Kaynakları',
      email: 'ik@arastirmasirketi.com',
      description: 'Kariyer fırsatları ve başvurular için'
    },
    {
      name: 'Muhasebe',
      email: 'muhasebe@arastirmasirketi.com',
      description: 'Fatura ve ödeme konuları için'
    }
  ];

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-slate-800 mb-6">
            İletişime Geçin
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Araştırma projeleriniz için uzman ekibimizle görüşün. 
            Size en uygun çözümü birlikte bulalım.
          </p>
          
          {/* Quick Contact */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a
              href="tel:+902121234567"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Hemen Arayın
            </a>
            <a
              href="mailto:info@arastirmasirketi.com"
              className="border-2 border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              E-posta Gönderin
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">
                    İletişim Bilgileri
                  </h3>
                </div>

                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-2">{info.title}</h4>
                      <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                    </div>
                  </div>
                ))}

                {/* Social Media */}
                <div className="pt-8 border-t border-gray-200">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Sosyal Medya</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-blue-100 hover:bg-blue-200 text-blue-600 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-blue-100 hover:bg-blue-200 text-blue-600 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-blue-100 hover:bg-blue-200 text-blue-600 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.897-.875-1.387-2.026-1.387-3.323s.49-2.448 1.297-3.323c.875-.897 2.026-1.387 3.323-1.387s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Departmanlarımız
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Konunuza göre doğru departmanla iletişime geçin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{dept.name}</h3>
                  <p className="text-gray-600 text-sm">{dept.description}</p>
                </div>
                <a
                  href={`mailto:${dept.email}`}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 inline-flex items-center"
                >
                  {dept.email}
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Ofisimizi Ziyaret Edin
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              İstanbul Maslak'taki ofisimizde yüz yüze görüşme imkanı.
            </p>
          </div>

          {/* Map placeholder */}
          <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Ofis Konumumuz</h3>
              <p className="text-gray-600 mb-4">
                Maslak Mahallesi, Büyükdere Cad. No: 123/A<br />
                Şişli, İstanbul 34485
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center"
              >
                Google Maps'te Aç
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Merak ettiğiniz konularda hızlı yanıtlar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Proje süresi ne kadar?
              </h3>
              <p className="text-gray-600">
                Proje kapsamına göre değişmekle birlikte, ortalama 2-4 hafta sürmektedir. 
                Acil projeler için hızlandırılmış süreç uygulanabilir.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Fiyatlandırma nasıl yapılıyor?
              </h3>
              <p className="text-gray-600">
                Her proje özelinde, kapsam ve metodolojiye göre özel fiyat teklifi hazırlanır. 
                Ücretsiz ön görüşme ile detayları konuşabiliriz.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Veri gizliliği nasıl sağlanıyor?
              </h3>
              <p className="text-gray-600">
                KVKK uyumlu süreçlerimiz ve ISO 27001 sertifikamız ile 
                tüm verileriniz en yüksek güvenlik standartlarında korunur.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Hangi sektörlerde çalışıyorsunuz?
              </h3>
              <p className="text-gray-600">
                Teknoloji, sağlık, finans, perakende, eğitim ve enerji başta olmak üzere 
                tüm sektörlerde deneyimimiz bulunmaktadır.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
