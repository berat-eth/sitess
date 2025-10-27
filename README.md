# AraştırmaHub - Modern Araştırma Platformu

Türkiye'nin en güvenilir araştırma platformu! Profesyonel, modern ve kullanıcı dostu bir web sitesi.

## 🎯 Proje Hakkında

**AraştırmaHub**, kurumsal bir araştırma şirketi web sitesidir. Platform, pazar araştırmaları, müşteri anketleri, kamuoyu yoklamaları ve marka araştırmalarını yönetmek için tasarlanmıştır.

### ✨ Özellikler

- ✅ **Duyarlı Tasarım**: Mobil, tablet ve masaüstüne tam uyumlu
- ✅ **Modern UI/UX**: Tailwind CSS ile profesyonel görünüm
- ✅ **Akıcı Animasyonlar**: Framer Motion ile sayfa geçişleri ve hover efektleri
- ✅ **Anket Yönetimi**: Anket oluşturma, düzenleme ve izleme
- ✅ **Gerçek Zamanlı Sonuçlar**: Grafik ve istatistiklerle analiz
- ✅ **Filtreleme Sistemi**: Kategoriye göre anketleri filtreleyin
- ✅ **Mock Data**: Backend bağlantısı olmadan tam işlevsel

## 🛠️ Teknoloji Stack

- **Framework**: Next.js 14
- **Dil**: TypeScript
- **Stil**: Tailwind CSS
- **Animasyonlar**: Framer Motion
- **Grafikler**: Recharts
- **İkonlar**: Lucide React
- **Paket Yöneticisi**: npm

## 📁 Proje Yapısı

```
research-platform/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Ana sayfa
│   │   ├── surveys/
│   │   │   └── page.tsx            # Anketler sayfası
│   │   ├── survey/
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Anket doldurma sayfası
│   │   ├── results/
│   │   │   └── page.tsx            # Sonuçlar sayfası
│   │   ├── about/
│   │   │   └── page.tsx            # Hakkımızda sayfası
│   │   └── globals.css             # Global stillar
│   ├── components/
│   │   ├── Navbar.tsx              # Navigasyon bar
│   │   ├── Footer.tsx              # Alt bilgi
│   │   ├── HeroSection.tsx         # Ana başlık bölümü
│   │   ├── ServicesSection.tsx     # Hizmetler bölümü
│   │   ├── AboutSectionPreview.tsx # Hakkımızda önizlemesi
│   │   └── SurveyCard.tsx          # Anket kartı
│   └── data/
│       └── mockData.ts             # Mock veriler
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── next.config.js
```

## 🚀 Başlangıç

### Kurulum

1. **Projeyi klonlayın** (veya zip dosyasından çıkartın):
```bash
cd research-platform
```

2. **Bağımlılıkları yükleyin**:
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın**:
```bash
npm run dev
```

4. **Tarayıcınızda açın**:
```
http://localhost:3000
```

### Build İçin

```bash
npm run build
npm start
```

## 📄 Sayfalar

### Ana Sayfa (`/`)
- Hero başlığı ve CTA butonları
- Hizmetler/kategoriler bölümü
- Hakkımızda özeti
- İstatistikler

### Anketler Sayfası (`/surveys`)
- Tüm aktif anketleri listele
- Kategoriye göre filtreleme
- Her anketin detayları (başlık, açıklama, süre, katılımcı sayısı)
- "Katıl" butonları

### Anket Doldurma (`/survey/:id`)
- Çoktan seçmeli sorular
- Checkbox (çoklu seçim) seçenekleri
- İlerleme göstergesi
- Teşekkürler mesajı (gönderimi sonrası)

### Sonuçlar Sayfası (`/results`)
- Bar grafikler (Recharts)
- Yüzde barları
- İstatistikler ve özet bilgiler
- Anketlere katıl CTA

### Hakkımızda (`/about`)
- Vizyon ve Misyon
- Değerlerimiz
- İletişim bilgileri
- İletişim formu

## 🎨 Tasarım Sistemi

### Renk Paleti

- **Primary**: Lacivert (#0d1e3c - #406eb4)
- **Accent**: Turuncu (#f97316)
- **Slate**: Gri tonları
- **Success**: Yeşil (#10b981)

### Tipografi

- **Font Family**: Inter, Roboto, Poppins
- **Headings**: Bold (700)
- **Body**: Regular (400)

### Bileşen Kuralları

- `.btn-primary`: Birincil buton (Lacivert arka plan)
- `.btn-secondary`: İkincil buton (Border stili)
- `.btn-accent`: Vurgu buton (Turuncu)
- `.card`: Standart kart bileşeni
- `.section-title`: Bölüm başlığı
- `.section-subtitle`: Bölüm alt başlığı

## 📊 Mock Veriler

Tüm veriler `src/data/mockData.ts` dosyasında saklanmaktadır:

- **surveys**: Anket listesi
- **categories**: Anket kategorileri
- **surveyQuestions**: Soruların listesi
- **surveyResults**: Anket sonuçları
- **aboutUs**: Hakkımızda bilgileri
- **contactInfo**: İletişim bilgileri

## 🔧 Özelleştirme

### Anket Ekleme

`mockData.ts` dosyasında `surveys` array'ine yeni anket ekleyin:

```typescript
{
  id: 7,
  title: 'Yeni Anket',
  description: 'Anket açıklaması',
  category: 'Kategori Adı',
  categoryId: 1,
  respondents: 0,
  duration: '5-7 dakika',
  image: '📊',
  status: 'Aktif',
}
```

### Soru Ekleme

Yeni anket sorularını `surveyQuestions` array'ine ekleyin:

```typescript
{
  id: 10,
  surveyId: 7,
  question: 'Sorunuz?',
  type: 'radio', // veya 'checkbox'
  options: ['Seçenek 1', 'Seçenek 2', 'Seçenek 3'],
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎥 Animasyon Sistemleri

- **Giriş Animasyonları**: Fade in, Slide up
- **Hover Efektleri**: Scale, Translate
- **Grafik Animasyonları**: Progressive loading
- **Sayfa Geçişleri**: Smooth transitions

## 📝 Lisans

Bu proje açık kaynak olarak hazırlanmıştır.

## 💬 İletişim

- **E-posta**: iletisim@araststirmalar.com
- **Telefon**: +90 (212) 555-0123
- **Adres**: Levent, İstanbul

---

**Yapılış Tarihi**: 2025
**Sürüm**: 1.0.0
"# sites" 
