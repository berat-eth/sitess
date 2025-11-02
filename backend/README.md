# Research Platform Backend API

Node.js tabanlı modüler REST API backend uygulaması. Express.js, MySQL ve JWT/API Key kimlik doğrulama kullanır.

## Özellikler

- 🔐 Çift katmanlı kimlik doğrulama (JWT + API Key)
- 🔑 Kullanıcı bazlı API anahtarı yönetimi
- 📊 Modüler API yapısı
- 🛡️ Güvenlik: Rate limiting, CORS, Helmet, Input validation
- 📝 API kullanım logları
- 🗄️ MySQL veritabanı desteği

## Kurulum

### 1. Bağımlılıkları Yükle

```bash
cd backend
npm install
```

### 2. Ortam Değişkenlerini Ayarla

`.env.example` dosyasını `.env` olarak kopyalayın ve değerleri doldurun:

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MySQL Database Configuration
DB_HOST=your-mysql-host
DB_PORT=3306
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=research_platform
DB_CONNECTION_LIMIT=10

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_REFRESH_EXPIRE=30d

# API Configuration
API_PREFIX=/api
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Veritabanı Migration'larını Çalıştır

```bash
npm run migrate
```

Bu komut tüm migration dosyalarını çalıştırarak veritabanı tablolarını oluşturur.

### 4. Sunucuyu Başlat

Development modu:
```bash
npm run dev
```

Production modu:
```bash
npm start
```

Sunucu varsayılan olarak `http://localhost:5000` adresinde çalışacak.

## API Endpoints

### Authentication (JWT)

- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Giriş yap (JWT token al)
- `POST /api/auth/refresh` - Token yenile
- `POST /api/auth/logout` - Çıkış yap
- `GET /api/auth/profile` - Kullanıcı profili (JWT gerekli)

### API Keys (JWT gerekli)

- `GET /api/api-keys` - API anahtarlarını listele
- `POST /api/api-keys` - Yeni API anahtarı oluştur
- `PUT /api/api-keys/:id` - API anahtarı güncelle
- `DELETE /api/api-keys/:id` - API anahtarı sil
- `POST /api/api-keys/:id/revoke` - API anahtarı iptal et

### Subscriptions (JWT veya API Key)

- `GET /api/subscriptions` - Abonelikleri listele
- `GET /api/subscriptions/:id` - Abonelik detayı
- `POST /api/subscriptions` - Yeni abonelik oluştur
- `PUT /api/subscriptions/:id` - Abonelik güncelle

### Projects (JWT veya API Key)

- `GET /api/projects` - Projeleri listele
- `GET /api/projects/:id` - Proje detayı
- `POST /api/projects` - Yeni proje oluştur
- `PUT /api/projects/:id` - Proje güncelle
- `DELETE /api/projects/:id` - Proje sil

### Reports (JWT veya API Key)

- `GET /api/reports` - Raporları listele
- `GET /api/reports/:id` - Rapor detayı
- `GET /api/reports/:id/download` - Rapor indir

### Payments (JWT veya API Key)

- `GET /api/payments` - Ödeme geçmişi
- `GET /api/payments/:id` - Ödeme detayı

## Kimlik Doğrulama

### JWT Authentication

Dashboard ve yönetim işlemleri için JWT kullanılır. İsteklerde `Authorization` header'ında Bearer token gönderilir:

```
Authorization: Bearer <jwt_token>
```

### API Key Authentication

Harici entegrasyonlar için API key kullanılır. İsteklerde `X-API-Key` header'ında veya `Authorization` header'ında gönderilir:

```
X-API-Key: rpk_xxxxxxxxxxxxx
```

veya

```
Authorization: Bearer rpk_xxxxxxxxxxxxx
```

## Kullanım Örnekleri

### Kullanıcı Kaydı

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "password": "securepassword123"
  }'
```

### Giriş Yap

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ahmet@example.com",
    "password": "securepassword123"
  }'
```

### API Anahtarı Oluştur

```bash
curl -X POST http://localhost:5000/api/api-keys \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production API Key",
    "description": "Main API key for production use",
    "rate_limit": 1000
  }'
```

### API Key ile İstek

```bash
curl -X GET http://localhost:5000/api/projects \
  -H "X-API-Key: rpk_xxxxxxxxxxxxx"
```

## Yanıt Formatı

Tüm başarılı yanıtlar şu formattadır:

```json
{
  "success": true,
  "message": "İşlem başarılı",
  "data": { ... }
}
```

Sayfalama yanıtları:

```json
{
  "success": true,
  "message": "İşlem başarılı",
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

Hata yanıtları:

```json
{
  "success": false,
  "message": "Hata mesajı",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

## Rate Limiting

API key bazlı rate limiting desteklenir. Her API key için özel rate limit ayarlanabilir. Varsayılan limit: 100 istek / 15 dakika.

## Logging

Tüm API istekleri `api_logs` tablosunda loglanır. Bu loglar:
- Endpoint
- Method
- Status code
- Response time
- IP address
- User agent
- Request body (GET hariç)

## Güvenlik Notları

1. **Production'da mutlaka güçlü JWT_SECRET kullanın**
2. **HTTPS kullanın**
3. **Rate limiting ayarlarını production için optimize edin**
4. **CORS ayarlarını sadece gerekli origin'lere izin verecek şekilde yapın**
5. **Veritabanı bağlantı bilgilerini asla commit etmeyin**

## Geliştirme

### Yeni Migration Ekleme

`migrations/` klasörüne yeni SQL dosyası ekleyin (örn: `008_new_table.sql`). Migration'lar alfabetik sıraya göre çalıştırılır.

### Yeni Route Ekleme

1. `src/routes/` klasörüne route dosyası ekleyin
2. Controller oluşturun
3. `src/app.js` içinde route'u import edin ve ekleyin

## Sorun Giderme

### Veritabanı Bağlantı Hatası

- MySQL sunucusunun çalıştığından emin olun
- `.env` dosyasındaki veritabanı bilgilerini kontrol edin
- Firewall ayarlarını kontrol edin (uzak MySQL için)

### Migration Hataları

- Migration dosyalarının doğru sırada olduğundan emin olun
- `migrations` tablosunun mevcut olduğundan emin olun
- SQL syntax hatalarını kontrol edin

## Lisans

ISC
