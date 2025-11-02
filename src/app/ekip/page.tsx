import Link from 'next/link';
import Image from 'next/image';

export default function EkipPage() {
  const teamMembers = [
    {
      name: 'Dr. Mehmet Yılmaz',
      position: 'Genel Müdür & Kurucu',
      department: 'Yönetim',
      education: 'PhD İstatistik, Boğaziçi Üniversitesi',
      experience: '20+ yıl araştırma deneyimi',
      specialties: ['Pazar Araştırması', 'İstatistiksel Analiz', 'Proje Yönetimi'],
      image: '/team/mehmet-yilmaz.jpg',
      linkedin: '#',
      email: 'mehmet.yilmaz@mikarastirma.com'
    },
    {
      name: 'Dr. Ayşe Kaya',
      position: 'Araştırma Direktörü',
      department: 'Araştırma',
      education: 'PhD Sosyoloji, İstanbul Üniversitesi',
      experience: '15+ yıl akademik ve sektör deneyimi',
      specialties: ['Nitel Araştırma', 'Sosyal Medya Analizi', 'Tüketici Davranışı'],
      image: '/team/ayse-kaya.jpg',
      linkedin: '#',
      email: 'ayse.kaya@mikarastirma.com'
    },
    {
      name: 'Dr. Emre Demir',
      position: 'Sağlık Araştırmaları Uzmanı',
      department: 'Sağlık',
      education: 'MD & PhD Halk Sağlığı, Hacettepe Üniversitesi',
      experience: '12+ yıl klinik ve araştırma deneyimi',
      specialties: ['Klinik Araştırmalar', 'Epidemiyoloji', 'Sağlık Teknolojileri'],
      image: '/team/emre-demir.jpg',
      linkedin: '#',
      email: 'emre.demir@mikarastirma.com'
    },
    {
      name: 'Zeynep Özkan',
      position: 'Veri Analisti',
      department: 'Teknoloji',
      education: 'Yüksek Lisans Veri Bilimi, ODTÜ',
      experience: '8+ yıl veri analizi deneyimi',
      specialties: ['Büyük Veri', 'Machine Learning', 'Veri Görselleştirme'],
      image: '/team/zeynep-ozkan.jpg',
      linkedin: '#',
      email: 'zeynep.ozkan@mikarastirma.com'
    },
    {
      name: 'Can Arslan',
      position: 'Dijital Araştırma Uzmanı',
      department: 'Dijital',
      education: 'Yüksek Lisans Pazarlama, Koç Üniversitesi',
      experience: '10+ yıl dijital pazarlama deneyimi',
      specialties: ['Sosyal Medya', 'SEO Analizi', 'Dijital Pazarlama'],
      image: '/team/can-arslan.jpg',
      linkedin: '#',
      email: 'can.arslan@mikarastirma.com'
    },
    {
      name: 'Elif Şahin',
      position: 'Proje Koordinatörü',
      department: 'Operasyon',
      education: 'Lisans İşletme, Bilgi Üniversitesi',
      experience: '7+ yıl proje yönetimi deneyimi',
      specialties: ['Proje Yönetimi', 'Müşteri İlişkileri', 'Kalite Kontrol'],
      image: '/team/elif-sahin.jpg',
      linkedin: '#',
      email: 'elif.sahin@mikarastirma.com'
    }
  ];

  const departments = [
    {
      name: 'Yönetim',
      color: 'blue',
      count: teamMembers.filter(member => member.department === 'Yönetim').length
    },
    {
      name: 'Araştırma',
      color: 'green',
      count: teamMembers.filter(member => member.department === 'Araştırma').length
    },
    {
      name: 'Sağlık',
      color: 'purple',
      count: teamMembers.filter(member => member.department === 'Sağlık').length
    },
    {
      name: 'Teknoloji',
      color: 'orange',
      count: teamMembers.filter(member => member.department === 'Teknoloji').length
    },
    {
      name: 'Dijital',
      color: 'pink',
      count: teamMembers.filter(member => member.department === 'Dijital').length
    },
    {
      name: 'Operasyon',
      color: 'indigo',
      count: teamMembers.filter(member => member.department === 'Operasyon').length
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    green: 'bg-green-100 text-green-600 border-green-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200',
    orange: 'bg-orange-100 text-orange-600 border-orange-200',
    pink: 'bg-pink-100 text-pink-600 border-pink-200',
    indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200'
  };

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/team-hero.jpg"
            alt="Professional team meeting"
            fill
            className="object-cover"
            priority
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/85 via-blue-800/75 to-slate-900/85" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Uzman Ekibimiz
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8">
            Farklı disiplinlerden gelen deneyimli araştırmacılarımız, 
            her projede en yüksek kalitede sonuçlar elde etmek için çalışıyor.
          </p>
          
          {/* Department Stats */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {departments.map((dept) => (
              <div 
                key={dept.name} 
                className="px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white font-medium"
              >
                {dept.name} ({dept.count})
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-white relative">
        <div className="absolute left-0 top-0 bottom-0 w-1/3 hidden lg:block opacity-5">
          <Image
            src="/images/team-office.jpg"
            alt="Modern office workspace"
            fill
            className="object-cover"
            unoptimized={true}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Profile Image Placeholder */}
                <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-2">{member.position}</p>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colorClasses[departments.find(d => d.name === member.department)?.color as keyof typeof colorClasses || 'blue']}`}>
                      {member.department}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Eğitim:</p>
                      <p className="text-sm text-gray-600">{member.education}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Deneyim:</p>
                      <p className="text-sm text-gray-600">{member.experience}</p>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">Uzmanlık Alanları:</p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex space-x-3">
                    <a 
                      href={`mailto:${member.email}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-center"
                    >
                      E-posta
                    </a>
                    <a 
                      href={member.linkedin}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
            <div className="bg-blue-100 text-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Ekibimize Katılın
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Araştırma alanında kariyer yapmak isteyen yetenekli profesyonelleri 
              ekibimizde görmekten mutluluk duyarız.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Sürekli Öğrenme</h3>
                <p className="text-gray-600">Eğitim ve gelişim fırsatları</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">İnovatif Projeler</h3>
                <p className="text-gray-600">Cutting-edge teknolojiler</p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Takım Ruhu</h3>
                <p className="text-gray-600">Destekleyici çalışma ortamı</p>
              </div>
            </div>
            
            <Link
              href="/iletisim"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 inline-flex items-center"
            >
              Başvuru Yapın
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ekibimizle Tanışmak İster misiniz?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Uzman ekibimizle projenizi görüşmek ve en uygun çözümü bulmak için 
            bizimle iletişime geçin.
          </p>
          <Link
            href="/iletisim"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
          >
            İletişime Geçin
          </Link>
        </div>
      </section>
    </div>
  );
}
