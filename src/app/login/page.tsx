'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import ErrorMessage from '@/components/ErrorMessage';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register states
  const [name, setName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Giriş yapılırken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (registerPassword !== confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    if (registerPassword.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }

    if (!acceptedTerms) {
      setError('Kullanım şartlarını kabul etmelisiniz');
      return;
    }

    if (!acceptedPrivacy) {
      setError('KVKK aydınlatma metnini kabul etmelisiniz');
      return;
    }

    setLoading(true);

    try {
      await register(name, registerEmail, registerPassword);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Kayıt olurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tab Switcher */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => {
                setActiveTab('login');
                setError('');
              }}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors duration-200 ${
                activeTab === 'login'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Giriş Yap
            </button>
            <button
              onClick={() => {
                setActiveTab('register');
                setError('');
              }}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors duration-200 ${
                activeTab === 'register'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Kayıt Ol
            </button>
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'login' ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Hoş Geldiniz</h1>
                    <p className="text-gray-600">Hesabınıza giriş yapın</p>
                  </div>

                  {error && <ErrorMessage message={error} className="mb-6" />}

                  <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta Adresi
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="ornek@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Şifre
                      </label>
                      <input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="••••••••"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Hesap Oluştur</h1>
                    <p className="text-gray-600">Yeni hesap oluşturun ve başlayın</p>
                  </div>

                  {error && <ErrorMessage message={error} className="mb-6" />}

                  <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Ad Soyad
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Ahmet Yılmaz"
                      />
                    </div>

                    <div>
                      <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta Adresi
                      </label>
                      <input
                        id="registerEmail"
                        type="email"
                        required
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="ornek@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Şifre
                      </label>
                      <input
                        id="registerPassword"
                        type="password"
                        required
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="••••••••"
                      />
                      <p className="mt-1 text-xs text-gray-500">En az 6 karakter</p>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Şifre Tekrar
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="••••••••"
                      />
                    </div>

                    {/* Sözleşmeler */}
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <input
                          id="terms"
                          type="checkbox"
                          required
                          checked={acceptedTerms}
                          onChange={(e) => setAcceptedTerms(e.target.checked)}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                          <a href="/sozlesmeler/kullanim-sartlari" target="_blank" className="text-blue-600 hover:text-blue-700 underline">
                            Kullanım Şartları
                          </a>
                          {' ve '}
                          <a href="/sozlesmeler/gizlilik-politikasi" target="_blank" className="text-blue-600 hover:text-blue-700 underline">
                            Gizlilik Politikası
                          </a>
                          'nı okudum ve kabul ediyorum.
                        </label>
                      </div>

                      <div className="flex items-start">
                        <input
                          id="privacy"
                          type="checkbox"
                          required
                          checked={acceptedPrivacy}
                          onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="privacy" className="ml-2 text-sm text-gray-700">
                          <a href="/sozlesmeler/kvkk-aydinlatma" target="_blank" className="text-blue-600 hover:text-blue-700 underline">
                            KVKK Aydınlatma Metni
                          </a>
                          'ni okudum ve kişisel verilerimin işlenmesine onay veriyorum.
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !acceptedTerms || !acceptedPrivacy}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
