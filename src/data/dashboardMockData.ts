// Mock company data
export const mockUser = {
  id: 1,
  name: 'TechCorp Yazılım',
  email: 'info@techcorp.com',
  role: 'Premium Şirket',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=techcorp',
  joinDate: '2024-01-15',
  totalSurveys: 12,
  completedSurveys: 8,
  points: 2450,
  badges: ['Aktif Şirket', 'Premium Üye', 'Güvenilir Partner'],
};

// Dashboard statistics
export const dashboardStats = [
  {
    id: 1,
    title: 'Aktif Anketler',
    value: '12',
    change: '+3',
    changeType: 'positive',
    icon: 'activity',
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: 2,
    title: 'Müşteri Cevapları',
    value: '1,247',
    change: '+156',
    changeType: 'positive',
    icon: 'check-circle',
    color: 'from-green-400 to-green-600',
  },
  {
    id: 3,
    title: 'Memnuniyet Skoru',
    value: '4.8',
    change: '+0.2',
    changeType: 'positive',
    icon: 'star',
    color: 'from-yellow-400 to-yellow-600',
  },
  {
    id: 4,
    title: 'Bu Ay Rapor',
    value: '8',
    change: '+2',
    changeType: 'positive',
    icon: 'award',
    color: 'from-purple-400 to-purple-600',
  },
];

// Company surveys
export const activeSurveys = [
  {
    id: 1,
    title: 'Müşteri Memnuniyet Anketi',
    category: 'Müşteri Deneyimi',
    status: 'Devam Ediyor',
    progress: 45,
    startDate: '2024-10-20',
    dueDate: '2024-11-05',
    respondents: 1250,
  },
  {
    id: 2,
    title: 'Ürün Değerlendirme Anketi',
    category: 'Ürün Araştırması',
    status: 'Devam Ediyor',
    progress: 78,
    startDate: '2024-10-15',
    dueDate: '2024-10-29',
    respondents: 856,
  },
  {
    id: 3,
    title: 'Hizmet Kalitesi Anketi',
    category: 'Hizmet Değerlendirme',
    status: 'Tamamlandı',
    progress: 100,
    startDate: '2024-10-01',
    dueDate: '2024-10-27',
    respondents: 2100,
  },
];

// User surveys history
export const userSurveyHistory = [
  {
    id: 1,
    title: 'Yeni Ürün Tercihleriniz',
    status: 'Devam Ediyor',
    category: 'Ürün Araştırması',
    joinedDate: '2024-10-20',
    completionRate: 45,
    estimatedCompletion: '2024-11-05',
  },
  {
    id: 2,
    title: 'Dijital Yaşam Alışkanlıkları',
    status: 'Tamamlandı',
    category: 'Sosyal Araştırma',
    joinedDate: '2024-10-18',
    completionRate: 100,
    completionDate: '2024-10-25',
  },
  {
    id: 3,
    title: 'Müşteri Memnuniyet Anketi',
    status: 'Devam Ediyor',
    category: 'Müşteri Deneyimi',
    joinedDate: '2024-10-15',
    completionRate: 78,
    estimatedCompletion: '2024-10-29',
  },
  {
    id: 4,
    title: 'Pazar Trendleri 2024',
    status: 'Tamamlandı',
    category: 'Pazar Araştırması',
    joinedDate: '2024-10-01',
    completionRate: 100,
    completionDate: '2024-10-27',
  },
  {
    id: 5,
    title: 'Marka Algısı Araştırması',
    status: 'Tamamlandı',
    category: 'Marka Araştırması',
    joinedDate: '2024-09-25',
    completionRate: 100,
    completionDate: '2024-10-10',
  },
];

// Results data for charts
export const resultsSummary = [
  {
    question: 'Ürün Memnuniyeti',
    satisfied: 65,
    neutral: 20,
    unsatisfied: 15,
  },
  {
    question: 'Fiyat Uygunluğu',
    satisfied: 58,
    neutral: 22,
    unsatisfied: 20,
  },
  {
    question: 'Hizmet Kalitesi',
    satisfied: 72,
    neutral: 18,
    unsatisfied: 10,
  },
];

// Survey results breakdown
export const surveyResultsBreakdown = [
  { name: 'Çok Memnun', value: 65, color: '#10b981' },
  { name: 'Nötr', value: 20, color: '#f59e0b' },
  { name: 'Memnun Değil', value: 15, color: '#ef4444' },
];

// Company activity
export const recentActivity = [
  {
    id: 1,
    type: 'survey_completed',
    title: 'Anket tamamlandı',
    description: 'Müşteri Memnuniyet Anketi 1,247 cevap aldı',
    timestamp: '2024-10-27',
    icon: 'check',
  },
  {
    id: 2,
    type: 'points_earned',
    title: 'Yeni rapor oluşturuldu',
    description: 'Ürün Değerlendirme raporu hazırlandı',
    timestamp: '2024-10-27',
    icon: 'star',
  },
  {
    id: 3,
    type: 'badge_earned',
    title: 'Yeni müşteri anketi',
    description: 'Hizmet Kalitesi anketi yayınlandı',
    timestamp: '2024-10-25',
    icon: 'award',
  },
  {
    id: 4,
    type: 'survey_started',
    title: 'Anket analizi',
    description: 'Müşteri geri bildirimleri analiz edildi',
    timestamp: '2024-10-15',
    icon: 'play',
  },
];

// Badges/Achievements
export const badges = [
  {
    id: 1,
    name: 'Araştırmacı',
    description: '5 anket tamamla',
    unlocked: true,
    icon: '🔬',
  },
  {
    id: 2,
    name: 'Aktif Üye',
    description: '10 anket tamamla',
    unlocked: true,
    icon: '⚡',
  },
  {
    id: 3,
    name: 'Sadık Katılımcı',
    description: '1 ay boyunca aktif kal',
    unlocked: true,
    icon: '💎',
  },
  {
    id: 4,
    name: 'Süper Yıldız',
    description: '20 anket tamamla',
    unlocked: false,
    icon: '⭐',
  },
  {
    id: 5,
    name: 'Puan Toplayıcı',
    description: '5000 puan kazanla',
    unlocked: false,
    icon: '🎯',
  },
];
