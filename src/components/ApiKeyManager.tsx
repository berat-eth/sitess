'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiClient from '@/services/api';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import EmptyState from './EmptyState';

interface ApiKey {
  id: number;
  name: string;
  description?: string;
  key_prefix: string;
  rate_limit: number;
  is_active: boolean;
  expires_at?: string;
  last_used_at?: string;
  created_at: string;
}

export default function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKey, setNewKey] = useState<{ name: string; description: string; rate_limit: number }>({
    name: '',
    description: '',
    rate_limit: 100,
  });
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [showKeyModal, setShowKeyModal] = useState(false);

  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await apiClient.listApiKeys();
      if (response.success && response.data?.apiKeys) {
        setApiKeys(response.data.apiKeys);
      }
    } catch (err: any) {
      setError(err.message || 'API anahtarları yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newKey.name.trim()) {
      setError('API anahtarı adı gereklidir');
      return;
    }

    try {
      setError('');
      const response = await apiClient.createApiKey({
        name: newKey.name,
        description: newKey.description || undefined,
        rate_limit: newKey.rate_limit,
      });

      if (response.success && response.data?.key) {
        setCreatedKey(response.data.key);
        setShowCreateModal(false);
        setShowKeyModal(true);
        setNewKey({ name: '', description: '', rate_limit: 100 });
        loadApiKeys();
      }
    } catch (err: any) {
      setError(err.message || 'API anahtarı oluşturulamadı');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu API anahtarını silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await apiClient.deleteApiKey(id);
      loadApiKeys();
    } catch (err: any) {
      setError(err.message || 'API anahtarı silinemedi');
    }
  };

  const handleRevoke = async (id: number) => {
    if (!confirm('Bu API anahtarını iptal etmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await apiClient.revokeApiKey(id);
      loadApiKeys();
    } catch (err: any) {
      setError(err.message || 'API anahtarı iptal edilemedi');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('API anahtarı panoya kopyalandı!');
  };

  if (loading) {
    return <Loading message="API anahtarları yükleniyor..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">API Anahtarları</h2>
          <p className="text-sm text-gray-600 mt-1">
            Harici sistemlerinizden API'ye erişim için anahtarlar oluşturun
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Yeni API Anahtarı
        </button>
      </div>

      {error && <ErrorMessage message={error} onRetry={loadApiKeys} />}

      {apiKeys.length === 0 ? (
        <EmptyState
          title="API Anahtarı Yok"
          message="Henüz hiç API anahtarı oluşturmadınız. Harici sistemlerinizden API'ye erişim için bir anahtar oluşturun."
          actionLabel="İlk API Anahtarını Oluştur"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <div className="space-y-4">
          {apiKeys.map((key) => (
            <motion.div
              key={key.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{key.name}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        key.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {key.is_active ? 'Aktif' : 'İptal Edildi'}
                    </span>
                  </div>
                  {key.description && (
                    <p className="text-sm text-gray-600 mb-3">{key.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Önek: <code className="bg-gray-100 px-2 py-1 rounded">{key.key_prefix}</code></span>
                    <span>Rate Limit: {key.rate_limit}/dk</span>
                    {key.last_used_at && (
                      <span>Son Kullanım: {new Date(key.last_used_at).toLocaleDateString('tr-TR')}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {key.is_active && (
                    <button
                      onClick={() => handleRevoke(key.id)}
                      className="px-3 py-1 text-sm text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
                    >
                      İptal Et
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(key.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-semibold mb-4">Yeni API Anahtarı Oluştur</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newKey.name}
                  onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Örn: Production API Key"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                <textarea
                  value={newKey.description}
                  onChange={(e) => setNewKey({ ...newKey, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Bu anahtarın kullanım amacı..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate Limit (dakika başına)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={newKey.rate_limit}
                  onChange={(e) => setNewKey({ ...newKey, rate_limit: parseInt(e.target.value) || 100 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleCreate}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Oluştur
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Key Display Modal */}
      {showKeyModal && createdKey && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-medium text-yellow-800 mb-2">
                ⚠️ Bu API anahtarı sadece bir kez gösterilecek!
              </p>
              <p className="text-xs text-yellow-700">
                Lütfen bu anahtarı güvenli bir yere kaydedin. Daha sonra tekrar görüntüleyemezsiniz.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API Anahtarınız</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={createdKey}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                />
                <button
                  onClick={() => copyToClipboard(createdKey)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Kopyala
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                setShowKeyModal(false);
                setCreatedKey(null);
              }}
              className="w-full mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Kapat
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
