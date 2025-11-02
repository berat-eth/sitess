const https = require('https');
const fs = require('fs');
const path = require('path');

const logoUrl = 'https://www.mikarastirma.com/wp-content/uploads/2024/11/logo.png';
const filename = 'logo.png';
const publicDir = path.join(process.cwd(), 'public');
const logoPath = path.join(publicDir, filename);

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log('Logo indiriliyor...\n');

if (fs.existsSync(logoPath)) {
  console.log(`⏭️  ${filename} zaten mevcut, üzerine yazılıyor...`);
}

const file = fs.createWriteStream(logoPath);

https.get(logoUrl, (response) => {
  if (response.statusCode === 200) {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`✅ ${filename} başarıyla indirildi ve ${logoPath} konumuna kaydedildi.`);
    });
  } else {
    console.error(`❌ Logo indirilemedi: ${response.statusCode}`);
    if (fs.existsSync(logoPath)) {
      fs.unlinkSync(logoPath);
    }
  }
}).on('error', (err) => {
  console.error(`❌ Logo indirilemedi:`, err.message);
  if (fs.existsSync(logoPath)) {
    fs.unlinkSync(logoPath);
  }
});

