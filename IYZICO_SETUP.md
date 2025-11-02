# iyzico Entegrasyonu Kurulum Rehberi

Bu projede iyzico ödeme entegrasyonu kullanılmaktadır. Aşağıdaki adımları takip ederek sistemi yapılandırın.

## 1. iyzico Hesap Ayarları

1. [iyzico](https://www.iyzico.com) hesabı oluşturun
2. Sandbox (test) veya Production (canlı) ortamına göre API bilgilerinizi alın

## 2. Ortam Değişkenleri

`.env.local` dosyasına aşağıdaki değişkenleri ekleyin:

```env
# iyzico API Bilgileri
IYZICO_API_KEY=your-api-key
IYZICO_SECRET_KEY=your-secret-key
IYZICO_URI=https://api.iyzipay.com  # Production için
# IYZICO_URI=https://sandbox-api.iyzipay.com  # Sandbox için

# Uygulama URL'i
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Development için
# NEXT_PUBLIC_APP_URL=https://yourdomain.com  # Production için
```

### Sandbox (Test) Ortamı
- Test API anahtarları: [iyzico Sandbox](https://sandbox-merchant.iyzipay.com)
- Test kartları: [iyzico Test Kartları](https://dev.iyzipay.com/tr/odeme-alani/test-kartlari)

## 3. Paket Yükleme

```bash
npm install
```

iyzipay paketi `package.json`'a eklenmiştir.

## 4. Özellikler

### Kullanıcı Tarafı
- `/abonelik` - Abonelik planlarını görüntüleme ve ödeme sayfası
- `/abonelik/basarili` - Başarılı ödeme sayfası
- `/abonelik/hata` - Hata sayfası

### Admin Tarafı
- `/admin/subscriptions` - Abonelik yönetim sayfası
  - Abonelik listesi
  - Durum filtreleme
  - Ödeme geçmişi
  - Abonelik iptal etme

### API Endpoints
- `POST /api/subscriptions/create` - Yeni abonelik oluşturma
- `POST /api/subscriptions/callback` - iyzico callback handler
- `GET /api/subscriptions/status` - Abonelik durumu sorgulama

## 5. Güvenlik Notları

1. **API Anahtarları**: Asla API anahtarlarınızı versiyon kontrolüne (Git) eklemeyin
2. **HTTPS**: Production ortamında mutlaka HTTPS kullanın
3. **Webhook Doğrulama**: Production'da iyzico webhook'larını doğrulayın
4. **Kart Bilgileri**: Kart bilgileri asla sunucuda saklanmaz, direkt iyzico'ya gönderilir

## 6. Test Kartları (Sandbox)

### Başarılı Ödemeler
- Kart No: `5528 7900 0000 0000`
- CVV: `123`
- Son Kullanma: `12/24`
- Kart Sahibi: Herhangi bir isim

### Başarısız Ödemeler
- Yetersiz bakiye: `5528 7900 0000 0008`
- Reddedilen kart: `5528 7900 0000 0016`

## 7. Üretim Ortamına Geçiş

1. `.env.local` dosyasındaki `IYZICO_URI` değerini production URL'e güncelleyin
2. Production API anahtarlarınızı ekleyin
3. `NEXT_PUBLIC_APP_URL` değerini gerçek domain'inize güncelleyin
4. Webhook URL'lerini iyzico panelinde yapılandırın
5. SSL sertifikası kurulumunu kontrol edin

## 8. Veritabanı Entegrasyonu

Şu anda sistem mock data kullanmaktadır. Production'da:

1. `src/data/subscriptionData.ts` dosyasındaki mock veriler yerine veritabanı sorguları kullanın
2. `src/app/api/subscriptions/create/route.ts` içinde abonelik kaydını veritabanına kaydedin
3. `src/app/api/subscriptions/callback/route.ts` içinde ödeme sonrası güncellemeleri yapın

## 9. Destek

- [iyzico Dokümantasyon](https://dev.iyzipay.com/tr)
- [iyzico Destek](https://www.iyzico.com/iletisim)

