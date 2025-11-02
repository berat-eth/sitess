const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    filename: 'hero-1.jpg',
    description: 'Data analytics and research'
  },
  {
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
    filename: 'hero-2.jpg',
    description: 'Technology and innovation'
  },
  {
    url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    filename: 'hero-3.jpg',
    description: 'AI and machine learning'
  },
  {
    url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    filename: 'hero-4.jpg',
    description: 'Business and strategy'
  }
];

const imagesDir = path.join(process.cwd(), 'public', 'images');

// Klasörü oluştur
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

console.log('Hero görselleri indiriliyor...\n');

images.forEach((image, index) => {
  const filePath = path.join(imagesDir, image.filename);
  
  // Eğer dosya zaten varsa atla
  if (fs.existsSync(filePath)) {
    console.log(`⏭️  ${image.filename} zaten mevcut, atlanıyor...`);
    return;
  }

  const file = fs.createWriteStream(filePath);
  
  https.get(image.url, (response) => {
    if (response.statusCode === 200) {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✅ ${image.filename} indirildi (${image.description})`);
      });
    } else {
      console.error(`❌ ${image.filename} indirilemedi: ${response.statusCode}`);
      fs.unlinkSync(filePath);
    }
  }).on('error', (err) => {
    console.error(`❌ ${image.filename} indirilemedi:`, err.message);
    fs.unlinkSync(filePath);
  });
});

