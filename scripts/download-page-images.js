const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  // Hizmetler sayfası
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    filename: 'services-hero.jpg',
    description: 'Market research and data analysis'
  },
  {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80',
    filename: 'services-analysis.jpg',
    description: 'Data analytics and charts'
  },
  
  // Hakkımızda sayfası
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    filename: 'about-hero.jpg',
    description: 'Professional business team'
  },
  {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    filename: 'about-team.jpg',
    description: 'Team collaboration'
  },
  
  // Ekip sayfası
  {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    filename: 'team-hero.jpg',
    description: 'Professional team meeting'
  },
  {
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    filename: 'team-office.jpg',
    description: 'Modern office workspace'
  },
  
  // Referanslar sayfası
  {
    url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80',
    filename: 'references-hero.jpg',
    description: 'Business handshake and partnership'
  },
  {
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2092&q=80',
    filename: 'references-success.jpg',
    description: 'Success and achievement'
  },
  
  // Blog sayfası
  {
    url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
    filename: 'blog-hero.jpg',
    description: 'Writing and research'
  },
  {
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
    filename: 'blog-research.jpg',
    description: 'Research and analysis'
  },
  
  // İletişim sayfası
  {
    url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    filename: 'contact-hero.jpg',
    description: 'Contact and communication'
  },
  {
    url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    filename: 'contact-office.jpg',
    description: 'Modern office space'
  }
];

const imagesDir = path.join(process.cwd(), 'public', 'images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

console.log('Sayfa görselleri indiriliyor...\n');

images.forEach((image, index) => {
  const filePath = path.join(imagesDir, image.filename);

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
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
});

