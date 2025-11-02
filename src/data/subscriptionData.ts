export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'TRY';
  interval: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
  maxProjects?: number;
  maxReports?: number;
  aiFeatures: boolean;
  prioritySupport: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  planId: string;
  planName: string;
  status: 'active' | 'inactive' | 'cancelled' | 'expired' | 'pending';
  amount: number;
  currency: 'TRY';
  startDate: string;
  endDate: string;
  nextBillingDate?: string;
  paymentMethod: 'card' | 'bank_transfer';
  iyzicoPaymentId?: string;
  iyzicoConversationId?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentHistory {
  id: string;
  subscriptionId: string;
  userId: string;
  amount: number;
  currency: 'TRY';
  status: 'success' | 'failed' | 'pending';
  iyzicoPaymentId?: string;
  iyzicoConversationId?: string;
  paymentDate: string;
  invoiceUrl?: string;
  errorMessage?: string;
}

// Subscription Plans
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Başlangıç',
    description: 'Küçük işletmeler için',
    price: 2500,
    currency: 'TRY',
    interval: 'monthly',
    features: [
      'Aylık 1 araştırma projesi',
      'Temel AI analiz',
      'Email desteği',
      'Online anket (100 katılımcı)'
    ],
    maxProjects: 1,
    maxReports: 10,
    aiFeatures: false,
    prioritySupport: false
  },
  {
    id: 'professional',
    name: 'Profesyonel',
    description: 'Büyüyen şirketler için',
    price: 5000,
    currency: 'TRY',
    interval: 'monthly',
    features: [
      'Aylık 3 araştırma projesi',
      'Gelişmiş AI suite',
      'Öncelikli destek',
      'Online anket (500 katılımcı)'
    ],
    maxProjects: 3,
    maxReports: 100,
    aiFeatures: true,
    prioritySupport: true,
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Kurumsal',
    description: 'Büyük organizasyonlar için',
    price: 10000,
    currency: 'TRY',
    interval: 'monthly',
    features: [
      'Sınırsız araştırma projesi',
      'Tam AI erişimi',
      '7/24 premium destek',
      'Sınırsız anket katılımcısı'
    ],
    maxProjects: -1,
    maxReports: -1,
    aiFeatures: true,
    prioritySupport: true
  }
];

// Mock Subscriptions
export const mockSubscriptions: Subscription[] = [
  {
    id: 'sub_1',
    userId: '1',
    userEmail: 'ahmet.kaya@example.com',
    userName: 'Ahmet Kaya',
    planId: 'professional',
    planName: 'Profesyonel',
    status: 'active',
    amount: 5000,
    currency: 'TRY',
    startDate: '2024-01-01',
    endDate: '2024-02-01',
    nextBillingDate: '2024-02-01',
    paymentMethod: 'card',
    iyzicoPaymentId: 'pay_123456789',
    iyzicoConversationId: 'conv_123456789',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-30T14:30:00Z'
  },
  {
    id: 'sub_2',
    userId: '4',
    userEmail: 'fatma.demir@example.com',
    userName: 'Fatma Demir',
    planId: 'basic',
    planName: 'Başlangıç',
    status: 'active',
    amount: 2500,
    currency: 'TRY',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    nextBillingDate: '2024-02-15',
    paymentMethod: 'card',
    iyzicoPaymentId: 'pay_987654321',
    iyzicoConversationId: 'conv_987654321',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z'
  },
  {
    id: 'sub_3',
    userId: '5',
    userEmail: 'mehmet.aksoy@example.com',
    userName: 'Mehmet Aksoy',
    planId: 'professional',
    planName: 'Profesyonel',
    status: 'cancelled',
    amount: 5000,
    currency: 'TRY',
    startDate: '2023-12-01',
    endDate: '2024-01-01',
    cancelledAt: '2024-01-01',
    cancellationReason: 'Kullanıcı iptali',
    paymentMethod: 'card',
    iyzicoPaymentId: 'pay_456789123',
    iyzicoConversationId: 'conv_456789123',
    createdAt: '2023-12-01T08:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  }
];

// Mock Payment History
export const mockPaymentHistory: PaymentHistory[] = [
  {
    id: 'pay_hist_1',
    subscriptionId: 'sub_1',
    userId: '1',
    amount: 5000,
    currency: 'TRY',
    status: 'success',
    iyzicoPaymentId: 'pay_123456789',
    iyzicoConversationId: 'conv_123456789',
    paymentDate: '2024-01-01T10:00:00Z',
    invoiceUrl: '#'
  },
  {
    id: 'pay_hist_2',
    subscriptionId: 'sub_2',
    userId: '4',
    amount: 2500,
    currency: 'TRY',
    status: 'success',
    iyzicoPaymentId: 'pay_987654321',
    iyzicoConversationId: 'conv_987654321',
    paymentDate: '2024-01-15T09:00:00Z',
    invoiceUrl: '#'
  },
  {
    id: 'pay_hist_3',
    subscriptionId: 'sub_3',
    userId: '5',
    amount: 5000,
    currency: 'TRY',
    status: 'success',
    iyzicoPaymentId: 'pay_456789123',
    iyzicoConversationId: 'conv_456789123',
    paymentDate: '2023-12-01T08:00:00Z',
    invoiceUrl: '#'
  }
];

// Helper functions
export const getSubscriptionStatusLabel = (status: Subscription['status']): string => {
  const labels = {
    active: 'Aktif',
    inactive: 'Pasif',
    cancelled: 'İptal Edildi',
    expired: 'Süresi Doldu',
    pending: 'Beklemede'
  };
  return labels[status];
};

export const getSubscriptionStatusColor = (status: Subscription['status']): string => {
  const colors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
    expired: 'bg-orange-100 text-orange-800',
    pending: 'bg-yellow-100 text-yellow-800'
  };
  return colors[status];
};

export const getPaymentStatusLabel = (status: PaymentHistory['status']): string => {
  const labels = {
    success: 'Başarılı',
    failed: 'Başarısız',
    pending: 'Beklemede'
  };
  return labels[status];
};

export const getPaymentStatusColor = (status: PaymentHistory['status']): string => {
  const colors = {
    success: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800'
  };
  return colors[status];
};

