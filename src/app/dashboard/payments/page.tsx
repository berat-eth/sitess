<<<<<<< HEAD
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Download, 
  Eye, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Filter,
  Search
} from 'lucide-react';

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
  date: string;
  method: 'credit-card' | 'bank-transfer' | 'paypal';
  invoiceNumber: string;
  surveyTitle?: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    amount: 299.99,
    currency: 'TRY',
    status: 'completed',
    description: 'Premium Anket Paketi - 3 Aylık',
    date: '2024-01-15',
    method: 'credit-card',
    invoiceNumber: 'INV-2024-001',
    surveyTitle: 'Müşteri Memnuniyet Anketi'
  },
  {
    id: '2',
    amount: 149.99,
    currency: 'TRY',
    status: 'completed',
    description: 'Temel Anket Paketi - 1 Aylık',
    date: '2024-01-10',
    method: 'bank-transfer',
    invoiceNumber: 'INV-2024-002',
    surveyTitle: 'Çalışan Memnuniyet Anketi'
  },
  {
    id: '3',
    amount: 199.99,
    currency: 'TRY',
    status: 'pending',
    description: 'Premium Anket Paketi - 1 Aylık',
    date: '2024-01-20',
    method: 'paypal',
    invoiceNumber: 'INV-2024-003',
    surveyTitle: 'Ürün Değerlendirme Anketi'
  },
  {
    id: '4',
    amount: 99.99,
    currency: 'TRY',
    status: 'failed',
    description: 'Temel Anket Paketi - 1 Aylık',
    date: '2024-01-18',
    method: 'credit-card',
    invoiceNumber: 'INV-2024-004',
    surveyTitle: 'Pazar Araştırması Anketi'
  },
  {
    id: '5',
    amount: 399.99,
    currency: 'TRY',
    status: 'completed',
    description: 'Kurumsal Anket Paketi - 6 Aylık',
    date: '2024-01-05',
    method: 'bank-transfer',
    invoiceNumber: 'INV-2024-005',
    surveyTitle: 'Kurumsal Memnuniyet Anketi'
  }
];

