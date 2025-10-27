'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { aboutUs, contactInfo } from '@/data/mockData';
import { Mail, Phone, MapPin, Briefcase, Target, Award, Users as UsersIcon } from 'lucide-react';

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Vision & Mission Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Hakkımızda</h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              15 yıldan fazla deneyimle, Türkiye'nin en güvenilir araştırma platformu
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 border border-white border-opacity-20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-accent-400" size={32} />
                <h3 className="text-2xl font-bold">Vizyonumuz</h3>
              </div>
              <p className="text-primary-100 leading-relaxed text-lg">
                {aboutUs.vision}
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 border border-white border-opacity-20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="text-accent-400" size={32} />
                <h3 className="text-2xl font-bold">Misyonumuz</h3>
              </div>
              <p className="text-primary-100 leading-relaxed text-lg">
                {aboutUs.mission}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Değerlerimiz</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Her çalışmamızda bu temel değerleri rehber alıyoruz
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {aboutUs.values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="card p-8 card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-accent-400 to-accent-600 text-white">
                      {index === 0 && <Award size={24} />}
                      {index === 1 && <Briefcase size={24} />}
                      {index === 2 && <Target size={24} />}
                      {index === 3 && <UsersIcon size={24} />}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-slate-600">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">İletişim</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Bize ulaşın, sorularınız için her zaman buradayız
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card p-8 text-center card-hover"
            >
              <div className="inline-flex p-4 bg-blue-100 rounded-lg mb-4">
                <Mail className="text-blue-600" size={32} />
              </div>
              <h3 className="text-lg font-bold text-primary-900 mb-2">E-posta</h3>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-accent-600 hover:text-accent-700 font-medium"
              >
                {contactInfo.email}
              </a>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="card p-8 text-center card-hover"
            >
              <div className="inline-flex p-4 bg-green-100 rounded-lg mb-4">
                <Phone className="text-green-600" size={32} />
              </div>
              <h3 className="text-lg font-bold text-primary-900 mb-2">Telefon</h3>
              <a
                href={`tel:${contactInfo.phone}`}
                className="text-accent-600 hover:text-accent-700 font-medium"
              >
                {contactInfo.phone}
              </a>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="card p-8 text-center card-hover"
            >
              <div className="inline-flex p-4 bg-purple-100 rounded-lg mb-4">
                <MapPin className="text-purple-600" size={32} />
              </div>
              <h3 className="text-lg font-bold text-primary-900 mb-2">Adres</h3>
              <p className="text-slate-600">{contactInfo.address}</p>
              <p className="text-sm text-slate-500 mt-2">{contactInfo.workingHours}</p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card p-8 md:p-12 max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-primary-900 mb-6">Bize Mesaj Gönderin</h3>

            {submitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg border border-green-300"
              >
                ✓ Mesajınız başarıyla gönderildi! Kısa süre içinde sizinle iletişime geçeceğiz.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Adınız
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-accent-500 transition-colors"
                  placeholder="Adınızı girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-accent-500 transition-colors"
                  placeholder="E-posta adresiniz"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mesaj
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-accent-500 transition-colors resize-none"
                  placeholder="Mesajınızı yazın..."
                />
              </div>

              <button type="submit" className="btn-accent w-full">
                Gönder
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
