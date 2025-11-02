'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Dashboard ve admin sayfalarında header/footer gösterme
  const hideLayout = pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin') || pathname?.startsWith('/login') || pathname?.startsWith('/register');
  
  if (hideLayout) {
    return <>{children}</>;
  }
  
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

