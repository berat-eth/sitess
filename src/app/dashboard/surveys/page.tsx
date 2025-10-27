'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { userSurveyHistory } from '@/data/dashboardMockData';
import { CheckCircle2, Clock, ArrowRight, Plus, Trash2, Copy, Share2, Eye, Save, Settings, X, FileText, Globe, Calendar, QrCode, TestTube, Layers, ChevronDown, ChevronRight, Languages, Smartphone, Monitor, Zap } from 'lucide-react';

interface Image {
  id: string;
  file: File;
  url: string;
  tags: string[];
  description: string;
  uploadedAt: string;
}

interface Question {
  id: string;
  type: 'text' | 'multiple-choice' | 'rating' | 'yes-no' | 'image';
  question: string;
  options?: string[];
  required: boolean;
  images?: Image[];
  conditionalLogic?: {
    showIf: string;
    condition: 'equals' | 'not-equals' | 'contains' | 'greater-than' | 'less-than';
    value: string;
  };
  translations?: { [language: string]: string };
}

interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  isPublished: boolean;
  createdAt: string;
  responses: number;
  languages?: string[];
  defaultLanguage?: string;
  templateId?: string;
  abTestVariants?: SurveyVariant[];
  scheduledDate?: string;
  shareSettings?: ShareSettings;
}

interface SurveyTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  questions: Question[];
  icon: string;
  color: string;
}

interface SurveyVariant {
  id: string;
  name: string;
  questions: Question[];
  trafficPercentage: number;
}

