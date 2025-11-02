# Backend Kurulum Rehberi

Node.js backend API'nin kurulumu ve kullanımı için detaylı rehber.

## Hızlı Başlangıç

### 1. Backend Klasörüne Git

```bash
cd backend
```

### 2. Bağımlılıkları Yükle

```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarla

`.env.example` dosyasını `.env` olarak kopyalayın:

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin ve MySQL veritabanı bilgilerinizi girin:

```env
DB_HOST=your-mysql-host.com
DB_PORT=3306
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=research_platform

JWT_SECRET=your-very-secret-jwt-key-min-32-characters
JWT_REFRESH_SECRET=your-very-secret-refresh-key-min-32-characters
```

### 4. Veritabanı Migration'larını Çalıştır

```bash
npm run migrate
```

Bu komut tüm veritabanı tablolarını oluşturur.

### 5. Backend Sunucusunu Başlat

Development modu:
```bash
npm run dev
```

Production modu:
```bash
npm start
```

Backend sunucu `http://localhost:5000` adresinde çalışacak.

## Frontend Entegrasyonu

### Ortam Değişkeni Ekle

Next.js projenizin root dizininde `.env.local` dosyasına backend URL'ini ekleyin:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### API Client Kullanımı

Frontend'de `src/services/api.ts` dosyasındaki `apiClient` kullanılabilir:

```typescript
import apiClient from '@/services/api';

// Kullanıcı kaydı
await apiClient.register({
  name: 'Ahmet Yılmaz',
  email: 'ahmet@example.com',
  password: 'securepassword123'
});

// Giriş yap
await apiClient.login('ahmet@example.com', 'securepassword123');

// API anahtarı oluştur (JWT token gerekli)
await apiClient.createApiKey({
  name: 'Production API Key',
  description: 'Main API key',
  rate_limit: 1000
});

// API key ile proje listele
apiClient.setApiKey('rpk_xxxxxxxxxxxxx');
await apiClient.listProjects();
```

## Veritabanı Yapısı

### Tablolar

1. **users** - Kullanıcı bilgileri
2. **api_keys** - Kullanıcı API anahtarları
3. **subscriptions** - Abonelik bilgileri
4. **projects** - Araştırma projeleri
5. **reports** - Raporlar
6. **payments** - Ödeme geçmişi
7. **api_logs** - API kullanım logları

### phpMyAdmin ile Bağlantı

1. phpMyAdmin'e giriş yapın
2. Yeni bir veritabanı oluşturun: `research_platform`
3. `.env` dosyasındaki bilgileri phpMyAdmin sunucunuzun bilgileriyle eşleştirin
4. Migration'ları çalıştırın: `npm run migrate`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Giriş (JWT token döner)
- `POST /api/auth/refresh` - Token yenile
- `GET /api/auth/profile` - Profil bilgileri

### API Keys (JWT gerekli)

- `GET /api/api-keys` - Anahtarları listele
- `POST /api/api-keys` - Yeni anahtar oluştur
- `PUT /api/api-keys/:id` - Anahtar güncelle
- `DELETE /api/api-keys/:id` - Anahtar sil

### Subscriptions (JWT veya API Key)

- `GET /api/subscriptions` - Abonelikleri listele
- `POST /api/subscriptions` - Yeni abonelik oluştur

### Projects (JWT veya API Key)

- `GET /api/projects` - Projeleri listele
- `POST /api/projects` - Yeni proje oluştur
- `PUT /api/projects/:id` - Proje güncelle
- `DELETE /api/projects/:id` - Proje sil

### Reports (JWT veya API Key)

- `GET /api/reports` - Raporları listele
- `GET /api/reports/:id/download` - Rapor indir

### Payments (JWT veya API Key)

- `GET /api/payments` - Ödeme geçmişi

## Güvenlik Notları

1. **Production'da mutlaka güçlü JWT_SECRET kullanın** (en az 32 karakter)
2. **HTTPS kullanın**
3. **CORS ayarlarını production domain'inize göre yapın**
4. **Veritabanı bilgilerini asla Git'e commit etmeyin**
5. **.env dosyasını .gitignore'a eklediğinizden emin olun**

## Sorun Giderme

### Veritabanı Bağlantı Hatası

- MySQL sunucusunun çalıştığından emin olun
- `.env` dosyasındaki bilgileri kontrol edin
- Firewall ayarlarını kontrol edin (uzak MySQL için)
- phpMyAdmin'de veritabanının oluşturulduğundan emin olun

### Migration Hataları

- Veritabanının boş olduğundan emin olun
- SQL syntax hatalarını kontrol edin
- Yetki sorunlarını kontrol edin

### Port Çakışması

Eğer 5000 portu kullanılıyorsa, `.env` dosyasında `PORT` değerini değiştirin:

```env
PORT=5001
```

## Daha Fazla Bilgi

Detaylı API dokümantasyonu için `backend/README.md` dosyasına bakın.
