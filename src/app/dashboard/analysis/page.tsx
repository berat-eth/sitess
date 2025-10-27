<<<<<<< HEAD
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
} from 'recharts';
import { Calculator, TrendingUp, BarChart3, Target, Zap, PieChart as PieChartIcon, ScatterChart as ScatterChartIcon, FileBarChart, Download, Eye, RefreshCw, Users, Calendar, BarChart as BarChartIcon, Filter, Settings, Clock, Activity, Globe, Database } from 'lucide-react';
import * as ss from 'simple-statistics';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface SurveyResponse {
  id: string;
  surveyId: string;
  responses: { [questionId: string]: any };
  timestamp: string;
  userId?: string;
  segment?: string;
  location?: string;
}

interface Survey {
  id: string;
  title: string;
  questions: Array<{
    id: string;
    type: string;
    question: string;
    options?: string[];
  }>;
  responses: SurveyResponse[];
  createdAt: string;
  updatedAt: string;
}

interface AnalysisResult {
  type: 'descriptive' | 'categorical';
  data: any;
  chartData: any[];
  summary: string;
}

interface Segment {
  id: string;
  name: string;
  criteria: any;
  color: string;
}

interface Benchmark {
  metric: string;
  industry: string;
  average: number;
  percentile: number;
}

interface TrendData {
  period: string;
  value: number;
  change: number;
}

