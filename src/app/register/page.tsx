'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, BarChart3, Check } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreedNewsletter, setAgreeNewsletter] = useState(false);

  const passwordStrength = {
    weak: formData.password.length < 6,
    medium: formData.password.length >= 6 && formData.password.length < 10,
    strong: formData.password.length >= 10,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Şifreler eşleşmiyor!');
      return;
    }
    if (!agreeTerms) {
      alert('Lütfen şartları kabul edin!');
      return;
    }

    setIsLoading(true);
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to login
      window.location.href = '/login?success=true';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 flex items-center justify-center p-4 py-8">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="p-3 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg">
              <BarChart3 className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-white">AraştırmaHub</h1>
          </motion.div>
          <p className="text-slate-300 text-sm">Hemen aramıza katılın ve anketlere başlayın</p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-8 border border-white border-opacity-20 shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Kayıt Olun</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Ad Soyad
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Ahmet Demir"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                />
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
            >
              <label className="block text-sm font-medium text-slate-200 mb-2">
                E-posta Adresi
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ornek@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {/* Password Strength Indicator */}
              <div className="mt-2 flex gap-1">
                <div className={`flex-1 h-1 rounded-full ${passwordStrength.weak ? 'bg-red-500' : 'bg-slate-600'}`} />
                <div className={`flex-1 h-1 rounded-full ${passwordStrength.medium ? 'bg-yellow-500' : 'bg-slate-600'}`} />
                <div className={`flex-1 h-1 rounded-full ${passwordStrength.strong ? 'bg-green-500' : 'bg-slate-600'}`} />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {passwordStrength.weak && '❌ Zayıf şifre'}
                {passwordStrength.medium && '⚠️ Orta şifre'}
                {passwordStrength.strong && '✅ Güçlü şifre'}
              </p>
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 }}
            >
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Şifreyi Onayla
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.password && formData.confirmPassword && (
                <p className={`text-xs mt-1 ${formData.password === formData.confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
                  {formData.password === formData.confirmPassword ? '✅ Şifreler eşleşiyor' : '❌ Şifreler eşleşmiyor'}
                </p>
              )}
            </motion.div>

            {/* Checkboxes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-3 py-2"
            >
              <label className="flex items-start gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                  className="w-4 h-4 mt-0.5 rounded border-white border-opacity-30 bg-white bg-opacity-10 text-accent-500 focus:ring-2 focus:ring-accent-500 cursor-pointer"
                />
                <span className="text-xs text-slate-300">
                  <Link href="#" className="text-accent-400 hover:text-accent-300">
                    Kullanım Şartları
                  </Link>
                  {' '}ve{' '}
                  <Link href="#" className="text-accent-400 hover:text-accent-300">
                    Gizlilik Politikası
                  </Link>
                  {'nı kabul ediyorum'}
                </span>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedNewsletter}
                  onChange={(e) => setAgreeNewsletter(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-white border-opacity-30 bg-white bg-opacity-10 text-accent-500 focus:ring-2 focus:ring-accent-500 cursor-pointer"
                />
                <span className="text-xs text-slate-300">
                  Bana haber ve güncellemeler gönderin
                </span>
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              type="submit"
              disabled={isLoading || !agreeTerms}
              className="w-full py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-lg hover:from-accent-600 hover:to-accent-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <span>Kayıt Yapılıyor...</span>
              ) : (
                <>
                  <span>Kayıt Ol</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Login Link */}
          <p className="text-center text-slate-300 text-sm mt-6">
            Zaten hesabınız var mı?{' '}
            <Link href="/login" className="text-accent-400 hover:text-accent-300 font-semibold transition-colors">
              Giriş Yapın
            </Link>
          </p>
        </motion.div>

        {/* Footer Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-slate-400 text-xs mt-8"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Ana Sayfaya Dön
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
