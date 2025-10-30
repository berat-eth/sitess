export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer' | 'researcher';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  createdAt: string;
  company?: string;
  projects: number;
  totalSpent: number;
}

export interface AdminProject {
  id: string;
  title: string;
  client: string;
  clientId: string;
  type: 'market' | 'social' | 'health';
  status: 'pending' | 'approved' | 'active' | 'completed' | 'rejected';
  budget: number;
  startDate: string;
  endDate?: string;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  progress: number;
  description: string;
}

export interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  activeProjects: number;
  totalRevenue: number;
  monthlyRevenue: number;
  systemUptime: number;
  apiCalls: number;
  storageUsed: number;
  pendingApprovals: number;
}

export interface SecurityLog {
  id: string;
  timestamp: string;
  event: 'login' | 'logout' | 'failed_login' | 'data_access' | 'system_change';
  user: string;
  ip: string;
  details: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  status: 'active' | 'inactive' | 'expired';
  createdAt: string;
  lastUsed?: string;
  requests: number;
  rateLimit: number;
  permissions: string[];
}

// Mock Data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmet Kaya',
    email: 'ahmet.kaya@example.com',
    role: 'customer',
    status: 'active',
    lastLogin: '2024-01-30T10:30:00Z',
    createdAt: '2023-12-01T09:00:00Z',
    company: 'ABC Teknoloji A.Ş.',
    projects: 3,
    totalSpent: 45000
  },
  {
    id: '2',
    name: 'Dr. Mehmet Yılmaz',
    email: 'mehmet.yilmaz@mikarastirma.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-30T14:15:00Z',
    createdAt: '2023-01-01T08:00:00Z',
    projects: 0,
    totalSpent: 0
  },
  {
    id: '3',
    name: 'Zeynep Özkan',
    email: 'zeynep.ozkan@mikarastirma.com',
    role: 'researcher',
    status: 'active',
    lastLogin: '2024-01-30T11:45:00Z',
    createdAt: '2023-06-15T10:00:00Z',
    projects: 8,
    totalSpent: 0
  },
  {
    id: '4',
    name: 'Fatma Demir',
    email: 'fatma.demir@example.com',
    role: 'customer',
    status: 'inactive',
    lastLogin: '2024-01-25T16:20:00Z',
    createdAt: '2023-11-10T14:30:00Z',
    company: 'XYZ Ltd.',
    projects: 1,
    totalSpent: 12000
  }
];

export const mockAdminProjects: AdminProject[] = [
  {
    id: '1',
    title: 'E-Ticaret Müşteri Memnuniyet Araştırması',
    client: 'ABC Teknoloji A.Ş.',
    clientId: '1',
    type: 'market',
    status: 'active',
    budget: 15000,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    assignedTo: 'Zeynep Özkan',
    priority: 'high',
    progress: 75,
    description: 'Online alışveriş deneyimi ve müşteri memnuniyeti analizi'
  },
  {
    id: '2',
    title: 'Sosyal Medya Trend Analizi',
    client: 'Fashion Brand Ltd.',
    clientId: '5',
    type: 'social',
    status: 'pending',
    budget: 22000,
    startDate: '2024-02-01',
    endDate: '2024-03-01',
    priority: 'medium',
    progress: 0,
    description: 'Instagram ve TikTok platformlarında marka algısı araştırması'
  },
  {
    id: '3',
    title: 'Sağlık Uygulaması Kullanıcı Davranış Analizi',
    client: 'HealthTech Inc.',
    clientId: '6',
    type: 'health',
    status: 'completed',
    budget: 18500,
    startDate: '2023-12-01',
    endDate: '2024-01-10',
    assignedTo: 'Dr. Emre Demir',
    priority: 'low',
    progress: 100,
    description: 'Mobil sağlık uygulaması kullanım alışkanlıkları'
  }
];

export const mockSystemMetrics: SystemMetrics = {
  totalUsers: 1247,
  activeUsers: 892,
  totalProjects: 156,
  activeProjects: 23,
  totalRevenue: 2450000,
  monthlyRevenue: 185000,
  systemUptime: 99.8,
  apiCalls: 45230,
  storageUsed: 78.5,
  pendingApprovals: 5
};

export const mockSecurityLogs: SecurityLog[] = [
  {
    id: '1',
    timestamp: '2024-01-30T14:30:00Z',
    event: 'login',
    user: 'admin@mikarastirma.com',
    ip: '192.168.1.100',
    details: 'Successful admin login',
    severity: 'low'
  },
  {
    id: '2',
    timestamp: '2024-01-30T14:25:00Z',
    event: 'failed_login',
    user: 'unknown@example.com',
    ip: '45.123.45.67',
    details: 'Failed login attempt - invalid credentials',
    severity: 'medium'
  },
  {
    id: '3',
    timestamp: '2024-01-30T13:15:00Z',
    event: 'system_change',
    user: 'admin@mikarastirma.com',
    ip: '192.168.1.100',
    details: 'Updated user permissions for user ID: 1247',
    severity: 'high'
  }
];

export const mockApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production API',
    key: 'mk_prod_1234567890abcdef',
    status: 'active',
    createdAt: '2023-12-01T10:00:00Z',
    lastUsed: '2024-01-30T14:30:00Z',
    requests: 12450,
    rateLimit: 1000,
    permissions: ['read', 'write', 'admin']
  },
  {
    id: '2',
    name: 'Mobile App API',
    key: 'mk_mobile_abcdef1234567890',
    status: 'active',
    createdAt: '2024-01-15T09:00:00Z',
    lastUsed: '2024-01-30T12:15:00Z',
    requests: 3420,
    rateLimit: 500,
    permissions: ['read']
  }
];

export const getUserRoleLabel = (role: User['role']): string => {
  const labels = {
    admin: 'Yönetici',
    customer: 'Müşteri',
    researcher: 'Araştırmacı'
  };
  return labels[role];
};

export const getUserStatusLabel = (status: User['status']): string => {
  const labels = {
    active: 'Aktif',
    inactive: 'Pasif',
    suspended: 'Askıya Alındı'
  };
  return labels[status];
};

export const getUserStatusColor = (status: User['status']): string => {
  const colors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-red-100 text-red-800'
  };
  return colors[status];
};

export const getProjectStatusLabel = (status: AdminProject['status']): string => {
  const labels = {
    pending: 'Onay Bekliyor',
    approved: 'Onaylandı',
    active: 'Aktif',
    completed: 'Tamamlandı',
    rejected: 'Reddedildi'
  };
  return labels[status];
};

export const getProjectStatusColor = (status: AdminProject['status']): string => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-blue-100 text-blue-800',
    active: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    rejected: 'bg-red-100 text-red-800'
  };
  return colors[status];
};

export const getPriorityLabel = (priority: AdminProject['priority']): string => {
  const labels = {
    low: 'Düşük',
    medium: 'Orta',
    high: 'Yüksek',
    urgent: 'Acil'
  };
  return labels[priority];
};

export const getPriorityColor = (priority: AdminProject['priority']): string => {
  const colors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  };
  return colors[priority];
};
