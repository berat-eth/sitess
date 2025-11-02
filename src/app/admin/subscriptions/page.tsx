'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  mockSubscriptions,
  mockPaymentHistory,
  getSubscriptionStatusLabel,
  getSubscriptionStatusColor,
  getPaymentStatusLabel,
  getPaymentStatusColor,
  Subscription,
  PaymentHistory
} from '@/data/subscriptionData';

const SubscriptionRow = ({ subscription, index }: { subscription: Subscription; index: number }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <>
      <motion.tr
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
        onClick={() => setShowDetails(!showDetails)}
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div>
            <div className="text-sm font-medium text-gray-900">{subscription.userName}</div>
            <div className="text-sm text-gray-500">{subscription.userEmail}</div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{subscription.planName}</div>
          <div className="text-sm text-gray-500">₺{subscription.amount} / ay</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSubscriptionStatusColor(subscription.status)}`}>
            {getSubscriptionStatusLabel(subscription.status)}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {new Date(subscription.startDate).toLocaleDateString('tr-TR')}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {new Date(subscription.endDate).toLocaleDateString('tr-TR')}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {subscription.nextBillingDate ? new Date(subscription.nextBillingDate).toLocaleDateString('tr-TR') : '-'}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(!showDetails);
              }}
              className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
              title="Detaylar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            {subscription.status === 'active' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Bu aboneliği iptal etmek istediğinizden emin misiniz?')) {
                    // Cancel subscription logic
                    console.log('Cancel subscription:', subscription.id);
                  }
                }}
                className="text-red-600 hover:text-red-900 transition-colors duration-200"
                title="İptal Et"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </td>
      </motion.tr>
      {showDetails && (
        <tr>
          <td colSpan={7} className="px-6 py-4 bg-gray-50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Abonelik ID</p>
                <p className="font-medium text-gray-900">{subscription.id}</p>
              </div>
              <div>
                <p className="text-gray-500">Ödeme Yöntemi</p>
                <p className="font-medium text-gray-900">
                  {subscription.paymentMethod === 'card' ? 'Kredi Kartı' : 'Banka Transferi'}
                </p>
              </div>
              <div>
                <p className="text-gray-500">iyzico Payment ID</p>
                <p className="font-medium text-gray-900">{subscription.iyzicoPaymentId || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500">Oluşturulma</p>
                <p className="font-medium text-gray-900">
                  {new Date(subscription.createdAt).toLocaleDateString('tr-TR')}
                </p>
              </div>
              {subscription.cancelledAt && (
                <>
                  <div>
                    <p className="text-gray-500">İptal Tarihi</p>
                    <p className="font-medium text-gray-900">
                      {new Date(subscription.cancelledAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">İptal Nedeni</p>
                    <p className="font-medium text-gray-900">{subscription.cancellationReason || '-'}</p>
                  </div>
                </>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default function AdminSubscriptionsPage() {
  const [filter, setFilter] = useState<'all' | Subscription['status']>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubscriptions = mockSubscriptions.filter(subscription => {
    const matchesFilter = filter === 'all' || subscription.status === filter;
    const matchesSearch = searchTerm === '' || 
      subscription.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.planName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusCounts = {
    all: mockSubscriptions.length,
    active: mockSubscriptions.filter(s => s.status === 'active').length,
    inactive: mockSubscriptions.filter(s => s.status === 'inactive').length,
    cancelled: mockSubscriptions.filter(s => s.status === 'cancelled').length,
    expired: mockSubscriptions.filter(s => s.status === 'expired').length,
    pending: mockSubscriptions.filter(s => s.status === 'pending').length,
  };

  const totalRevenue = mockSubscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + s.amount, 0);

  const activeSubscriptions = mockSubscriptions.filter(s => s.status === 'active');
  const monthlyRecurringRevenue = activeSubscriptions.reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Abonelik Yönetimi</h1>
          <p className="text-gray-600 mt-1">Kullanıcı aboneliklerini görüntüleyin ve yönetin</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
          Yeni Abonelik Ekle
        </button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Toplam Abonelik</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
            </div>
            <div className="text-blue-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Aktif Abonelik</p>
              <p className="text-2xl font-bold text-green-600">{statusCounts.active}</p>
            </div>
            <div className="text-green-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Aylık Tekrarlayan Gelir</p>
              <p className="text-2xl font-bold text-purple-600">₺{monthlyRecurringRevenue.toLocaleString()}</p>
            </div>
            <div className="text-purple-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Toplam Gelir</p>
              <p className="text-2xl font-bold text-emerald-600">₺{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="text-emerald-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
          <p className="text-sm text-gray-600">Toplam</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-green-600">{statusCounts.active}</p>
          <p className="text-sm text-gray-600">Aktif</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
          <p className="text-sm text-gray-600">Beklemede</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-red-600">{statusCounts.cancelled}</p>
          <p className="text-sm text-gray-600">İptal Edildi</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <p className="text-2xl font-bold text-orange-600">{statusCounts.expired}</p>
          <p className="text-sm text-gray-600">Süresi Doldu</p>
        </div>
      </motion.div>

      {/* Subscriptions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        {/* Table Header with Filters */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-medium text-gray-900">Abonelik Listesi</h3>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Kullanıcı veya plan ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="active">Aktif</option>
                <option value="pending">Beklemede</option>
                <option value="cancelled">İptal Edildi</option>
                <option value="expired">Süresi Doldu</option>
                <option value="inactive">Pasif</option>
              </select>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Excel İndir
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başlangıç
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bitiş
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sonraki Ödeme
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscriptions.length > 0 ? (
                filteredSubscriptions.map((subscription, index) => (
                  <SubscriptionRow key={subscription.id} subscription={subscription} index={index} />
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Abonelik bulunamadı
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Payment History Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Ödeme Geçmişi</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ödeme ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tutar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  iyzico ID
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockPaymentHistory.map((payment, index) => {
                const subscription = mockSubscriptions.find(s => s.id === payment.subscriptionId);
                return (
                  <motion.tr
                    key={payment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {subscription?.userName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₺{payment.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(payment.status)}`}>
                        {getPaymentStatusLabel(payment.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(payment.paymentDate).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.iyzicoPaymentId || '-'}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

