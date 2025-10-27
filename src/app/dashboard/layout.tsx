'use client';

import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  // Determine current page from URL
  const currentPage = params?.page?.[0] || 'home';
  const pageMap: { [key: string]: string } = {
    undefined: 'home',
    '': 'home',
    'surveys': 'surveys',
    'analysis': 'analysis',
    'charts': 'charts',
    'design': 'design',
    'mik': 'mik',
    'payments': 'payments',
    'results': 'results',
    'profile': 'profile',
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar currentPage={pageMap[currentPage] || 'home'} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden lg:ml-0">
        {/* Header */}
        <DashboardHeader />

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