export default function PaymentsPage() {
  const [payments] = useState<Payment[]>(mockPayments);
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = payments.filter(payment => {
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesSearch = payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.surveyTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusText = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı';
      case 'pending':
        return 'Beklemede';
      case 'failed':
        return 'Başarısız';
    }
  };

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
    }
  };

  const getMethodText = (method: Payment['method']) => {
    switch (method) {
      case 'credit-card':
        return 'Kredi Kartı';
      case 'bank-transfer':
        return 'Banka Havalesi';
      case 'paypal':
        return 'PayPal';
    }
  };

  const totalAmount = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="flex-1 overflow-auto bg-slate-50 min-h-screen">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">Ödemelerim</h1>
          <p className="text-slate-600">Tüm ödeme işlemlerinizi ve faturalarınızı görüntüleyin</p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Toplam Ödeme</p>
                <p className="text-2xl font-bold text-primary-900">{totalAmount.toFixed(2)} ₺</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-full">
                <DollarSign className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Tamamlanan</p>
                <p className="text-2xl font-bold text-green-600">
                  {payments.filter(p => p.status === 'completed').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Bekleyen</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {payments.filter(p => p.status === 'pending').length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Fatura numarası, açıklama veya anket adı ile ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="completed">Tamamlanan</option>
                <option value="pending">Bekleyen</option>
                <option value="failed">Başarısız</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Payments List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filteredPayments.map((payment) => (
            <motion.div
              key={payment.id}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft hover:shadow-corporate transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(payment.status)}
                    <h3 className="text-lg font-semibold text-slate-900">{payment.description}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                      {getStatusText(payment.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(payment.date).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span>{getMethodText(payment.method)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Fatura: {payment.invoiceNumber}</span>
                    </div>
                  </div>

                  {payment.surveyTitle && (
                    <div className="mt-2 text-sm text-slate-500">
                      <span className="font-medium">İlgili Anket:</span> {payment.surveyTitle}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-900">
                      {payment.amount.toFixed(2)} ₺
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors text-sm">
                      <Eye className="h-4 w-4" />
                      Detay
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors text-sm">
                      <Download className="h-4 w-4" />
                      İndir
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredPayments.length === 0 && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl p-12 border border-slate-100 shadow-soft text-center"
          >
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Ödeme bulunamadı</h3>
            <p className="text-slate-600">
              {searchTerm || filterStatus !== 'all' 
                ? 'Arama kriterlerinize uygun ödeme bulunamadı.' 
                : 'Henüz hiç ödeme işlemi gerçekleştirmediniz.'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
=======
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Download, 
  Eye, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Filter,
  Search
} from 'lucide-react';

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
  date: string;
  method: 'credit-card' | 'bank-transfer' | 'paypal';
  invoiceNumber: string;
  surveyTitle?: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    amount: 299.99,
    currency: 'TRY',
    status: 'completed',
    description: 'Premium Anket Paketi - 3 Aylık',
    date: '2024-01-15',
    method: 'credit-card',
    invoiceNumber: 'INV-2024-001',
    surveyTitle: 'Müşteri Memnuniyet Anketi'
  },
  {
    id: '2',
    amount: 149.99,
    currency: 'TRY',
    status: 'completed',
    description: 'Temel Anket Paketi - 1 Aylık',
    date: '2024-01-10',
    method: 'bank-transfer',
    invoiceNumber: 'INV-2024-002',
    surveyTitle: 'Çalışan Memnuniyet Anketi'
  },
  {
    id: '3',
    amount: 199.99,
    currency: 'TRY',
    status: 'pending',
    description: 'Premium Anket Paketi - 1 Aylık',
    date: '2024-01-20',
    method: 'paypal',
    invoiceNumber: 'INV-2024-003',
    surveyTitle: 'Ürün Değerlendirme Anketi'
  },
  {
    id: '4',
    amount: 99.99,
    currency: 'TRY',
    status: 'failed',
    description: 'Temel Anket Paketi - 1 Aylık',
    date: '2024-01-18',
    method: 'credit-card',
    invoiceNumber: 'INV-2024-004',
    surveyTitle: 'Pazar Araştırması Anketi'
  },
  {
    id: '5',
    amount: 399.99,
    currency: 'TRY',
    status: 'completed',
    description: 'Kurumsal Anket Paketi - 6 Aylık',
    date: '2024-01-05',
    method: 'bank-transfer',
    invoiceNumber: 'INV-2024-005',
    surveyTitle: 'Kurumsal Memnuniyet Anketi'
  }
];

export default function PaymentsPage() {
  const [payments] = useState<Payment[]>(mockPayments);
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = payments.filter(payment => {
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesSearch = payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.surveyTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusText = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı';
      case 'pending':
        return 'Beklemede';
      case 'failed':
        return 'Başarısız';
    }
  };

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
    }
  };

  const getMethodText = (method: Payment['method']) => {
    switch (method) {
      case 'credit-card':
        return 'Kredi Kartı';
      case 'bank-transfer':
        return 'Banka Havalesi';
      case 'paypal':
        return 'PayPal';
    }
  };

  const totalAmount = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="flex-1 overflow-auto bg-slate-50 min-h-screen">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">Ödemelerim</h1>
          <p className="text-slate-600">Tüm ödeme işlemlerinizi ve faturalarınızı görüntüleyin</p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Toplam Ödeme</p>
                <p className="text-2xl font-bold text-primary-900">{totalAmount.toFixed(2)} ₺</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-full">
                <DollarSign className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Tamamlanan</p>
                <p className="text-2xl font-bold text-green-600">
                  {payments.filter(p => p.status === 'completed').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Bekleyen</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {payments.filter(p => p.status === 'pending').length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Fatura numarası, açıklama veya anket adı ile ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="completed">Tamamlanan</option>
                <option value="pending">Bekleyen</option>
                <option value="failed">Başarısız</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Payments List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filteredPayments.map((payment) => (
            <motion.div
              key={payment.id}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft hover:shadow-corporate transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(payment.status)}
                    <h3 className="text-lg font-semibold text-slate-900">{payment.description}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                      {getStatusText(payment.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(payment.date).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span>{getMethodText(payment.method)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Fatura: {payment.invoiceNumber}</span>
                    </div>
                  </div>

                  {payment.surveyTitle && (
                    <div className="mt-2 text-sm text-slate-500">
                      <span className="font-medium">İlgili Anket:</span> {payment.surveyTitle}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-900">
                      {payment.amount.toFixed(2)} ₺
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors text-sm">
                      <Eye className="h-4 w-4" />
                      Detay
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors text-sm">
                      <Download className="h-4 w-4" />
                      İndir
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredPayments.length === 0 && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl p-12 border border-slate-100 shadow-soft text-center"
          >
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Ödeme bulunamadı</h3>
            <p className="text-slate-600">
              {searchTerm || filterStatus !== 'all' 
                ? 'Arama kriterlerinize uygun ödeme bulunamadı.' 
                : 'Henüz hiç ödeme işlemi gerçekleştirmediniz.'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
>>>>>>> 4855e23d27390993c3739d0f6d832d04426b1d54
