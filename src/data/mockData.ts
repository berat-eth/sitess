<<<<<<< HEAD
// Kategoriler
export const categories = [
  { id: 1, name: 'Pazar Araştırmaları', slug: 'pazar-arastirmalari' },
  { id: 2, name: 'Müşteri Anketleri', slug: 'musteri-anketleri' },
  { id: 3, name: 'Kamuoyu Yoklamaları', slug: 'kamuoyu-yoklamalari' },
  { id: 4, name: 'Marka Araştırmaları', slug: 'marka-arastirmalari' },
  { id: 5, name: 'Sosyal Araştırmalar', slug: 'sosyal-arastirmalar' },
]

// Anket Verileri
export const surveys = [
  {
    id: 1,
    title: 'Yeni Ürün Tercihleriniz',
    description: 'Müşterilerimizin yeni ürün hattına ilişkin görüşlerini almak için yapılan araştırma',
    category: 'Müşteri Anketleri',
    categoryId: 2,
    respondents: 1250,
    duration: '5-7 dakika',
    image: '📊',
    status: 'Aktif',
  },
  {
    id: 2,
    title: 'Pazar Segmentasyonu 2025',
    description: 'Hedef pazarın detaylı segmentasyon analizi ve tüketici davranış özellikleri',
    category: 'Pazar Araştırmaları',
    categoryId: 1,
    respondents: 3500,
    duration: '10-15 dakika',
    image: '📈',
    status: 'Aktif',
  },
  {
    id: 3,
    title: 'Kamuoyu Sondajı - Eğitim',
    description: 'Eğitim politikaları ve uygulamalarına yönelik genel kamuoyu araştırması',
    category: 'Kamuoyu Yoklamaları',
    categoryId: 3,
    respondents: 2100,
    duration: '8-10 dakika',
    image: '🗳️',
    status: 'Aktif',
  },
  {
    id: 4,
    title: 'Marka Sadakati Analizi',
    description: 'Markamıza karşı müşteri sadakati seviyesinin ve beklentilerinin ölçülmesi',
    category: 'Marka Araştırmaları',
    categoryId: 4,
    respondents: 980,
    duration: '6-8 dakika',
    image: '❤️',
    status: 'Aktif',
  },
  {
    id: 5,
    title: 'Dijital Yaşam Alışkanlıkları',
    description: 'Toplumun sosyal medya ve dijital platform kullanım eğilimlerinin araştırılması',
    category: 'Sosyal Araştırmalar',
    categoryId: 5,
    respondents: 2800,
    duration: '10 dakika',
    image: '💻',
    status: 'Aktif',
  },
  {
    id: 6,
    title: 'Hizmet Kalitesi Değerlendirmesi',
    description: 'Mevcut müşteri hizmet uygulamalarının etkinliği ve iyileştirme alanları',
    category: 'Müşteri Anketleri',
    categoryId: 2,
    respondents: 750,
    duration: '5 dakika',
    image: '⭐',
    status: 'Yakında Başlayacak',
  },
]

// Anket Soruları (Örnek)
export const surveyQuestions = [
  {
    id: 1,
    surveyId: 1,
    question: 'Yeni ürün hattını nasıl buluyorsunuz?',
    type: 'radio',
    options: ['Çok İyi', 'İyi', 'Orta', 'Kötü', 'Çok Kötü'],
  },
  {
    id: 2,
    surveyId: 1,
    question: 'Ürünü satın alma olasılığınız nedir?',
    type: 'radio',
    options: ['Kesinlikle Evet', 'Muhtemelen Evet', 'Kararsız', 'Muhtemelen Hayır', 'Kesinlikle Hayır'],
  },
  {
    id: 3,
    surveyId: 1,
    question: 'Fiyat seviyesi hakkında ne düşünüyorsunuz?',
    type: 'radio',
    options: ['Çok Uygun', 'Uygun', 'Orta', 'Yüksek', 'Çok Yüksek'],
  },
  {
    id: 4,
    surveyId: 2,
    question: 'Yaşınız kaç aralığında?',
    type: 'radio',
    options: ['18-25', '26-35', '36-45', '46-55', '56+'],
  },
  {
    id: 5,
    surveyId: 2,
    question: 'Hangi ürün kategorisinde sıklıkla alışveriş yapıyorsunuz?',
    type: 'checkbox',
    options: ['Elektronik', 'Giyim', 'Ev Eşyaları', 'Gıda', 'Diğer'],
  },
]

