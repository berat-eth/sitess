export interface Project {
  id: string;
  title: string;
  type: 'market' | 'social' | 'health';
  status: 'active' | 'completed' | 'pending' | 'cancelled';
  progress: number;
  startDate: string;
  endDate?: string;
  budget: number;
  description: string;
  client: string;
}

export interface Report {
  id: string;
  title: string;
  projectId: string;
  type: 'pdf' | 'excel' | 'powerpoint';
  size: string;
  createdAt: string;
  downloadUrl: string;
  status: 'ready' | 'processing' | 'failed';
}

export interface Payment {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
  description: string;
  downloadUrl: string;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalRevenue: number;
  monthlyGrowth: number;
  pendingPayments: number;
}

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-Ticaret Müşteri Memnuniyet Araştırması',
    type: 'market',
    status: 'active',
    progress: 75,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    budget: 15000,
    description: 'Online alışveriş deneyimi ve müşteri memnuniyeti analizi',
    client: 'TechShop A.Ş.'
  },
  {
    id: '2',
    title: 'Sosyal Medya Trend Analizi',
    type: 'social',
    status: 'active',
    progress: 45,
    startDate: '2024-01-20',
    endDate: '2024-03-01',
    budget: 22000,
    description: 'Instagram ve TikTok platformlarında marka algısı araştırması',
    client: 'Fashion Brand Ltd.'
  },
  {
    id: '3',
    title: 'Sağlık Uygulaması Kullanıcı Davranış Analizi',
    type: 'health',
    status: 'completed',
    progress: 100,
    startDate: '2023-12-01',
    endDate: '2024-01-10',
    budget: 18500,
    description: 'Mobil sağlık uygulaması kullanım alışkanlıkları',
    client: 'HealthTech Inc.'
  },
  {
    id: '4',
    title: 'Gıda Sektörü Pazar Araştırması',
    type: 'market',
    status: 'pending',
    progress: 0,
    startDate: '2024-02-01',
    endDate: '2024-04-01',
    budget: 35000,
    description: 'Organik gıda tüketim eğilimleri ve pazar potansiyeli',
    client: 'Organic Foods Co.'
  },
  {
    id: '5',
    title: 'Dijital Bankacılık Kullanıcı Deneyimi',
    type: 'market',
    status: 'active',
    progress: 30,
    startDate: '2024-01-25',
    endDate: '2024-03-15',
    budget: 28000,
    description: 'Mobil bankacılık uygulaması UX/UI değerlendirmesi',
    client: 'Digital Bank A.Ş.'
  }
];

export const mockReports: Report[] = [
  {
    id: '1',
    title: 'Sağlık Uygulaması - Final Raporu',
    projectId: '3',
    type: 'pdf',
    size: '2.4 MB',
    createdAt: '2024-01-10',
    downloadUrl: '#',
    status: 'ready'
  },
  {
    id: '2',
    title: 'E-Ticaret Araştırması - Ara Rapor',
    projectId: '1',
    type: 'powerpoint',
    size: '5.1 MB',
    createdAt: '2024-01-28',
    downloadUrl: '#',
    status: 'ready'
  },
  {
    id: '3',
    title: 'Sosyal Medya Analizi - Veri Seti',
    projectId: '2',
    type: 'excel',
    size: '12.8 MB',
    createdAt: '2024-01-25',
    downloadUrl: '#',
    status: 'processing'
  },
  {
    id: '4',
    title: 'Bankacılık UX - Kullanıcı Testleri',
    projectId: '5',
    type: 'pdf',
    size: '3.7 MB',
    createdAt: '2024-01-30',
    downloadUrl: '#',
    status: 'ready'
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    amount: 18500,
    status: 'paid',
    dueDate: '2024-01-15',
    paidDate: '2024-01-12',
    description: 'Sağlık Uygulaması Kullanıcı Davranış Analizi',
    downloadUrl: '#'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    amount: 7500,
    status: 'paid',
    dueDate: '2024-01-30',
    paidDate: '2024-01-28',
    description: 'E-Ticaret Araştırması - İlk Ödeme',
    downloadUrl: '#'
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    amount: 11000,
    status: 'pending',
    dueDate: '2024-02-15',
    description: 'Sosyal Medya Trend Analizi - İlk Ödeme',
    downloadUrl: '#'
  },
  {
    id: '4',
    invoiceNumber: 'INV-2024-004',
    amount: 14000,
    status: 'overdue',
    dueDate: '2024-01-25',
    description: 'Dijital Bankacılık UX - İlk Ödeme',
    downloadUrl: '#'
  }
];

export const mockStats: DashboardStats = {
  totalProjects: 12,
  activeProjects: 3,
  completedProjects: 7,
  totalRevenue: 156000,
  monthlyGrowth: 23.5,
  pendingPayments: 2
};

export const getProjectTypeLabel = (type: Project['type']): string => {
  const labels = {
    market: 'Pazar Araştırması',
    social: 'Sosyal Medya',
    health: 'Sağlık Araştırması'
  };
  return labels[type];
};

export const getProjectStatusLabel = (status: Project['status']): string => {
  const labels = {
    active: 'Aktif',
    completed: 'Tamamlandı',
    pending: 'Beklemede',
    cancelled: 'İptal Edildi'
  };
  return labels[status];
};

export const getProjectStatusColor = (status: Project['status']): string => {
  const colors = {
    active: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return colors[status];
};

export const getPaymentStatusLabel = (status: Payment['status']): string => {
  const labels = {
    paid: 'Ödendi',
    pending: 'Beklemede',
    overdue: 'Gecikmiş'
  };
  return labels[status];
};

export const getPaymentStatusColor = (status: Payment['status']): string => {
  const colors = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    overdue: 'bg-red-100 text-red-800'
  };
  return colors[status];
};
