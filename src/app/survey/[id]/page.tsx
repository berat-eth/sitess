'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { surveys, surveyQuestions } from '@/data/mockData';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function SurveyPage() {
  const params = useParams();
  const surveyId = parseInt(params.id as string);
  const survey = surveys.find((s) => s.id === surveyId);
  const questions = surveyQuestions.filter((q) => q.surveyId === surveyId);
  
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!survey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary-900 mb-4">Anket Bulunamadı</h1>
          <Link href="/surveys" className="btn-primary">
            Anketlere Dön
          </Link>
        </div>
      </div>
    );
  }

  const handleAnswer = (questionId: number, value: string | string[]) => {
    setAnswers((prev) => {
      const updated = { ...prev, [questionId]: value };
      const answered = Object.keys(updated).length;
      setProgress((answered / questions.length) * 100);
      return updated;
    });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Teşekkürler!
          </h1>
          
          <p className="text-lg text-slate-600 mb-6">
            Anketimize katıldığınız için çok teşekkür ederiz. Sizin görüşleriniz bizim için çok değerlidir.
          </p>

          <p className="text-sm text-slate-500 mb-8 bg-slate-100 rounded-lg p-4">
            Verileriniz tam güvenlik altında korunmaktadır ve yalnızca istatistiksel analiz amacıyla kullanılacaktır.
          </p>

          <div className="space-y-3">
            <Link href="/surveys" className="btn-primary w-full block">
              Diğer Anketlere Katıl
            </Link>
            <Link href="/" className="btn-secondary w-full block">
              Ana Sayfaya Dön
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <Link href="/surveys" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Anketlere Dön
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card p-8 mb-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">{survey.image}</div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-primary-900 mb-2">{survey.title}</h1>
              <p className="text-slate-600 mb-3">{survey.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <span>📁 {survey.category}</span>
                <span>⏱️ {survey.duration}</span>
                <span>👥 {survey.respondents.toLocaleString()} katılımcı</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-slate-600">
                İlerleme: {Object.keys(answers).length} / {questions.length}
              </p>
              <p className="text-sm font-bold text-primary-600">{Math.round(progress)}%</p>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-accent-400 to-accent-600 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Questions */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="hidden"
          animate="visible"
          className="space-y-6 mb-8"
        >
          {questions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card p-6"
            >
              <div className="flex gap-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-accent-500 text-white text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 flex-1">
                  {question.question}
                </h3>
              </div>

              <div className="ml-12 space-y-2">
                {question.type === 'radio' ? (
                  <div className="space-y-3">
                    {question.options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50 cursor-pointer transition-colors"
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={(e) => handleAnswer(question.id, e.target.value)}
                          className="w-4 h-4 text-accent-600 cursor-pointer"
                        />
                        <span className="text-slate-700">{option}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {question.options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-50 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={(answers[question.id] as string[])?.includes(option) || false}
                          onChange={(e) => {
                            const current = (answers[question.id] as string[]) || [];
                            if (e.target.checked) {
                              handleAnswer(question.id, [...current, option]);
                            } else {
                              handleAnswer(
                                question.id,
                                current.filter((opt) => opt !== option)
                              );
                            }
                          }}
                          className="w-4 h-4 text-accent-600 cursor-pointer"
                        />
                        <span className="text-slate-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4"
        >
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== questions.length}
            className={`flex-1 py-4 rounded-lg font-bold text-lg transition-all ${
              Object.keys(answers).length === questions.length
                ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:shadow-lg'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Anketi Gönder
          </button>
          <Link href="/surveys" className="btn-secondary py-4">
            İptal Et
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