// Anket Sonuçları
export const surveyResults = {
  1: [
    { label: 'Çok İyi', value: 45, percentage: 36 },
    { label: 'İyi', value: 38, percentage: 30 },
    { label: 'Orta', value: 25, percentage: 20 },
    { label: 'Kötü', value: 10, percentage: 8 },
    { label: 'Çok Kötü', value: 5, percentage: 6 },
  ],
  2: [
    { label: 'Kesinlikle Evet', value: 52, percentage: 42 },
    { label: 'Muhtemelen Evet', value: 38, percentage: 30 },
    { label: 'Kararsız', value: 20, percentage: 16 },
    { label: 'Muhtemelen Hayır', value: 8, percentage: 7 },
    { label: 'Kesinlikle Hayır', value: 4, percentage: 5 },
  ],
  3: [
    { label: 'Çok Uygun', value: 25, percentage: 20 },
    { label: 'Uygun', value: 65, percentage: 52 },
    { label: 'Orta', value: 25, percentage: 20 },
    { label: 'Yüksek', value: 8, percentage: 6 },
    { label: 'Çok Yüksek', value: 2, percentage: 2 },
  ],
}

// Hakkımızda
export const aboutUs = {
  vision: 'Türkiye\'nin en güvenilir ve yenilikçi araştırma platformu olarak, işletmelere ve kurumlara veri temelli karar almalarını sağlamak.',
  mission: 'Yüksek kaliteli araştırma hizmetleri sunarak, toplumun sesini duyuran ve değişimi teşvik eden bir platform oluşturmak.',
  values: [
    { title: 'Güvenilirlik', description: 'Metodolojisinde ve sonuçlarında tamamen şeffaf ve doğru' },
    { title: 'İnovasyon', description: 'En son teknoloji ve yöntemlerle araştırma yürütüyoruz' },
    { title: 'Profesyonellik', description: 'Uzman ekibimiz endüstri standartlarını korur' },
    { title: 'Katılım', description: 'Toplumun her kesimine sesini duyurma fırsatı veriyoruz' },
  ],
}

// İletişim Bilgileri
export const contactInfo = {
  email: 'iletisim@araststirmalar.com',
  phone: '+90 (212) 555-0123',
  address: 'Levent, İstanbul',
  workingHours: 'Pazartesi - Cuma: 09:00 - 18:00',
}
=======
// Kategoriler
export const categories = [
  { id: 1, name: 'Pazar Araştırmaları', slug: 'pazar-arastirmalari' },
  { id: 2, name: 'Müşteri Anketleri', slug: 'musteri-anketleri' },
  { id: 3, name: 'Kamuoyu Yoklamaları', slug: 'kamuoyu-yoklamalari' },
  { id: 4, name: 'Marka Araştırmaları', slug: 'marka-arastirmalari' },
  { id: 5, name: 'Sosyal Araştırmalar', slug: 'sosyal-arastirmalar' },
]

// Anket Verileri
export const surveys = [
  {
    id: 1,
    title: 'Yeni Ürün Tercihleriniz',
    description: 'Müşterilerimizin yeni ürün hattına ilişkin görüşlerini almak için yapılan araştırma',
    category: 'Müşteri Anketleri',
    categoryId: 2,
    respondents: 1250,
    duration: '5-7 dakika',
    image: '📊',
    status: 'Aktif',
  },
  {
    id: 2,
    title: 'Pazar Segmentasyonu 2025',
    description: 'Hedef pazarın detaylı segmentasyon analizi ve tüketici davranış özellikleri',
    category: 'Pazar Araştırmaları',
    categoryId: 1,
    respondents: 3500,
    duration: '10-15 dakika',
    image: '📈',
    status: 'Aktif',
  },
  {
    id: 3,
    title: 'Kamuoyu Sondajı - Eğitim',
    description: 'Eğitim politikaları ve uygulamalarına yönelik genel kamuoyu araştırması',
    category: 'Kamuoyu Yoklamaları',
    categoryId: 3,
    respondents: 2100,
    duration: '8-10 dakika',
    image: '🗳️',
    status: 'Aktif',
  },
  {
    id: 4,
    title: 'Marka Sadakati Analizi',
    description: 'Markamıza karşı müşteri sadakati seviyesinin ve beklentilerinin ölçülmesi',
    category: 'Marka Araştırmaları',
    categoryId: 4,
    respondents: 980,
    duration: '6-8 dakika',
    image: '❤️',
    status: 'Aktif',
  },
  {
    id: 5,
    title: 'Dijital Yaşam Alışkanlıkları',
    description: 'Toplumun sosyal medya ve dijital platform kullanım eğilimlerinin araştırılması',
    category: 'Sosyal Araştırmalar',
    categoryId: 5,
    respondents: 2800,
    duration: '10 dakika',
    image: '💻',
    status: 'Aktif',
  },
  {
    id: 6,
    title: 'Hizmet Kalitesi Değerlendirmesi',
    description: 'Mevcut müşteri hizmet uygulamalarının etkinliği ve iyileştirme alanları',
    category: 'Müşteri Anketleri',
    categoryId: 2,
    respondents: 750,
    duration: '5 dakika',
    image: '⭐',
    status: 'Yakında Başlayacak',
  },
]