interface ShareSettings {
  qrCode: boolean;
  socialMedia: boolean;
  email: boolean;
  embedCode: boolean;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

export default function SurveysPage() {
  const completedSurveys = userSurveyHistory.filter(s => s.status === 'Tamamlandı');
  const activeSurveys = userSurveyHistory.filter(s => s.status === 'Devam Ediyor');
  
  // Survey Builder States
  const [showSurveyBuilder, setShowSurveyBuilder] = useState(false);
  const [survey, setSurvey] = useState<Survey>({
    id: '',
    title: 'Yeni Anket',
    description: '',
    questions: [],
    isPublished: false,
    createdAt: new Date().toISOString(),
    responses: 0,
    languages: ['tr'],
    defaultLanguage: 'tr',
    shareSettings: {
      qrCode: true,
      socialMedia: true,
      email: true,
      embedCode: false,
    },
  });
  const [showPreview, setShowPreview] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showImageManager, setShowImageManager] = useState(false);
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);
  const [currentImageTags, setCurrentImageTags] = useState<string>('');
  const [currentImageDescription, setCurrentImageDescription] = useState<string>('');
  
  // New states for advanced features
  const [showTemplates, setShowTemplates] = useState(false);
  const [showConditionalLogic, setShowConditionalLogic] = useState(false);
  const [showLanguageSettings, setShowLanguageSettings] = useState(false);
  const [showABTesting, setShowABTesting] = useState(false);
  const [showScheduling, setShowScheduling] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  // Mock data for templates and languages
  const surveyTemplates: SurveyTemplate[] = [
    {
      id: 'customer-satisfaction',
      name: 'Müşteri Memnuniyeti',
      description: 'Müşteri deneyimi ve memnuniyet ölçümü',
      category: 'Müşteri Deneyimi',
      icon: '😊',
      color: 'blue',
      questions: [
        { id: 'q1', type: 'rating', question: 'Genel memnuniyetiniz nasıl?', options: ['1', '2', '3', '4', '5'], required: true },
        { id: 'q2', type: 'multiple-choice', question: 'Hangi özelliği en çok beğeniyorsunuz?', options: ['Kalite', 'Fiyat', 'Hız', 'Hizmet'], required: true },
        { id: 'q3', type: 'yes-no', question: 'Ürünü tekrar satın alır mısınız?', options: ['Evet', 'Hayır'], required: true },
      ],
    },
    {
      id: 'employee-feedback',
      name: 'Çalışan Geri Bildirimi',
      description: 'İş ortamı ve çalışan memnuniyeti',
      category: 'İnsan Kaynakları',
      icon: '👥',
      color: 'green',
      questions: [
        { id: 'q1', type: 'rating', question: 'İş ortamından memnun musunuz?', options: ['1', '2', '3', '4', '5'], required: true },
        { id: 'q2', type: 'multiple-choice', question: 'En önemli faktör nedir?', options: ['Maaş', 'İş yükü', 'Sosyal haklar', 'Kariyer'], required: true },
        { id: 'q3', type: 'text', question: 'Ek önerileriniz var mı?', required: false },
      ],
    },
    {
      id: 'product-feedback',
      name: 'Ürün Değerlendirmesi',
      description: 'Ürün kalitesi ve kullanıcı deneyimi',
      category: 'Ürün Geliştirme',
      icon: '📱',
      color: 'purple',
      questions: [
        { id: 'q1', type: 'rating', question: 'Ürün kalitesini nasıl değerlendiriyorsunuz?', options: ['1', '2', '3', '4', '5'], required: true },
        { id: 'q2', type: 'multiple-choice', question: 'Hangi özellik en faydalı?', options: ['Kullanım kolaylığı', 'Hız', 'Tasarım', 'Fonksiyonellik'], required: true },
        { id: 'q3', type: 'yes-no', question: 'Ürünü arkadaşlarınıza önerir misiniz?', options: ['Evet', 'Hayır'], required: true },
      ],
    },
  ];

  const supportedLanguages: Language[] = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  // Survey Builder Functions
  const addQuestion = useCallback((type: Question['type']) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      question: '',
      options: type === 'multiple-choice' ? ['Seçenek 1', 'Seçenek 2'] : undefined,
      required: true,
    };
    setSurvey(prev => ({ ...prev, questions: [...prev.questions, newQuestion] }));
  }, []);

  const updateQuestion = useCallback((questionId: string, updates: Partial<Question>) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions.map(q => q.id === questionId ? { ...q, ...updates } : q),
    }));
  }, []);

  const deleteQuestion = useCallback((questionId: string) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId),
    }));
  }, []);

  const addOption = useCallback((questionId: string) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === questionId
          ? { ...q, options: [...(q.options || []), `Seçenek ${(q.options?.length || 0) + 1}`] }
          : q
      ),
    }));
  }, []);

  const updateOption = useCallback((questionId: string, optionIndex: number, value: string) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === questionId
          ? { ...q, options: q.options?.map((opt, idx) => idx === optionIndex ? value : opt) }
          : q
      ),
    }));
  }, []);

  const deleteOption = useCallback((questionId: string, optionIndex: number) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === questionId
          ? { ...q, options: q.options?.filter((_, idx) => idx !== optionIndex) }
          : q
      ),
    }));
  }, []);

  const publishSurvey = useCallback(() => {
    setSurvey(prev => ({ ...prev, isPublished: true }));
    setShowShare(true);
  }, []);

  const handleImageUpload = useCallback((files: FileList) => {
    const newImages: Image[] = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      tags: [],
      description: '',
      uploadedAt: new Date().toISOString(),
    }));
    setSelectedImages(prev => [...prev, ...newImages]);
  }, []);

  const updateImageTags = useCallback((imageId: string, tags: string[]) => {
    setSelectedImages(prev => prev.map(img => img.id === imageId ? { ...img, tags } : img));
  }, []);

  const updateImageDescription = useCallback((imageId: string, description: string) => {
    setSelectedImages(prev => prev.map(img => img.id === imageId ? { ...img, description } : img));
  }, []);

  const deleteImage = useCallback((imageId: string) => {
    setSelectedImages(prev => prev.filter(img => img.id !== imageId));
  }, []);

  const addImagesToQuestion = useCallback((questionId: string) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === questionId
          ? { ...q, images: [...(q.images || []), ...selectedImages] }
          : q
      ),
    }));
    setSelectedImages([]);
    setShowImageManager(false);
  }, [selectedImages]);

  // New advanced functions
  const useTemplate = useCallback((templateId: string) => {
    const template = surveyTemplates.find(t => t.id === templateId);
    if (template) {
      setSurvey(prev => ({
        ...prev,
        title: template.name,
        description: template.description,
        questions: template.questions.map(q => ({ ...q, id: Date.now().toString() + Math.random() })),
        templateId: template.id,
      }));
      setSelectedTemplate(templateId);
      setShowTemplates(false);
    }
  }, []);

  const cloneSurvey = useCallback((surveyToClone: Survey) => {
    setSurvey({
      ...surveyToClone,
      id: '',
      title: `${surveyToClone.title} (Kopya)`,
      isPublished: false,
      createdAt: new Date().toISOString(),
      responses: 0,
    });
    setShowSurveyBuilder(true);
  }, []);

  const addConditionalLogic = useCallback((questionId: string, logic: Question['conditionalLogic']) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === questionId ? { ...q, conditionalLogic: logic } : q
      ),
    }));
  }, []);

  const addLanguage = useCallback((languageCode: string) => {
    setSurvey(prev => ({
      ...prev,
      languages: [...(prev.languages || []), languageCode],
    }));
  }, []);

  const removeLanguage = useCallback((languageCode: string) => {
    setSurvey(prev => ({
      ...prev,
      languages: prev.languages?.filter(lang => lang !== languageCode),
    }));
  }, []);

  const generateQRCode = useCallback(() => {
    // Mock QR code generation
    const surveyUrl = `https://researchplatform.com/survey/${survey.id}`;
    return surveyUrl;
  }, [survey.id]);

  const generateEmbedCode = useCallback(() => {
    const embedCode = `<iframe src="https://researchplatform.com/embed/${survey.id}" width="100%" height="600" frameborder="0"></iframe>`;
    return embedCode;
  }, [survey.id]);

  const QuestionTypeSelector = useCallback(({ questionId }: { questionId: string }) => {
    const question = survey.questions.find(q => q.id === questionId);
    if (!question) return null;

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Soru Metni
          </label>
          <input
            type="text"
            value={question.question}
            onChange={(e) => updateQuestion(questionId, { question: e.target.value })}
            placeholder="Sorunuzu yazın..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {question.options && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Seçenekler
            </label>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(questionId, index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <button
                    onClick={() => deleteOption(questionId, index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addOption(questionId)}
                className="flex items-center gap-2 px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors text-sm"
              >
                <Plus size={16} />
                Seçenek Ekle
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={`required-${questionId}`}
            checked={question.required}
            onChange={(e) => updateQuestion(questionId, { required: e.target.checked })}
            className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor={`required-${questionId}`} className="text-sm text-slate-700">
            Bu soru zorunlu
          </label>
        </div>

        {question.type === 'image' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-slate-700">
                Görseller
              </label>
              <button
                onClick={() => setShowImageManager(true)}
                className="flex items-center gap-1 px-3 py-1 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors text-sm"
              >
                <Plus size={14} />
                Görsel Ekle
              </button>
            </div>

            {question.images && question.images.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {question.images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt={image.description}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <button
                        onClick={() => {
                          const updatedImages = question.images?.filter(img => img.id !== image.id);
                          updateQuestion(questionId, { images: updatedImages });
                        }}
                        className="p-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    {image.tags.length > 0 && (
                      <div className="absolute bottom-1 left-1 right-1">
                        <div className="bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                          {image.tags.join(', ')}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                <p className="text-sm text-slate-500">Henüz görsel eklenmedi</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }, [survey.questions, updateQuestion, updateOption, deleteOption, addOption, setShowImageManager]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex-1 overflow-auto bg-slate-50 min-h-screen">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-900 mb-2">Şirket Anketleri</h1>
              <p className="text-slate-600">Müşteri geri bildirimlerini toplamak için anketlerinizi yönetin</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowTemplates(true)}
                className="flex items-center gap-2 px-4 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                <FileText size={20} />
                Şablon Kullan
              </button>
              <button
                onClick={() => setShowSurveyBuilder(true)}
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus size={20} />
                Yeni Müşteri Anketi Oluştur
              </button>
            </div>
          </div>
        </motion.div>

        {/* Devam Eden Anketler */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Devam Eden Anketler ({activeSurveys.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeSurveys.map((survey) => (
              <motion.div
                key={survey.id}
                variants={itemVariants}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="text-primary-600 font-bold">{survey.category.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{survey.title}</h3>
                      <p className="text-sm text-slate-600">{survey.category}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {survey.status}
                  </span>
                </div>

                <p className="text-sm text-slate-600 mb-4">{survey.category}</p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-600">İlerleme</span>
                    <span className="text-sm font-bold text-primary-900">{survey.completionRate}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${survey.completionRate}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500">Bitiş: {survey.estimatedCompletion}</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => cloneSurvey(survey as any)}
                      className="text-slate-600 hover:text-slate-700 p-1 rounded transition-colors"
                      title="Anketi Kopyala"
                    >
                      <Copy size={14} />
                    </button>
                    <button className="text-accent-600 hover:text-accent-700 font-medium flex items-center gap-1">
                      Devam Et <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tamamlanan Anketler */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Tamamlanan Anketler ({completedSurveys.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedSurveys.map((survey) => (
              <motion.div
                key={survey.id}
                variants={itemVariants}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-primary-900">{survey.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {survey.category} • Tamamlanma: {survey.completionDate}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mb-2">
                      ✓ Tamamlandı
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => cloneSurvey(survey as any)}
                        className="text-slate-600 hover:text-slate-700 p-1 rounded transition-colors"
                        title="Anketi Kopyala"
                      >
                        <Copy size={14} />
                      </button>
                      <button className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                        Sonuçları Gör
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Survey Builder Modal */}
      {showSurveyBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Anket Oluşturucu</h3>
              <button
                onClick={() => setShowSurveyBuilder(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Survey Settings */}
              <div className="lg:col-span-1 space-y-6">
                {/* Basic Info */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="text-md font-semibold text-slate-900 mb-4">Anket Bilgileri</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Anket Başlığı
                      </label>
                      <input
                        type="text"
                        value={survey.title}
                        onChange={(e) => setSurvey(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Açıklama
                      </label>
                      <textarea
                        value={survey.description}
                        onChange={(e) => setSurvey(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        placeholder="Anketiniz hakkında kısa bir açıklama..."
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Features */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="text-md font-semibold text-slate-900 mb-4">Gelişmiş Özellikler</h4>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowLanguageSettings(true)}
                      className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-primary-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Languages className="h-5 w-5 text-blue-600" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-slate-900">Çoklu Dil</p>
                          <p className="text-xs text-slate-600">{survey.languages?.length || 1} dil aktif</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </button>

                    <button
                      onClick={() => setShowConditionalLogic(true)}
                      className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-primary-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Layers className="h-5 w-5 text-green-600" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-slate-900">Koşullu Sorular</p>
                          <p className="text-xs text-slate-600">Dinamik soru akışı</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </button>

                    <button
                      onClick={() => setShowABTesting(true)}
                      className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-primary-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <TestTube className="h-5 w-5 text-purple-600" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-slate-900">A/B Testing</p>
                          <p className="text-xs text-slate-600">Farklı versiyonlar test et</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </button>

                    <button
                      onClick={() => setShowScheduling(true)}
                      className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-primary-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-orange-600" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-slate-900">Zamanlama</p>
                          <p className="text-xs text-slate-600">Otomatik gönderim</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Question Types */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="text-md font-semibold text-slate-900 mb-4">Soru Türleri</h4>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => addQuestion('text')}
                      className="w-full flex items-center gap-2 p-2 border border-slate-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-sm"
                    >
                      <span className="w-6 h-6 bg-blue-100 rounded text-blue-600 text-xs flex items-center justify-center">T</span>
                      Metin Sorusu
                    </button>
                    <button
                      onClick={() => addQuestion('multiple-choice')}
                      className="w-full flex items-center gap-2 p-2 border border-slate-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-sm"
                    >
                      <span className="w-6 h-6 bg-green-100 rounded text-green-600 text-xs flex items-center justify-center">M</span>
                      Çoktan Seçmeli
                    </button>
                    <button
                      onClick={() => addQuestion('rating')}
                      className="w-full flex items-center gap-2 p-2 border border-slate-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-sm"
                    >
                      <span className="w-6 h-6 bg-yellow-100 rounded text-yellow-600 text-xs flex items-center justify-center">★</span>
                      Değerlendirme
                    </button>
                    <button
                      onClick={() => addQuestion('yes-no')}
                      className="w-full flex items-center gap-2 p-2 border border-slate-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-sm"
                    >
                      <span className="w-6 h-6 bg-purple-100 rounded text-purple-600 text-xs flex items-center justify-center">Y</span>
                      Evet/Hayır
                    </button>
                    <button
                      onClick={() => addQuestion('image')}
                      className="w-full flex items-center gap-2 p-2 border border-slate-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-sm"
                    >
                      <span className="w-6 h-6 bg-pink-100 rounded text-pink-600 text-xs flex items-center justify-center">📷</span>
                      Görsel Sorusu
                    </button>
                  </div>
                </div>
              </div>

              {/* Questions List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-slate-900">Sorular ({survey.questions.length})</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowPreview(true)}
                      className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                    >
                      <Eye size={16} />
                      Önizleme
                    </button>
                    <button
                      onClick={publishSurvey}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                    >
                      <Share2 size={16} />
                      Yayınla
                    </button>
                  </div>
                </div>

                {survey.questions.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-xl">
                    <p className="text-slate-500 mb-4">Henüz soru eklenmedi</p>
                    <p className="text-sm text-slate-400">Sol panelden soru türü seçerek başlayın</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {survey.questions.map((question, index) => (
                      <div key={question.id} className="bg-white border border-slate-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm">
                              {index + 1}
                            </span>
                            <div>
                              <p className="font-medium text-slate-900">
                                {question.type === 'text' && 'Metin Sorusu'}
                                {question.type === 'multiple-choice' && 'Çoktan Seçmeli'}
                                {question.type === 'rating' && 'Değerlendirme'}
                                {question.type === 'yes-no' && 'Evet/Hayır'}
                                {question.type === 'image' && 'Görsel Sorusu'}
                              </p>
                              <p className="text-sm text-slate-600">
                                {question.required ? 'Zorunlu' : 'İsteğe bağlı'}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteQuestion(question.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <QuestionTypeSelector questionId={question.id} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Template Selection Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Anket Şablonları</h3>
              <button
                onClick={() => setShowTemplates(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {surveyTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => useTemplate(template.id)}
                  className="p-4 border border-slate-200 rounded-xl hover:border-primary-300 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 bg-${template.color}-100 rounded-lg flex items-center justify-center`}>
                      <span className="text-lg">{template.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{template.name}</h4>
                      <p className="text-xs text-slate-600">{template.category}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{template.questions.length} soru</span>
                    <button className="px-3 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                      Kullan
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Language Settings Modal */}
      {showLanguageSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Dil Ayarları</h3>
              <button
                onClick={() => setShowLanguageSettings(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Varsayılan Dil
                </label>
                <select
                  value={survey.defaultLanguage}
                  onChange={(e) => setSurvey(prev => ({ ...prev, defaultLanguage: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {supportedLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Aktif Diller
                </label>
                <div className="space-y-2">
                  {supportedLanguages.map((lang) => (
                    <div key={lang.code} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={survey.languages?.includes(lang.code) || false}
                        onChange={(e) => {
                          if (e.target.checked) {
                            addLanguage(lang.code);
                          } else {
                            removeLanguage(lang.code);
                          }
                        }}
                        className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowLanguageSettings(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={() => setShowLanguageSettings(false)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Kaydet
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Conditional Logic Modal */}
      {showConditionalLogic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Koşullu Soru Mantığı</h3>
              <button
                onClick={() => setShowConditionalLogic(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Koşullu Sorular Nasıl Çalışır?</h4>
                <p className="text-sm text-blue-700">
                  Belirli sorulara verilen cevaplara göre diğer soruları gösterin veya gizleyin. 
                  Bu özellik anket deneyimini kişiselleştirir ve daha alakalı sorular sorar.
                </p>
              </div>

              <div className="space-y-3">
                {survey.questions.map((question, index) => (
                  <div key={question.id} className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">Soru {index + 1}</p>
                        <p className="text-sm text-slate-600">{question.question}</p>
                      </div>
                      <button
                        onClick={() => {
                          addConditionalLogic(question.id, {
                            showIf: '',
                            condition: 'equals',
                            value: ''
                          });
                        }}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        <Layers className="h-4 w-4 inline mr-1" />
                        Koşul Ekle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowConditionalLogic(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Kapat
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* A/B Testing Modal */}
      {showABTesting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">A/B Testing</h3>
              <button
                onClick={() => setShowABTesting(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">A/B Testing Nedir?</h4>
                <p className="text-sm text-purple-700">
                  Farklı anket versiyonlarını test ederek hangisinin daha iyi performans gösterdiğini öğrenin. 
                  Trafiği otomatik olarak böler ve sonuçları karşılaştırır.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-slate-900">Versiyon A (Orijinal)</h5>
                    <span className="text-sm text-slate-600">50% trafik</span>
                  </div>
                  <p className="text-sm text-slate-600">Mevcut anket versiyonunuz</p>
                </div>

                <div className="p-3 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-slate-900">Versiyon B</h5>
                    <span className="text-sm text-slate-600">50% trafik</span>
                  </div>
                  <p className="text-sm text-slate-600">Test edilecek yeni versiyon</p>
                  <button className="mt-2 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                    <TestTube className="h-4 w-4 inline mr-1" />
                    Versiyon Oluştur
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowABTesting(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Kapat
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Scheduling Modal */}
      {showScheduling && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Anket Zamanlama</h3>
              <button
                onClick={() => setShowScheduling(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Otomatik Gönderim</h4>
                <p className="text-sm text-orange-700">
                  Anketinizi belirli bir tarih ve saatte otomatik olarak yayınlayın. 
                  Bu özellik kampanya zamanlaması için idealdir.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Yayın Tarihi
                  </label>
                  <input
                    type="date"
                    value={survey.scheduledDate || ''}
                    onChange={(e) => setSurvey(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Yayın Saati
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="email-notification"
                    className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="email-notification" className="text-sm text-slate-700">
                    Yayınlandığında email bildirimi gönder
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowScheduling(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={() => setShowScheduling(false)}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Calendar className="h-4 w-4 inline mr-1" />
                Zamanla
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Anket Önizlemesi</h3>
              <div className="flex items-center gap-3">
                <div className="flex bg-slate-100 rounded-lg p-1">
                  <button
                    onClick={() => setPreviewMode('desktop')}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${
                      previewMode === 'desktop' 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Monitor className="h-4 w-4 inline mr-1" />
                    Desktop
                  </button>
                  <button
                    onClick={() => setPreviewMode('mobile')}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${
                      previewMode === 'mobile' 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Smartphone className="h-4 w-4 inline mr-1" />
                    Mobile
                  </button>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className={`${previewMode === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
              <div className={`bg-white border border-slate-200 rounded-lg p-6 ${previewMode === 'mobile' ? 'shadow-lg' : ''}`}>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">{survey.title}</h2>
                  <p className="text-slate-600">{survey.description}</p>
                </div>

                {survey.questions.map((question, index) => (
                  <div key={question.id} className="mt-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">
                      {index + 1}. {question.question}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </h3>

                    {question.type === 'text' && (
                      <input
                        type="text"
                        disabled
                        placeholder="Cevabınızı yazın..."
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50"
                      />
                    )}

                    {question.type === 'multiple-choice' && (
                      <div className="space-y-2">
                        {question.options?.map((option, optionIndex) => (
                          <label key={optionIndex} className="flex items-center gap-2">
                            <input type="radio" name={`q${index}`} disabled />
                            <span className="text-slate-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {question.type === 'rating' && (
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} disabled className="text-2xl text-slate-300">
                            ★
                          </button>
                        ))}
                      </div>
                    )}

                    {question.type === 'yes-no' && (
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input type="radio" name={`q${index}`} disabled />
                          <span className="text-slate-700">Evet</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" name={`q${index}`} disabled />
                          <span className="text-slate-700">Hayır</span>
                        </label>
                      </div>
                    )}

                    {question.type === 'image' && (
                      <div className="space-y-3">
                        {question.images && question.images.length > 0 ? (
                          <div className="grid grid-cols-2 gap-3">
                            {question.images.map((image) => (
                              <div key={image.id} className="border border-slate-200 rounded-lg p-3">
                                <img
                                  src={image.url}
                                  alt={image.description}
                                  className="w-full h-32 object-cover rounded-lg mb-2"
                                />
                                {image.description && (
                                  <p className="text-xs text-slate-600">{image.description}</p>
                                )}
                                {image.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {image.tags.map((tag, tagIndex) => (
                                      <span key={tagIndex} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                            <p className="text-slate-500">Henüz görsel eklenmedi</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Share Modal */}
      {showShare && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Anket Yayınlandı!</h3>
              <p className="text-slate-600 mb-6">
                Anketiniz başarıyla yayınlandı ve paylaşılabilir durumda.
              </p>

              <div className="space-y-4">
                {/* QR Code */}
                <div className="p-4 bg-slate-50 rounded-lg text-center">
                  <QrCode className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 mb-2">QR Kod ile Paylaş</p>
                  <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm">
                    QR Kod İndir
                  </button>
                </div>

                {/* Survey Link */}
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Anket Linki:</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={`https://researchplatform.com/survey/${survey.id}`}
                      readOnly
                      className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                    />
                    <button className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                {/* Social Media Sharing */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">Sosyal Medyada Paylaş:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                      <Share2 size={14} />
                      WhatsApp
                    </button>
                    <button className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                      <Share2 size={14} />
                      Twitter
                    </button>
                    <button className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      <Share2 size={14} />
                      LinkedIn
                    </button>
                    <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm">
                      <Share2 size={14} />
                      Email
                    </button>
                  </div>
                </div>

                {/* Embed Code */}
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Embed Kodu:</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={generateEmbedCode()}
                      readOnly
                      className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                    />
                    <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowShare(false);
                    setShowSurveyBuilder(false);
                  }}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Tamam
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Image Manager Modal */}
      {showImageManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Görsel Yöneticisi</h3>
              <button
                onClick={() => setShowImageManager(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Upload Area */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Görsel Yükle
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Plus className="h-6 w-6 text-primary-600" />
                  </div>
                  <p className="text-sm text-slate-600">
                    Görselleri sürükleyip bırakın veya tıklayarak seçin
                  </p>
                  <p className="text-xs text-slate-500">
                    PNG, JPG, GIF formatları desteklenir
                  </p>
                </label>
              </div>
            </div>

            {/* Image Gallery */}
            {selectedImages.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-slate-900">Yüklenen Görseller</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedImages.map((image) => (
                    <div key={image.id} className="border border-slate-200 rounded-lg p-3">
                      <div className="relative mb-3">
                        <img
                          src={image.url}
                          alt="Uploaded"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => deleteImage(image.id)}
                          className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Açıklama
                          </label>
                          <input
                            type="text"
                            value={image.description}
                            onChange={(e) => updateImageDescription(image.id, e.target.value)}
                            placeholder="Görsel açıklaması..."
                            className="w-full px-2 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Etiketler (virgülle ayırın)
                          </label>
                          <input
                            type="text"
                            value={image.tags.join(', ')}
                            onChange={(e) => {
                              const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
                              updateImageTags(image.id, tags);
                            }}
                            placeholder="etiket1, etiket2, etiket3"
                            className="w-full px-2 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
              <button
                onClick={() => {
                  setSelectedImages([]);
                  setShowImageManager(false);
                }}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  setShowImageManager(false);
                }}
                disabled={selectedImages.length === 0}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors text-sm"
              >
                Görselleri Ekle ({selectedImages.length})
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
