'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Users, ArrowRight } from 'lucide-react';

interface SurveyCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  respondents: number;
  duration: string;
  image: string;
  status: string;
}

export default function SurveyCard({
  id,
  title,
  description,
  category,
  respondents,
  duration,
  image,
  status,
}: SurveyCardProps) {
  const isActive = status === 'Aktif';
  const statusColor = isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="card p-6 card-hover flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{image}</div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
          {status}
        </span>
      </div>

      {/* Title and Category */}
      <h3 className="text-xl font-bold text-primary-900 mb-2 line-clamp-2">
        {title}
      </h3>
      <p className="text-sm text-accent-600 font-medium mb-3">{category}</p>

      {/* Description */}
      <p className="text-slate-600 text-sm mb-6 line-clamp-2 flex-grow">
        {description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-t border-slate-100">
        <div className="flex items-center gap-2 pt-4">
          <Clock size={16} className="text-slate-400" />
          <span className="text-sm text-slate-600">{duration}</span>
        </div>
        <div className="flex items-center gap-2 pt-4">
          <Users size={16} className="text-slate-400" />
          <span className="text-sm text-slate-600">{respondents.toLocaleString()} kişi</span>
        </div>
      </div>

      {/* CTA Button */}
      {isActive ? (
        <Link
          href={`/survey/${id}`}
          className="btn-primary group w-full inline-flex items-center justify-center gap-2"
        >
          Katıl
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      ) : (
        <button
          disabled
          className="w-full px-4 py-3 bg-slate-100 text-slate-400 rounded-lg font-medium cursor-not-allowed"
        >
          Yakında Başlayacak
        </button>
      )}
    </motion.div>
  );
}
