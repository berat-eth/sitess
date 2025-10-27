<<<<<<< HEAD
'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { contactInfo } from '@/data/mockData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">AraştırmaHub</h3>
            <p className="text-primary-100 text-sm mb-6">
              Türkiye&apos;nin en güvenilir araştırma platformu. Veri temelli kararlar almanızı sağlıyoruz.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-primary-700 hover:bg-accent-500 p-2 rounded-lg transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="bg-primary-700 hover:bg-accent-500 p-2 rounded-lg transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="bg-primary-700 hover:bg-accent-500 p-2 rounded-lg transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="bg-primary-700 hover:bg-accent-500 p-2 rounded-lg transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base mb-4">Hızlı Linkler</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-primary-100 hover:text-accent-500 transition-colors"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/surveys"
                  className="text-primary-100 hover:text-accent-500 transition-colors"
                >
                  Anketlere Katıl
                </Link>
              </li>
              <li>
                <Link
                  href="/results"
                  className="text-primary-100 hover:text-accent-500 transition-colors"
                >
                  Sonuçlar
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-primary-100 hover:text-accent-500 transition-colors"
                >
                  Hakkımızda
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-base mb-4">Hizmetlerimiz</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-primary-100 hover:text-accent-500 transition-colors"
                >
                  Pazar Araştırmaları
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-100 hover:text-accent-500 transition-colors"
                >
                  Müşteri Anketleri
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-100 hover:text-accent-500 transition-colors"
                >
                  Kamuoyu Yoklamaları
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-100 hover:text-accent-500 transition-colors"
                >
                  Analiz Raporları
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-base mb-4">İletişim</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-accent-500 mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-primary-100 hover:text-accent-500 transition-colors text-sm"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-accent-500 mt-0.5 flex-shrink-0" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-primary-100 hover:text-accent-500 transition-colors text-sm"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent-500 mt-0.5 flex-shrink-0" />
                <span className="text-primary-100 text-sm">{contactInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-700 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-primary-200 text-sm">
          <p>&copy; {currentYear} AraştırmaHub. Tüm hakları saklıdır.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent-500 transition-colors">
              Gizlilik Politikası
            </a>
            <a href="#" className="hover:text-accent-500 transition-colors">
              Kullanım Şartları
            </a>
            <a href="#" className="hover:text-accent-500 transition-colors">
              İletişim
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
=======
'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { contactInfo } from '@/data/mockData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">AraştırmaHub</h3>
            <p className="text-primary-100 text-sm mb-6">
              Türkiye'nin en güvenilir araştırma platformu. Veri temelli kararlar almanızı sağlıyoruz.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-primary-700 hover:bg-accent-500 p-2 rounded-lg transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="bg-primary-700 hover:bg-accent-500 p-2 rounded-lg transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="bg-primary-700 hover:bg-accent-500 p-2 rounded-lg transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="bg-primary-700 hover:bg-accent-500 p-2 rounded-lg transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base mb-4">Hızlı Linkler</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-primary-100 hover:text-accent-500 transition-colors"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/surveys"
                  className="text-primary-100 hover:text-accent-500 transition-colors"
                >
                  Anketlere Katıl
                </Link>
              </li>
              <li>
                <Link
                  href="/results"
                  className="text-primary-100 hover:text-accent-500 transition-colors"
                >
                  Sonuçlar
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-primary-100 hover:text-accent-500 transition-colors"
                >
                  Hakkımızda
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-base mb-4">Hizmetlerimiz</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-primary-100 hover:text-accent-500 transition-colors"
                >
                  Pazar Araştırmaları
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-100 hover:text-accent-500 transition-colors"
                >
                  Müşteri Anketleri
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-100 hover:text-accent-500 transition-colors"
                >
                  Kamuoyu Yoklamaları
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-100 hover:text-accent-500 transition-colors"
                >
                  Analiz Raporları
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-base mb-4">İletişim</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-accent-500 mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-primary-100 hover:text-accent-500 transition-colors text-sm"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-accent-500 mt-0.5 flex-shrink-0" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-primary-100 hover:text-accent-500 transition-colors text-sm"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent-500 mt-0.5 flex-shrink-0" />
                <span className="text-primary-100 text-sm">{contactInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-700 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-primary-200 text-sm">
          <p>&copy; {currentYear} AraştırmaHub. Tüm hakları saklıdır.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent-500 transition-colors">
              Gizlilik Politikası
            </a>
            <a href="#" className="hover:text-accent-500 transition-colors">
              Kullanım Şartları
            </a>
            <a href="#" className="hover:text-accent-500 transition-colors">
              İletişim
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
>>>>>>> 4855e23d27390993c3739d0f6d832d04426b1d54
