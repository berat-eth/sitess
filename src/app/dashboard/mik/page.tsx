'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Settings, 
  Zap, 
  Lock, 
  AlertCircle,
  MessageSquare,
  Brain,
  Sparkles,
  Loader2
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

export default function MikPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Merhaba! Ben Mik, AI asistanınızım. Size nasıl yardımcı olabilirim?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true); // Devre dışı durumu

  const handleSendMessage = () => {
    if (!inputText.trim() || isDisabled) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // AI yanıtı simülasyonu (devre dışı olduğu için çalışmayacak)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Üzgünüm, şu anda servisimiz devre dışı. Yakında aktif olacak!',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    if (isDisabled) return;
    setIsRecording(!isRecording);
  };

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
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-900 mb-2 flex items-center gap-3">
                <Bot className="h-8 w-8 text-primary-600" />
                Mik AI Asistan
              </h1>
              <p className="text-slate-600">
                Yapay zeka destekli müşteri hizmetleri ve anket analizi
              </p>
            </div>
            
            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isDisabled ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span className={`text-sm font-medium ${isDisabled ? 'text-red-600' : 'text-green-600'}`}>
                {isDisabled ? 'Devre Dışı' : 'Aktif'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Disabled Notice */}
        {isDisabled && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-yellow-800">Servis Geçici Olarak Devre Dışı</h3>
                <p className="text-sm text-yellow-700">
                  Mik AI asistanı şu anda bakım modunda. Yakında tekrar aktif olacak.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div 
            variants={itemVariants}
            className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-soft ${isDisabled ? 'opacity-60' : ''}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Sohbet Desteği</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Müşteri sorularını yapay zeka ile yanıtlayın
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              {isDisabled ? <Lock className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
              {isDisabled ? 'Devre Dışı' : 'Aktif'}
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-soft ${isDisabled ? 'opacity-60' : ''}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Brain className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Anket Analizi</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Anket sonuçlarını otomatik analiz edin
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              {isDisabled ? <Lock className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
              {isDisabled ? 'Devre Dışı' : 'Aktif'}
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-soft ${isDisabled ? 'opacity-60' : ''}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Akıllı Öneriler</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              İşinizi geliştirmek için AI önerileri alın
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              {isDisabled ? <Lock className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
              {isDisabled ? 'Devre Dışı' : 'Aktif'}
            </div>
          </motion.div>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Mik AI Asistan</h3>
                <p className="text-primary-100 text-sm">
                  {isDisabled ? 'Şu anda devre dışı' : 'Size yardımcı olmaya hazır'}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.isUser 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-slate-100 text-slate-900'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isUser ? 'text-primary-100' : 'text-slate-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('tr-TR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleRecording}
                disabled={isDisabled}
                className={`p-2 rounded-lg transition-colors ${
                  isDisabled 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : isRecording 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isDisabled ? "Servis şu anda devre dışı..." : "Mesajınızı yazın..."}
                  disabled={isDisabled}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    isDisabled 
                      ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' 
                      : 'bg-white border-slate-300'
                  }`}
                />
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={isDisabled || !inputText.trim()}
                className={`p-2 rounded-lg transition-colors ${
                  isDisabled || !inputText.trim()
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            
            {isDisabled && (
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <Lock className="h-3 w-3" />
                <span>Servis geçici olarak devre dışı</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Coming Soon Notice */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-100"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-primary-900 mb-2">Yakında Aktif!</h3>
            <p className="text-slate-600 mb-4">
              Mik AI asistanı şu anda geliştirme aşamasında. Yakında müşteri hizmetlerinizi 
              otomatikleştirmek ve anket analizlerinizi güçlendirmek için hazır olacak.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Geliştirme devam ediyor</span>
              </div>
              <div className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                <span>Beta testleri yakında</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
