<<<<<<< HEAD
import type { Metadata } from 'next';
import ConditionalLayout from '@/components/ConditionalLayout';
import './globals.css';

export const metadata: Metadata = {
  title: 'AraştırmaHub - Güvenilir Araştırmalar, Gerçek Sonuçlar',
  description: 'Türkiye\'nin en güvenilir araştırma platformu. Pazar araştırmaları, müşteri anketleri ve kamuoyu yoklamalarıyla işletmenize yardımcı oluyoruz.',
  keywords: 'araştırma, anket, pazar araştırması, kamuoyu yoklaması',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-slate-50">
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
=======
import type { Metadata } from 'next';
import ConditionalLayout from '@/components/ConditionalLayout';
import './globals.css';

export const metadata: Metadata = {
  title: 'AraştırmaHub - Güvenilir Araştırmalar, Gerçek Sonuçlar',
  description: 'Türkiye\'nin en güvenilir araştırma platformu. Pazar araştırmaları, müşteri anketleri ve kamuoyu yoklamalarıyla işletmenize yardımcı oluyoruz.',
  keywords: 'araştırma, anket, pazar araştırması, kamuoyu yoklaması',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-slate-50">
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
>>>>>>> 4855e23d27390993c3739d0f6d832d04426b1d54