// Anket Soruları (Örnek)
export const surveyQuestions = [
  {
    id: 1,
    surveyId: 1,
    question: 'Yeni ürün hattını nasıl buluyorsunuz?',
    type: 'radio',
    options: ['Çok İyi', 'İyi', 'Orta', 'Kötü', 'Çok Kötü'],
  },
  {
    id: 2,
    surveyId: 1,
    question: 'Ürünü satın alma olasılığınız nedir?',
    type: 'radio',
    options: ['Kesinlikle Evet', 'Muhtemelen Evet', 'Kararsız', 'Muhtemelen Hayır', 'Kesinlikle Hayır'],
  },
  {
    id: 3,
    surveyId: 1,
    question: 'Fiyat seviyesi hakkında ne düşünüyorsunuz?',
    type: 'radio',
    options: ['Çok Uygun', 'Uygun', 'Orta', 'Yüksek', 'Çok Yüksek'],
  },
  {
    id: 4,
    surveyId: 2,
    question: 'Yaşınız kaç aralığında?',
    type: 'radio',
    options: ['18-25', '26-35', '36-45', '46-55', '56+'],
  },
  {
    id: 5,
    surveyId: 2,
    question: 'Hangi ürün kategorisinde sıklıkla alışveriş yapıyorsunuz?',
    type: 'checkbox',
    options: ['Elektronik', 'Giyim', 'Ev Eşyaları', 'Gıda', 'Diğer'],
  },
]

// Anket Sonuçları
export const surveyResults = {
  1: [
    { label: 'Çok İyi', value: 45, percentage: 36 },
    { label: 'İyi', value: 38, percentage: 30 },
    { label: 'Orta', value: 25, percentage: 20 },
    { label: 'Kötü', value: 10, percentage: 8 },
    { label: 'Çok Kötü', value: 5, percentage: 6 },
  ],
  2: [
    { label: 'Kesinlikle Evet', value: 52, percentage: 42 },
    { label: 'Muhtemelen Evet', value: 38, percentage: 30 },
    { label: 'Kararsız', value: 20, percentage: 16 },
    { label: 'Muhtemelen Hayır', value: 8, percentage: 7 },
    { label: 'Kesinlikle Hayır', value: 4, percentage: 5 },
  ],
  3: [
    { label: 'Çok Uygun', value: 25, percentage: 20 },
    { label: 'Uygun', value: 65, percentage: 52 },
    { label: 'Orta', value: 25, percentage: 20 },
    { label: 'Yüksek', value: 8, percentage: 6 },
    { label: 'Çok Yüksek', value: 2, percentage: 2 },
  ],
}

// Hakkımızda
export const aboutUs = {
  vision: 'Türkiye\'nin en güvenilir ve yenilikçi araştırma platformu olarak, işletmelere ve kurumlara veri temelli karar almalarını sağlamak.',
  mission: 'Yüksek kaliteli araştırma hizmetleri sunarak, toplumun sesini duyuran ve değişimi teşvik eden bir platform oluşturmak.',
  values: [
    { title: 'Güvenilirlik', description: 'Metodolojisinde ve sonuçlarında tamamen şeffaf ve doğru' },
    { title: 'İnovasyon', description: 'En son teknoloji ve yöntemlerle araştırma yürütüyoruz' },
    { title: 'Profesyonellik', description: 'Uzman ekibimiz endüstri standartlarını korur' },
    { title: 'Katılım', description: 'Toplumun her kesimine sesini duyurma fırsatı veriyoruz' },
  ],
}

// İletişim Bilgileri
export const contactInfo = {
  email: 'iletisim@araststirmalar.com',
  phone: '+90 (212) 555-0123',
  address: 'Levent, İstanbul',
  workingHours: 'Pazartesi - Cuma: 09:00 - 18:00',
}
>>>>>>> 4855e23d27390993c3739d0f6d832d04426b1d54
