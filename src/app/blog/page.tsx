import Link from 'next/link';
import Image from 'next/image';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'Pazar Araştırmasında Yapay Zeka Kullanımı',
      excerpt: 'Yapay zeka teknolojilerinin pazar araştırmalarında nasıl devrim yarattığını ve gelecekteki potansiyelini keşfedin.',
      content: 'Yapay zeka, pazar araştırması alanında büyük bir dönüşüm yaratıyor...',
      author: 'Dr. Mehmet Yılmaz',
      date: '2024-01-15',
      category: 'Teknoloji',
      readTime: '8 dakika',
      image: '/blog/ai-market-research.jpg',
      tags: ['Yapay Zeka', 'Pazar Araştırması', 'Teknoloji']
    },
    {
      id: 2,
      title: 'Sosyal Medya Sentiment Analizinde En İyi Uygulamalar',
      excerpt: 'Sosyal medya verilerinden doğru içgörüler elde etmek için kullanabileceğiniz kanıtlanmış yöntemler.',
      content: 'Sosyal medya sentiment analizi, markaların müşteri algısını anlamalarında kritik rol oynuyor...',
      author: 'Dr. Ayşe Kaya',
      date: '2024-01-10',
      category: 'Sosyal Medya',
      readTime: '6 dakika',
      image: '/blog/sentiment-analysis.jpg',
      tags: ['Sosyal Medya', 'Sentiment Analizi', 'Dijital Pazarlama']
    },
    {
      id: 3,
      title: 'Sağlık Araştırmalarında Etik Kurallar',
      excerpt: 'Sağlık sektöründe araştırma yaparken dikkat edilmesi gereken etik kurallar ve hasta hakları.',
      content: 'Sağlık araştırmaları, insan yaşamını doğrudan etkileyen kritik çalışmalardır...',
      author: 'Dr. Emre Demir',
      date: '2024-01-05',
      category: 'Sağlık',
      readTime: '10 dakika',
      image: '/blog/health-research-ethics.jpg',
      tags: ['Sağlık', 'Etik', 'Araştırma']
    },
    {
      id: 4,
      title: 'Müşteri Segmentasyonunda Yeni Yaklaşımlar',
      excerpt: 'Geleneksel demografik segmentasyonun ötesinde, davranışsal ve psikografik segmentasyon teknikleri.',
      content: 'Müşteri segmentasyonu, pazarlama stratejilerinin temelini oluşturur...',
      author: 'Zeynep Özkan',
      date: '2023-12-28',
      category: 'Pazarlama',
      readTime: '7 dakika',
      image: '/blog/customer-segmentation.jpg',
      tags: ['Segmentasyon', 'Müşteri Analizi', 'Pazarlama']
    },
    {
      id: 5,
      title: 'Veri Gizliliği ve KVKK Uyumluluğu',
      excerpt: 'Araştırma projelerinde kişisel verilerin korunması ve KVKK mevzuatına uyum sağlama rehberi.',
      content: 'Kişisel Verilerin Korunması Kanunu, araştırma şirketleri için yeni sorumluluklar getirdi...',
      author: 'Can Arslan',
      date: '2023-12-20',
      category: 'Hukuk',
      readTime: '9 dakika',
      image: '/blog/data-privacy.jpg',
      tags: ['KVKK', 'Veri Gizliliği', 'Hukuk']
    },
    {
      id: 6,
      title: 'Online Anket Tasarımında Kritik Faktörler',
      excerpt: 'Yüksek yanıt oranı ve kaliteli veri elde etmek için online anket tasarımında dikkat edilecek noktalar.',
      content: 'Online anketler, modern araştırmanın vazgeçilmez araçlarından biri haline geldi...',
      author: 'Elif Şahin',
      date: '2023-12-15',
      category: 'Metodoloji',
      readTime: '5 dakika',
      image: '/blog/survey-design.jpg',
      tags: ['Anket', 'Metodoloji', 'Veri Toplama']
    }
  ];

  const categories = [
    { name: 'Tümü', count: blogPosts.length },
    { name: 'Teknoloji', count: blogPosts.filter(post => post.category === 'Teknoloji').length },
    { name: 'Sosyal Medya', count: blogPosts.filter(post => post.category === 'Sosyal Medya').length },
    { name: 'Sağlık', count: blogPosts.filter(post => post.category === 'Sağlık').length },
    { name: 'Pazarlama', count: blogPosts.filter(post => post.category === 'Pazarlama').length },
    { name: 'Metodoloji', count: blogPosts.filter(post => post.category === 'Metodoloji').length }
  ];

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1, 4);
  const allPosts = blogPosts.slice(4);

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/blog-hero.jpg"
            alt="Writing and research"
            fill
            className="object-cover"
            priority
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/85 via-blue-800/75 to-slate-900/85" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Araştırma Blog
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8">
            Araştırma dünyasından son gelişmeler, metodoloji rehberleri ve 
            sektör analizleri ile bilginizi güncel tutun.
          </p>
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {categories.map((category) => (
              <button
                key={category.name}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 border border-white/20"
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Öne Çıkan Yazı</h2>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="h-64 lg:h-auto bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">Öne Çıkan Makale</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-500 text-sm">{featuredPost.readTime}</span>
                </div>
                
                <h3 className="text-3xl font-bold text-slate-800 mb-4">
                  {featuredPost.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-semibold text-gray-600">
                        {featuredPost.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{featuredPost.author}</p>
                      <p className="text-gray-500 text-sm">{new Date(featuredPost.date).toLocaleDateString('tr-TR')}</p>
                    </div>
                  </div>
                  
                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center group"
                  >
                    Devamını Oku
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Son Yazılar</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">{post.category}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-xs">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                        <span className="text-xs font-semibold text-gray-600">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{post.author}</p>
                        <p className="text-gray-500 text-xs">{new Date(post.date).toLocaleDateString('tr-TR')}</p>
                      </div>
                    </div>
                    
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200"
                    >
                      Oku →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Tüm Yazılar</h2>
          </div>

          <div className="space-y-8">
            {allPosts.map((post) => (
              <article key={post.id} className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                  {/* Image */}
                  <div className="lg:col-span-1">
                    <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm">{post.readTime}</span>
                      <span className="text-gray-500 text-sm">{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-semibold text-gray-600">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <p className="font-semibold text-slate-800">{post.author}</p>
                      </div>
                      
                      <Link
                        href={`/blog/${post.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center group"
                      >
                        Devamını Oku
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Blog Güncellemelerini Kaçırmayın
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Yeni yazılarımızdan haberdar olmak için e-posta listemize katılın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Abone Ol
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