export default function AnalysisCenterPage() {
  const [selectedSurvey, setSelectedSurvey] = useState<string>('');
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [selectedChartType, setSelectedChartType] = useState('bar');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // New states for advanced features
  const [isRealTime, setIsRealTime] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{start: string, end: string}>({
    start: '2024-01-01',
    end: '2024-12-31'
  });
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [showBenchmarks, setShowBenchmarks] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Mock surveys with enhanced responses
  const mockSurveys: Survey[] = [
    {
      id: '1',
      title: 'Müşteri Memnuniyet Anketi',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-20',
      questions: [
        { id: 'q1', type: 'rating', question: 'Genel memnuniyetiniz nasıl?', options: ['1', '2', '3', '4', '5'] },
        { id: 'q2', type: 'multiple-choice', question: 'Hangi özelliği en çok beğeniyorsunuz?', options: ['Kalite', 'Fiyat', 'Hız', 'Hizmet'] },
        { id: 'q3', type: 'yes-no', question: 'Ürünü tekrar satın alır mısınız?', options: ['Evet', 'Hayır'] },
      ],
      responses: [
        { id: 'r1', surveyId: '1', responses: { q1: '5', q2: 'Kalite', q3: 'Evet' }, timestamp: '2024-01-15', userId: 'u1', segment: 'premium', location: 'İstanbul' },
        { id: 'r2', surveyId: '1', responses: { q1: '4', q2: 'Fiyat', q3: 'Evet' }, timestamp: '2024-01-15', userId: 'u2', segment: 'standard', location: 'Ankara' },
        { id: 'r3', surveyId: '1', responses: { q1: '5', q2: 'Hız', q3: 'Hayır' }, timestamp: '2024-01-16', userId: 'u3', segment: 'premium', location: 'İzmir' },
        { id: 'r4', surveyId: '1', responses: { q1: '3', q2: 'Hizmet', q3: 'Evet' }, timestamp: '2024-01-16', userId: 'u4', segment: 'basic', location: 'Bursa' },
        { id: 'r5', surveyId: '1', responses: { q1: '4', q2: 'Kalite', q3: 'Evet' }, timestamp: '2024-01-17', userId: 'u5', segment: 'standard', location: 'Antalya' },
        { id: 'r6', surveyId: '1', responses: { q1: '5', q2: 'Kalite', q3: 'Evet' }, timestamp: '2024-01-18', userId: 'u6', segment: 'premium', location: 'İstanbul' },
        { id: 'r7', surveyId: '1', responses: { q1: '2', q2: 'Fiyat', q3: 'Hayır' }, timestamp: '2024-01-19', userId: 'u7', segment: 'basic', location: 'Adana' },
        { id: 'r8', surveyId: '1', responses: { q1: '4', q2: 'Hız', q3: 'Evet' }, timestamp: '2024-01-20', userId: 'u8', segment: 'standard', location: 'Gaziantep' },
      ],
    },
    {
      id: '2',
      title: 'Çalışan Memnuniyet Anketi',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-25',
      questions: [
        { id: 'q1', type: 'rating', question: 'İş ortamından memnun musunuz?', options: ['1', '2', '3', '4', '5'] },
        { id: 'q2', type: 'multiple-choice', question: 'En çok hangi konuda iyileştirme istersiniz?', options: ['Maaş', 'İş yükü', 'Sosyal haklar', 'Kariyer'] },
      ],
      responses: [
        { id: 'r1', surveyId: '2', responses: { q1: '4', q2: 'Maaş' }, timestamp: '2024-01-15', userId: 'u9', segment: 'premium', location: 'İstanbul' },
        { id: 'r2', surveyId: '2', responses: { q1: '3', q2: 'İş yükü' }, timestamp: '2024-01-15', userId: 'u10', segment: 'standard', location: 'Ankara' },
        { id: 'r3', surveyId: '2', responses: { q1: '5', q2: 'Sosyal haklar' }, timestamp: '2024-01-16', userId: 'u11', segment: 'premium', location: 'İzmir' },
      ],
    },
  ];

  // Mock segments
  const mockSegments: Segment[] = [
    { id: 'premium', name: 'Premium Müşteriler', criteria: { value: 'high' }, color: '#8B5CF6' },
    { id: 'standard', name: 'Standart Müşteriler', criteria: { value: 'medium' }, color: '#3B82F6' },
    { id: 'basic', name: 'Temel Müşteriler', criteria: { value: 'low' }, color: '#10B981' },
  ];

  // Mock benchmarks
  const mockBenchmarks: Benchmark[] = [
    { metric: 'Memnuniyet Skoru', industry: 'Teknoloji', average: 4.2, percentile: 75 },
    { metric: 'Tekrar Satın Alma', industry: 'E-ticaret', average: 68, percentile: 60 },
    { metric: 'Öneri Oranı', industry: 'Hizmet', average: 45, percentile: 80 },
  ];

  // Mock trend data
  const mockTrendData: TrendData[] = [
    { period: '2024-01', value: 4.1, change: 0.1 },
    { period: '2024-02', value: 4.3, change: 0.2 },
    { period: '2024-03', value: 4.2, change: -0.1 },
    { period: '2024-04', value: 4.5, change: 0.3 },
    { period: '2024-05', value: 4.4, change: -0.1 },
  ];

  const currentSurvey = mockSurveys.find(s => s.id === selectedSurvey);
  const currentQuestion = currentSurvey?.questions.find(q => q.id === selectedQuestion);

  const analyzeData = useCallback(() => {
    if (!currentSurvey || !currentQuestion) return;

    setIsLoading(true);
    setTimeout(() => {
      const responses = currentSurvey.responses.map(r => r.responses[currentQuestion.id]);
      
      let result: any = {};
      
      if (currentQuestion.type === 'rating') {
        const numericResponses = responses.map(r => parseInt(r)).filter(r => !isNaN(r));
        result = {
          type: 'descriptive',
          data: {
            mean: ss.mean(numericResponses),
            median: ss.median(numericResponses),
            mode: ss.mode(numericResponses),
            stdDev: ss.standardDeviation(numericResponses),
            min: ss.min(numericResponses),
            max: ss.max(numericResponses),
          },
          chartData: numericResponses.reduce((acc, val) => {
            const existing = acc.find(item => item.name === val.toString());
            if (existing) existing.value++;
            else acc.push({ name: val.toString(), value: 1 });
            return acc;
          }, [] as any[]),
        };
      } else if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'yes-no') {
        result = {
          type: 'categorical',
          data: responses.reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
          }, {} as any),
          chartData: Object.entries(responses.reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
          }, {} as any)).map(([name, value]) => ({ name, value })),
        };
      }

      setAnalysisResult(result);
      setIsLoading(false);
    }, 1000);
  }, [currentSurvey, currentQuestion]);

  const generatePDF = () => {
    if (!analysisResult || !currentSurvey || !currentQuestion) return;

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Anket Analiz Raporu', 20, 30);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Anket: ${currentSurvey.title}`, 20, 40);
    doc.text(`Soru: ${currentQuestion.question}`, 20, 50);
    doc.text(`Analiz Tarihi: ${new Date().toLocaleDateString('tr-TR')}`, 20, 60);
    
    // Results
    doc.addPage();
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Analiz Sonuçları', 20, 30);
    
    if (analysisResult.type === 'descriptive') {
      const statsTable = [
        ['İstatistik', 'Değer'],
        ['Ortalama', analysisResult.data.mean.toFixed(2)],
        ['Medyan', analysisResult.data.median.toFixed(2)],
        ['Mod', analysisResult.data.mode.toString()],
        ['Standart Sapma', analysisResult.data.stdDev.toFixed(2)],
        ['Minimum', analysisResult.data.min.toString()],
        ['Maksimum', analysisResult.data.max.toString()],
      ];
      
      autoTable(doc, {
        head: [statsTable[0]],
        body: statsTable.slice(1),
        startY: 50,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [59, 130, 246] },
      });
    } else if (analysisResult.type === 'categorical') {
      const catTable = [
        ['Seçenek', 'Sayı', 'Yüzde'],
        ...Object.entries(analysisResult.data).map(([key, value]: [string, any]) => [
          key,
          value.toString(),
          `${((value / currentSurvey.responses.length) * 100).toFixed(1)}%`
        ])
      ];
      
      autoTable(doc, {
        head: [catTable[0]],
        body: catTable.slice(1),
        startY: 50,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [16, 185, 129] },
      });
    }
    
    doc.save(`${currentSurvey.title}_analiz_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Excel Export Function
  const exportToExcel = () => {
    if (!currentSurvey || !currentQuestion) return;

    const data = currentSurvey.responses.map(response => ({
      'Cevap ID': response.id,
      'Kullanıcı ID': response.userId || 'N/A',
      'Segment': response.segment || 'N/A',
      'Lokasyon': response.location || 'N/A',
      'Cevap': response.responses[currentQuestion.id],
      'Tarih': new Date(response.timestamp).toLocaleDateString('tr-TR'),
    }));

    // Create CSV content
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${(row as any)[header]}"`).join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${currentSurvey.title}_veriler_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Real-time refresh function
  const refreshData = useCallback(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (selectedSurvey && selectedQuestion) {
        analyzeData();
      }
      setIsLoading(false);
    }, 1000);
  }, [selectedSurvey, selectedQuestion, analyzeData]);

  // Auto-refresh effect
  useEffect(() => {
    if (autoRefresh && isRealTime) {
      const interval = setInterval(refreshData, 30000); // 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh, isRealTime, selectedSurvey, selectedQuestion, refreshData]);

  const renderChart = () => {
    if (!analysisResult?.chartData) return null;

    switch (selectedChartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={analysisResult.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={analysisResult.chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {analysisResult.chartData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={analysisResult.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const StatCard = ({ title, value, icon: Icon, color = 'primary' }: {
    title: string;
    value: string | number;
    icon: any;
    color?: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Gelişmiş Analiz Merkezi</h1>
            <p className="text-slate-600">
              Gerçek zamanlı analiz, segmentasyon ve benchmarking ile anketlerinizi derinlemesine analiz edin.
            </p>
          </div>
          
          {/* Real-time Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isRealTime ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm font-medium text-slate-600">
                {isRealTime ? 'Canlı Veri' : 'Statik Veri'}
              </span>
            </div>
            
            <button
              onClick={() => setIsRealTime(!isRealTime)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                isRealTime 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Activity className="h-4 w-4 inline mr-1" />
              {isRealTime ? 'Canlı' : 'Statik'}
            </button>
            
            {isRealTime && (
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  autoRefresh 
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <RefreshCw className={`h-4 w-4 inline mr-1 ${autoRefresh ? 'animate-spin' : ''}`} />
                Otomatik
              </button>
            )}
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Toplam Anket</p>
                <p className="text-lg font-bold text-slate-900">{mockSurveys.length}</p>
              </div>
              <BarChartIcon className="h-5 w-5 text-slate-400" />
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Toplam Cevap</p>
                <p className="text-lg font-bold text-slate-900">
                  {mockSurveys.reduce((sum, s) => sum + s.responses.length, 0)}
                </p>
              </div>
              <Users className="h-5 w-5 text-slate-400" />
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Aktif Segment</p>
                <p className="text-lg font-bold text-slate-900">{mockSegments.length}</p>
              </div>
              <Filter className="h-5 w-5 text-slate-400" />
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Son Güncelleme</p>
                <p className="text-sm font-medium text-slate-900">
                  {isRealTime ? 'Şimdi' : '2 saat önce'}
                </p>
              </div>
              <Clock className="h-5 w-5 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Survey and Question Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Anket Seçin</h3>
          
          <div className="space-y-3">
            {mockSurveys.map((survey) => (
              <motion.button
                key={survey.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setSelectedSurvey(survey.id);
                  setSelectedQuestion('');
                  setAnalysisResult(null);
                }}
                className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                  selectedSurvey === survey.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-slate-200 hover:border-primary-300'
                }`}
              >
                <h4 className="font-semibold text-slate-900">{survey.title}</h4>
                <p className="text-sm text-slate-600 mt-1">
                  {survey.responses.length} cevap • {survey.questions.length} soru
                </p>
              </motion.button>
            ))}
          </div>
        </div>

        {currentSurvey && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Soru Seçin</h3>
            
            <div className="space-y-3">
              {currentSurvey.questions.map((question) => (
                <motion.button
                  key={question.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSelectedQuestion(question.id);
                    setAnalysisResult(null);
                  }}
                  className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                    selectedQuestion === question.id
                      ? 'border-accent-500 bg-accent-50'
                      : 'border-slate-200 hover:border-accent-300'
                  }`}
                >
                  <h4 className="font-semibold text-slate-900">{question.question}</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    {question.type === 'rating' && 'Değerlendirme (1-5)'}
                    {question.type === 'multiple-choice' && 'Çoktan Seçmeli'}
                    {question.type === 'yes-no' && 'Evet/Hayır'}
                    {question.type === 'text' && 'Metin'}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Advanced Filters and Segmentation */}
      {currentSurvey && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Gelişmiş Filtreler ve Segmentasyon</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Segment Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Müşteri Segmenti
              </label>
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Tüm Segmentler</option>
                {mockSegments.map((segment) => (
                  <option key={segment.id} value={segment.id}>
                    {segment.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tarih Aralığı
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="flex-1 p-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="flex-1 p-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            
            {/* Comparison Mode */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Karşılaştırma Modu
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setComparisonMode(!comparisonMode)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    comparisonMode 
                      ? 'bg-primary-100 text-primary-700 border border-primary-300' 
                      : 'bg-slate-100 text-slate-700 border border-slate-300'
                  }`}
                >
                  <BarChartIcon className="h-4 w-4 inline mr-1" />
                  Karşılaştır
                </button>
                
                <button
                  onClick={() => setShowBenchmarks(!showBenchmarks)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    showBenchmarks 
                      ? 'bg-green-100 text-green-700 border border-green-300' 
                      : 'bg-slate-100 text-slate-700 border border-slate-300'
                  }`}
                >
                  <Target className="h-4 w-4 inline mr-1" />
                  Benchmark
                </button>
              </div>
            </div>
          </div>
          
          {/* Segment Comparison */}
          {comparisonMode && (
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-semibold text-slate-900 mb-3">Segment Karşılaştırması</h4>
              <div className="flex flex-wrap gap-2">
                {mockSegments.map((segment) => (
                  <button
                    key={segment.id}
                    onClick={() => {
                      if (selectedSegments.includes(segment.id)) {
                        setSelectedSegments(prev => prev.filter(s => s !== segment.id));
                      } else {
                        setSelectedSegments(prev => [...prev, segment.id]);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedSegments.includes(segment.id)
                        ? 'bg-primary-100 text-primary-700 border border-primary-300'
                        : 'bg-white text-slate-700 border border-slate-300 hover:border-primary-300'
                    }`}
                    style={{ 
                      backgroundColor: selectedSegments.includes(segment.id) ? segment.color + '20' : undefined,
                      borderColor: selectedSegments.includes(segment.id) ? segment.color : undefined
                    }}
                  >
                    {segment.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Analysis Controls */}
      {currentSurvey && currentQuestion && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Analiz Kontrolleri</h3>
            
            <div className="flex gap-3">
              <button
                onClick={analyzeData}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Analiz Ediliyor...
                  </>
                ) : (
                  <>
                    <Calculator size={16} />
                    Analiz Et
                  </>
                )}
              </button>
              
              <button
                onClick={refreshData}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw size={16} />
                Yenile
              </button>
              
              {analysisResult && (
                <>
                  <button
                    onClick={generatePDF}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
                  >
                    <Download size={16} />
                    PDF İndir
                  </button>
                  
                  <button
                    onClick={exportToExcel}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Database size={16} />
                    Excel İndir
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Chart Type Selection */}
          {analysisResult && (
            <div className="mb-6">
              <h4 className="text-md font-semibold text-slate-900 mb-3">Grafik Türü</h4>
              <div className="flex gap-3">
                {[
                  { id: 'bar', name: 'Bar Grafik', icon: BarChart3 },
                  { id: 'pie', name: 'Pasta Grafik', icon: PieChartIcon },
                  { id: 'line', name: 'Çizgi Grafik', icon: TrendingUp },
                ].map((chart) => {
                  const Icon = chart.icon;
                  return (
                    <button
                      key={chart.id}
                      onClick={() => setSelectedChartType(chart.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        selectedChartType === chart.id
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-slate-200 hover:border-primary-300'
                      }`}
                    >
                      <Icon size={16} />
                      {chart.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Statistics Cards */}
          {analysisResult.type === 'descriptive' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard
                title="Ortalama"
                value={analysisResult.data.mean.toFixed(2)}
                icon={BarChart3}
                color="primary"
              />
              <StatCard
                title="Medyan"
                value={analysisResult.data.median.toFixed(2)}
                icon={Target}
                color="accent"
              />
              <StatCard
                title="Mod"
                value={analysisResult.data.mode}
                icon={Zap}
                color="green"
              />
              <StatCard
                title="Std. Sapma"
                value={analysisResult.data.stdDev.toFixed(2)}
                icon={TrendingUp}
                color="blue"
              />
              <StatCard
                title="Minimum"
                value={analysisResult.data.min}
                icon={Target}
                color="purple"
              />
              <StatCard
                title="Maksimum"
                value={analysisResult.data.max}
                icon={Target}
                color="yellow"
              />
            </div>
          )}

          {/* Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Görselleştirme</h3>
            <div className="h-[400px]">
              {renderChart()}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Analiz Özeti</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-600">{currentSurvey?.responses.length}</p>
                <p className="text-sm text-slate-600">Toplam Cevap</p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-accent-600">
                  {analysisResult.type === 'descriptive' 
                    ? analysisResult.data.mean.toFixed(1)
                    : Object.keys(analysisResult.data).length
                  }
                </p>
                <p className="text-sm text-slate-600">
                  {analysisResult.type === 'descriptive' ? 'Ortalama Puan' : 'Farklı Seçenek'}
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {analysisResult.type === 'categorical' 
                    ? `${Math.max(...Object.values(analysisResult.data) as number[])}`
                    : 'N/A'
                  }
                </p>
                <p className="text-sm text-slate-600">
                  {analysisResult.type === 'categorical' ? 'En Popüler Seçenek' : 'Standart Sapma'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Benchmarking Section */}
      {showBenchmarks && analysisResult && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Sektör Benchmarking
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockBenchmarks.map((benchmark, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900">{benchmark.metric}</h4>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {benchmark.percentile}%
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Sektör Ortalaması:</span>
                    <span className="font-medium">{benchmark.average}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Sizin Skorunuz:</span>
                    <span className="font-medium text-primary-600">
                      {analysisResult.type === 'descriptive' 
                        ? analysisResult.data.mean.toFixed(1)
                        : 'N/A'
                      }
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${benchmark.percentile}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trend Analysis */}
      {analysisResult && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Trend Analizi
          </h3>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Son Dönem Değişim</h4>
              <p className="text-2xl font-bold text-blue-600">
                {mockTrendData[mockTrendData.length - 1].change > 0 ? '+' : ''}
                {mockTrendData[mockTrendData.length - 1].change}
              </p>
              <p className="text-sm text-blue-700">
                {mockTrendData[mockTrendData.length - 1].change > 0 ? 'Artış' : 'Azalış'}
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Ortalama Trend</h4>
              <p className="text-2xl font-bold text-green-600">
                {mockTrendData.reduce((sum, d) => sum + d.change, 0) / mockTrendData.length > 0 ? '+' : ''}
                {(mockTrendData.reduce((sum, d) => sum + d.change, 0) / mockTrendData.length).toFixed(2)}
              </p>
              <p className="text-sm text-green-700">Aylık Ortalama</p>
            </div>
          </div>
        </div>
      )}

      {/* API Integration Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-purple-600" />
          API Entegrasyonu
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 mb-2">Webhook URL</h4>
            <div className="flex gap-2">
              <input
                type="text"
                value="https://api.researchplatform.com/webhook/survey-data"
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
              />
              <button className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                Kopyala
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Yeni anket cevapları otomatik olarak bu URL&apos;ye gönderilir
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 mb-2">API Key</h4>
            <div className="flex gap-2">
              <input
                type="text"
                value="sk_live_1234567890abcdef"
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
              />
              <button className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                Yenile
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              API erişimi için gerekli anahtar
            </p>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">API Dokümantasyonu</h4>
          <p className="text-sm text-blue-700 mb-3">
            Detaylı API dokümantasyonu ve örnek kodlar için:
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              <Globe className="h-4 w-4 inline mr-1" />
              API Docs
            </button>
            <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 text-sm">
              <Database className="h-4 w-4 inline mr-1" />
              Postman Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
=======
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
} from 'recharts';
import { Calculator, TrendingUp, BarChart3, Target, Zap, PieChart as PieChartIcon, ScatterChart as ScatterChartIcon, FileBarChart, Download, Eye, RefreshCw, Users, Calendar, BarChart as BarChartIcon, Filter, Settings, Clock, Activity, Globe, Database } from 'lucide-react';
import * as ss from 'simple-statistics';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface SurveyResponse {
  id: string;
  surveyId: string;
  responses: { [questionId: string]: any };
  timestamp: string;
  userId?: string;
  segment?: string;
  location?: string;
}

interface Survey {
  id: string;
  title: string;
  questions: Array<{
    id: string;
    type: string;
    question: string;
    options?: string[];
  }>;
  responses: SurveyResponse[];
  createdAt: string;
  updatedAt: string;
}

interface AnalysisResult {
  type: 'descriptive' | 'categorical';
  data: any;
  chartData: any[];
  summary: string;
}

interface Segment {
  id: string;
  name: string;
  criteria: any;
  color: string;
}

interface Benchmark {
  metric: string;
  industry: string;
  average: number;
  percentile: number;
}

interface TrendData {
  period: string;
  value: number;
  change: number;
}

export default function AnalysisCenterPage() {
  const [selectedSurvey, setSelectedSurvey] = useState<string>('');
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [selectedChartType, setSelectedChartType] = useState('bar');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // New states for advanced features
  const [isRealTime, setIsRealTime] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{start: string, end: string}>({
    start: '2024-01-01',
    end: '2024-12-31'
  });
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [showBenchmarks, setShowBenchmarks] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Mock surveys with enhanced responses
  const mockSurveys: Survey[] = [
    {
      id: '1',
      title: 'Müşteri Memnuniyet Anketi',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-20',
      questions: [
        { id: 'q1', type: 'rating', question: 'Genel memnuniyetiniz nasıl?', options: ['1', '2', '3', '4', '5'] },
        { id: 'q2', type: 'multiple-choice', question: 'Hangi özelliği en çok beğeniyorsunuz?', options: ['Kalite', 'Fiyat', 'Hız', 'Hizmet'] },
        { id: 'q3', type: 'yes-no', question: 'Ürünü tekrar satın alır mısınız?', options: ['Evet', 'Hayır'] },
      ],
      responses: [
        { id: 'r1', surveyId: '1', responses: { q1: '5', q2: 'Kalite', q3: 'Evet' }, timestamp: '2024-01-15', userId: 'u1', segment: 'premium', location: 'İstanbul' },
        { id: 'r2', surveyId: '1', responses: { q1: '4', q2: 'Fiyat', q3: 'Evet' }, timestamp: '2024-01-15', userId: 'u2', segment: 'standard', location: 'Ankara' },
        { id: 'r3', surveyId: '1', responses: { q1: '5', q2: 'Hız', q3: 'Hayır' }, timestamp: '2024-01-16', userId: 'u3', segment: 'premium', location: 'İzmir' },
        { id: 'r4', surveyId: '1', responses: { q1: '3', q2: 'Hizmet', q3: 'Evet' }, timestamp: '2024-01-16', userId: 'u4', segment: 'basic', location: 'Bursa' },
        { id: 'r5', surveyId: '1', responses: { q1: '4', q2: 'Kalite', q3: 'Evet' }, timestamp: '2024-01-17', userId: 'u5', segment: 'standard', location: 'Antalya' },
        { id: 'r6', surveyId: '1', responses: { q1: '5', q2: 'Kalite', q3: 'Evet' }, timestamp: '2024-01-18', userId: 'u6', segment: 'premium', location: 'İstanbul' },
        { id: 'r7', surveyId: '1', responses: { q1: '2', q2: 'Fiyat', q3: 'Hayır' }, timestamp: '2024-01-19', userId: 'u7', segment: 'basic', location: 'Adana' },
        { id: 'r8', surveyId: '1', responses: { q1: '4', q2: 'Hız', q3: 'Evet' }, timestamp: '2024-01-20', userId: 'u8', segment: 'standard', location: 'Gaziantep' },
      ],
    },
    {
      id: '2',
      title: 'Çalışan Memnuniyet Anketi',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-25',
      questions: [
        { id: 'q1', type: 'rating', question: 'İş ortamından memnun musunuz?', options: ['1', '2', '3', '4', '5'] },
        { id: 'q2', type: 'multiple-choice', question: 'En çok hangi konuda iyileştirme istersiniz?', options: ['Maaş', 'İş yükü', 'Sosyal haklar', 'Kariyer'] },
      ],
      responses: [
        { id: 'r1', surveyId: '2', responses: { q1: '4', q2: 'Maaş' }, timestamp: '2024-01-15', userId: 'u9', segment: 'premium', location: 'İstanbul' },
        { id: 'r2', surveyId: '2', responses: { q1: '3', q2: 'İş yükü' }, timestamp: '2024-01-15', userId: 'u10', segment: 'standard', location: 'Ankara' },
        { id: 'r3', surveyId: '2', responses: { q1: '5', q2: 'Sosyal haklar' }, timestamp: '2024-01-16', userId: 'u11', segment: 'premium', location: 'İzmir' },
      ],
    },
  ];

  // Mock segments
  const mockSegments: Segment[] = [
    { id: 'premium', name: 'Premium Müşteriler', criteria: { value: 'high' }, color: '#8B5CF6' },
    { id: 'standard', name: 'Standart Müşteriler', criteria: { value: 'medium' }, color: '#3B82F6' },
    { id: 'basic', name: 'Temel Müşteriler', criteria: { value: 'low' }, color: '#10B981' },
  ];

  // Mock benchmarks
  const mockBenchmarks: Benchmark[] = [
    { metric: 'Memnuniyet Skoru', industry: 'Teknoloji', average: 4.2, percentile: 75 },
    { metric: 'Tekrar Satın Alma', industry: 'E-ticaret', average: 68, percentile: 60 },
    { metric: 'Öneri Oranı', industry: 'Hizmet', average: 45, percentile: 80 },
  ];

  // Mock trend data
  const mockTrendData: TrendData[] = [
    { period: '2024-01', value: 4.1, change: 0.1 },
    { period: '2024-02', value: 4.3, change: 0.2 },
    { period: '2024-03', value: 4.2, change: -0.1 },
    { period: '2024-04', value: 4.5, change: 0.3 },
    { period: '2024-05', value: 4.4, change: -0.1 },
  ];

  const currentSurvey = mockSurveys.find(s => s.id === selectedSurvey);
  const currentQuestion = currentSurvey?.questions.find(q => q.id === selectedQuestion);

  const analyzeData = () => {
    if (!currentSurvey || !currentQuestion) return;

    setIsLoading(true);
    setTimeout(() => {
      const responses = currentSurvey.responses.map(r => r.responses[currentQuestion.id]);
      
      let result: any = {};
      
      if (currentQuestion.type === 'rating') {
        const numericResponses = responses.map(r => parseInt(r)).filter(r => !isNaN(r));
        result = {
          type: 'descriptive',
          data: {
            mean: ss.mean(numericResponses),
            median: ss.median(numericResponses),
            mode: ss.mode(numericResponses),
            stdDev: ss.standardDeviation(numericResponses),
            min: ss.min(numericResponses),
            max: ss.max(numericResponses),
          },
          chartData: numericResponses.reduce((acc, val) => {
            const existing = acc.find(item => item.name === val.toString());
            if (existing) existing.value++;
            else acc.push({ name: val.toString(), value: 1 });
            return acc;
          }, [] as any[]),
        };
      } else if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'yes-no') {
        result = {
          type: 'categorical',
          data: responses.reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
          }, {} as any),
          chartData: Object.entries(responses.reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
          }, {} as any)).map(([name, value]) => ({ name, value })),
        };
      }

      setAnalysisResult(result);
      setIsLoading(false);
    }, 1000);
  };

  const generatePDF = () => {
    if (!analysisResult || !currentSurvey || !currentQuestion) return;

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Anket Analiz Raporu', 20, 30);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Anket: ${currentSurvey.title}`, 20, 40);
    doc.text(`Soru: ${currentQuestion.question}`, 20, 50);
    doc.text(`Analiz Tarihi: ${new Date().toLocaleDateString('tr-TR')}`, 20, 60);
    
    // Results
    doc.addPage();
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Analiz Sonuçları', 20, 30);
    
    if (analysisResult.type === 'descriptive') {
      const statsTable = [
        ['İstatistik', 'Değer'],
        ['Ortalama', analysisResult.data.mean.toFixed(2)],
        ['Medyan', analysisResult.data.median.toFixed(2)],
        ['Mod', analysisResult.data.mode.toString()],
        ['Standart Sapma', analysisResult.data.stdDev.toFixed(2)],
        ['Minimum', analysisResult.data.min.toString()],
        ['Maksimum', analysisResult.data.max.toString()],
      ];
      
      autoTable(doc, {
        head: [statsTable[0]],
        body: statsTable.slice(1),
        startY: 50,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [59, 130, 246] },
      });
    } else if (analysisResult.type === 'categorical') {
      const catTable = [
        ['Seçenek', 'Sayı', 'Yüzde'],
        ...Object.entries(analysisResult.data).map(([key, value]: [string, any]) => [
          key,
          value.toString(),
          `${((value / currentSurvey.responses.length) * 100).toFixed(1)}%`
        ])
      ];
      
      autoTable(doc, {
        head: [catTable[0]],
        body: catTable.slice(1),
        startY: 50,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [16, 185, 129] },
      });
    }
    
    doc.save(`${currentSurvey.title}_analiz_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Excel Export Function
  const exportToExcel = () => {
    if (!currentSurvey || !currentQuestion) return;

    const data = currentSurvey.responses.map(response => ({
      'Cevap ID': response.id,
      'Kullanıcı ID': response.userId || 'N/A',
      'Segment': response.segment || 'N/A',
      'Lokasyon': response.location || 'N/A',
      'Cevap': response.responses[currentQuestion.id],
      'Tarih': new Date(response.timestamp).toLocaleDateString('tr-TR'),
    }));

    // Create CSV content
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${(row as any)[header]}"`).join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${currentSurvey.title}_veriler_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Real-time refresh function
  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (selectedSurvey && selectedQuestion) {
        analyzeData();
      }
      setIsLoading(false);
    }, 1000);
  };

  // Auto-refresh effect
  useEffect(() => {
    if (autoRefresh && isRealTime) {
      const interval = setInterval(refreshData, 30000); // 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh, isRealTime, selectedSurvey, selectedQuestion]);

  const renderChart = () => {
    if (!analysisResult?.chartData) return null;

    switch (selectedChartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={analysisResult.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={analysisResult.chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {analysisResult.chartData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={analysisResult.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const StatCard = ({ title, value, icon: Icon, color = 'primary' }: {
    title: string;
    value: string | number;
    icon: any;
    color?: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Gelişmiş Analiz Merkezi</h1>
            <p className="text-slate-600">
              Gerçek zamanlı analiz, segmentasyon ve benchmarking ile anketlerinizi derinlemesine analiz edin.
            </p>
          </div>
          
          {/* Real-time Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isRealTime ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm font-medium text-slate-600">
                {isRealTime ? 'Canlı Veri' : 'Statik Veri'}
              </span>
            </div>
            
            <button
              onClick={() => setIsRealTime(!isRealTime)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                isRealTime 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Activity className="h-4 w-4 inline mr-1" />
              {isRealTime ? 'Canlı' : 'Statik'}
            </button>
            
            {isRealTime && (
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  autoRefresh 
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <RefreshCw className={`h-4 w-4 inline mr-1 ${autoRefresh ? 'animate-spin' : ''}`} />
                Otomatik
              </button>
            )}
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Toplam Anket</p>
                <p className="text-lg font-bold text-slate-900">{mockSurveys.length}</p>
              </div>
              <BarChartIcon className="h-5 w-5 text-slate-400" />
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Toplam Cevap</p>
                <p className="text-lg font-bold text-slate-900">
                  {mockSurveys.reduce((sum, s) => sum + s.responses.length, 0)}
                </p>
              </div>
              <Users className="h-5 w-5 text-slate-400" />
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Aktif Segment</p>
                <p className="text-lg font-bold text-slate-900">{mockSegments.length}</p>
              </div>
              <Filter className="h-5 w-5 text-slate-400" />
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Son Güncelleme</p>
                <p className="text-sm font-medium text-slate-900">
                  {isRealTime ? 'Şimdi' : '2 saat önce'}
                </p>
              </div>
              <Clock className="h-5 w-5 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Survey and Question Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Anket Seçin</h3>
          
          <div className="space-y-3">
            {mockSurveys.map((survey) => (
              <motion.button
                key={survey.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setSelectedSurvey(survey.id);
                  setSelectedQuestion('');
                  setAnalysisResult(null);
                }}
                className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                  selectedSurvey === survey.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-slate-200 hover:border-primary-300'
                }`}
              >
                <h4 className="font-semibold text-slate-900">{survey.title}</h4>
                <p className="text-sm text-slate-600 mt-1">
                  {survey.responses.length} cevap • {survey.questions.length} soru
                </p>
              </motion.button>
            ))}
          </div>
        </div>

        {currentSurvey && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Soru Seçin</h3>
            
            <div className="space-y-3">
              {currentSurvey.questions.map((question) => (
                <motion.button
                  key={question.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSelectedQuestion(question.id);
                    setAnalysisResult(null);
                  }}
                  className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                    selectedQuestion === question.id
                      ? 'border-accent-500 bg-accent-50'
                      : 'border-slate-200 hover:border-accent-300'
                  }`}
                >
                  <h4 className="font-semibold text-slate-900">{question.question}</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    {question.type === 'rating' && 'Değerlendirme (1-5)'}
                    {question.type === 'multiple-choice' && 'Çoktan Seçmeli'}
                    {question.type === 'yes-no' && 'Evet/Hayır'}
                    {question.type === 'text' && 'Metin'}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Advanced Filters and Segmentation */}
      {currentSurvey && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Gelişmiş Filtreler ve Segmentasyon</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Segment Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Müşteri Segmenti
              </label>
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Tüm Segmentler</option>
                {mockSegments.map((segment) => (
                  <option key={segment.id} value={segment.id}>
                    {segment.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tarih Aralığı
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="flex-1 p-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="flex-1 p-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            
            {/* Comparison Mode */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Karşılaştırma Modu
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setComparisonMode(!comparisonMode)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    comparisonMode 
                      ? 'bg-primary-100 text-primary-700 border border-primary-300' 
                      : 'bg-slate-100 text-slate-700 border border-slate-300'
                  }`}
                >
                  <BarChartIcon className="h-4 w-4 inline mr-1" />
                  Karşılaştır
                </button>
                
                <button
                  onClick={() => setShowBenchmarks(!showBenchmarks)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    showBenchmarks 
                      ? 'bg-green-100 text-green-700 border border-green-300' 
                      : 'bg-slate-100 text-slate-700 border border-slate-300'
                  }`}
                >
                  <Target className="h-4 w-4 inline mr-1" />
                  Benchmark
                </button>
              </div>
            </div>
          </div>
          
          {/* Segment Comparison */}
          {comparisonMode && (
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-semibold text-slate-900 mb-3">Segment Karşılaştırması</h4>
              <div className="flex flex-wrap gap-2">
                {mockSegments.map((segment) => (
                  <button
                    key={segment.id}
                    onClick={() => {
                      if (selectedSegments.includes(segment.id)) {
                        setSelectedSegments(prev => prev.filter(s => s !== segment.id));
                      } else {
                        setSelectedSegments(prev => [...prev, segment.id]);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedSegments.includes(segment.id)
                        ? 'bg-primary-100 text-primary-700 border border-primary-300'
                        : 'bg-white text-slate-700 border border-slate-300 hover:border-primary-300'
                    }`}
                    style={{ 
                      backgroundColor: selectedSegments.includes(segment.id) ? segment.color + '20' : undefined,
                      borderColor: selectedSegments.includes(segment.id) ? segment.color : undefined
                    }}
                  >
                    {segment.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Analysis Controls */}
      {currentSurvey && currentQuestion && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Analiz Kontrolleri</h3>
            
            <div className="flex gap-3">
              <button
                onClick={analyzeData}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Analiz Ediliyor...
                  </>
                ) : (
                  <>
                    <Calculator size={16} />
                    Analiz Et
                  </>
                )}
              </button>
              
              <button
                onClick={refreshData}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw size={16} />
                Yenile
              </button>
              
              {analysisResult && (
                <>
                  <button
                    onClick={generatePDF}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
                  >
                    <Download size={16} />
                    PDF İndir
                  </button>
                  
                  <button
                    onClick={exportToExcel}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Database size={16} />
                    Excel İndir
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Chart Type Selection */}
          {analysisResult && (
            <div className="mb-6">
              <h4 className="text-md font-semibold text-slate-900 mb-3">Grafik Türü</h4>
              <div className="flex gap-3">
                {[
                  { id: 'bar', name: 'Bar Grafik', icon: BarChart3 },
                  { id: 'pie', name: 'Pasta Grafik', icon: PieChartIcon },
                  { id: 'line', name: 'Çizgi Grafik', icon: TrendingUp },
                ].map((chart) => {
                  const Icon = chart.icon;
                  return (
                    <button
                      key={chart.id}
                      onClick={() => setSelectedChartType(chart.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        selectedChartType === chart.id
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-slate-200 hover:border-primary-300'
                      }`}
                    >
                      <Icon size={16} />
                      {chart.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Statistics Cards */}
          {analysisResult.type === 'descriptive' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard
                title="Ortalama"
                value={analysisResult.data.mean.toFixed(2)}
                icon={BarChart3}
                color="primary"
              />
              <StatCard
                title="Medyan"
                value={analysisResult.data.median.toFixed(2)}
                icon={Target}
                color="accent"
              />
              <StatCard
                title="Mod"
                value={analysisResult.data.mode}
                icon={Zap}
                color="green"
              />
              <StatCard
                title="Std. Sapma"
                value={analysisResult.data.stdDev.toFixed(2)}
                icon={TrendingUp}
                color="blue"
              />
              <StatCard
                title="Minimum"
                value={analysisResult.data.min}
                icon={Target}
                color="purple"
              />
              <StatCard
                title="Maksimum"
                value={analysisResult.data.max}
                icon={Target}
                color="yellow"
              />
            </div>
          )}

          {/* Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Görselleştirme</h3>
            <div className="h-[400px]">
              {renderChart()}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Analiz Özeti</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-600">{currentSurvey?.responses.length}</p>
                <p className="text-sm text-slate-600">Toplam Cevap</p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-accent-600">
                  {analysisResult.type === 'descriptive' 
                    ? analysisResult.data.mean.toFixed(1)
                    : Object.keys(analysisResult.data).length
                  }
                </p>
                <p className="text-sm text-slate-600">
                  {analysisResult.type === 'descriptive' ? 'Ortalama Puan' : 'Farklı Seçenek'}
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {analysisResult.type === 'categorical' 
                    ? `${Math.max(...Object.values(analysisResult.data) as number[])}`
                    : 'N/A'
                  }
                </p>
                <p className="text-sm text-slate-600">
                  {analysisResult.type === 'categorical' ? 'En Popüler Seçenek' : 'Standart Sapma'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Benchmarking Section */}
      {showBenchmarks && analysisResult && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Sektör Benchmarking
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockBenchmarks.map((benchmark, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900">{benchmark.metric}</h4>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {benchmark.percentile}%
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Sektör Ortalaması:</span>
                    <span className="font-medium">{benchmark.average}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Sizin Skorunuz:</span>
                    <span className="font-medium text-primary-600">
                      {analysisResult.type === 'descriptive' 
                        ? analysisResult.data.mean.toFixed(1)
                        : 'N/A'
                      }
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${benchmark.percentile}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trend Analysis */}
      {analysisResult && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Trend Analizi
          </h3>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Son Dönem Değişim</h4>
              <p className="text-2xl font-bold text-blue-600">
                {mockTrendData[mockTrendData.length - 1].change > 0 ? '+' : ''}
                {mockTrendData[mockTrendData.length - 1].change}
              </p>
              <p className="text-sm text-blue-700">
                {mockTrendData[mockTrendData.length - 1].change > 0 ? 'Artış' : 'Azalış'}
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Ortalama Trend</h4>
              <p className="text-2xl font-bold text-green-600">
                {mockTrendData.reduce((sum, d) => sum + d.change, 0) / mockTrendData.length > 0 ? '+' : ''}
                {(mockTrendData.reduce((sum, d) => sum + d.change, 0) / mockTrendData.length).toFixed(2)}
              </p>
              <p className="text-sm text-green-700">Aylık Ortalama</p>
            </div>
          </div>
        </div>
      )}

      {/* API Integration Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-purple-600" />
          API Entegrasyonu
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 mb-2">Webhook URL</h4>
            <div className="flex gap-2">
              <input
                type="text"
                value="https://api.researchplatform.com/webhook/survey-data"
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
              />
              <button className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                Kopyala
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Yeni anket cevapları otomatik olarak bu URL'ye gönderilir
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 mb-2">API Key</h4>
            <div className="flex gap-2">
              <input
                type="text"
                value="sk_live_1234567890abcdef"
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
              />
              <button className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                Yenile
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              API erişimi için gerekli anahtar
            </p>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">API Dokümantasyonu</h4>
          <p className="text-sm text-blue-700 mb-3">
            Detaylı API dokümantasyonu ve örnek kodlar için:
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              <Globe className="h-4 w-4 inline mr-1" />
              API Docs
            </button>
            <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 text-sm">
              <Database className="h-4 w-4 inline mr-1" />
              Postman Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
>>>>>>> 4855e23d27390993c3739d0f6d832d04426b1d54
