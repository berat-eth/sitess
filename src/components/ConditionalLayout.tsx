<<<<<<< HEAD
'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}
      <main className={!isDashboard ? "pt-20 min-h-screen" : ""}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </>
  );
}
=======
'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}
      <main className={!isDashboard ? "pt-20 min-h-screen" : ""}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </>
  );
}
>>>>>>> 4855e23d27390993c3739d0f6d832d04426b1d54
