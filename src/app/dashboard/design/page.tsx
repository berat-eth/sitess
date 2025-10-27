'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Upload, 
  Download, 
  Eye, 
  Save, 
  RotateCcw, 
  Settings, 
  X, 
  Check, 
  Moon, 
  Sun, 
  Type, 
  Image, 
  Zap, 
  Globe, 
  Accessibility,
  Contrast,
  Volume2,
  MousePointer,
  Keyboard,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  borderRadius: string;
  spacing: string;
  shadows: string;
}

interface BrandKit {
  logo: string;
  logoDark: string;
  favicon: string;
  colors: string[];
  fonts: string[];
  guidelines: string;
}

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  colorBlindSupport: boolean;
}

export default function DesignPage() {
  const [activeTab, setActiveTab] = useState<'theme' | 'brand' | 'fonts' | 'accessibility' | 'preview'>('theme');
  const [currentTheme, setCurrentTheme] = useState<Theme>({
    id: 'default',
    name: 'Varsayılan Tema',
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
      accent: '#F59E0B',
      background: '#FFFFFF',
      surface: '#F8FAFC',
      text: '#1E293B',
      textSecondary: '#64748B',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
      mono: 'JetBrains Mono',
    },
    borderRadius: '0.5rem',
    spacing: '1rem',
    shadows: 'soft',
  });

  const [brandKit, setBrandKit] = useState<BrandKit>({
    logo: '',
    logoDark: '',
    favicon: '',
    colors: ['#3B82F6', '#10B981', '#F59E0B'],
    fonts: ['Inter', 'Roboto', 'Open Sans'],
    guidelines: '',
  });

  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    colorBlindSupport: false,
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);

  // Mock themes
  const predefinedThemes: Theme[] = [
    {
      id: 'corporate',
      name: 'Kurumsal',
      colors: {
        primary: '#1E40AF',
        secondary: '#059669',
        accent: '#DC2626',
        background: '#FFFFFF',
        surface: '#F1F5F9',
        text: '#0F172A',
        textSecondary: '#475569',
      },
      fonts: {
        heading: 'Roboto',
        body: 'Roboto',
        mono: 'Fira Code',
      },
      borderRadius: '0.375rem',
      spacing: '0.75rem',
      shadows: 'medium',
    },
    {
      id: 'creative',
      name: 'Yaratıcı',
      colors: {
        primary: '#8B5CF6',
        secondary: '#EC4899',
        accent: '#F59E0B',
        background: '#FEFEFE',
        surface: '#FDF4FF',
        text: '#581C87',
        textSecondary: '#A21CAF',
      },
      fonts: {
        heading: 'Poppins',
        body: 'Poppins',
        mono: 'Source Code Pro',
      },
      borderRadius: '1rem',
      spacing: '1.25rem',
      shadows: 'large',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      colors: {
        primary: '#000000',
        secondary: '#6B7280',
        accent: '#EF4444',
        background: '#FFFFFF',
        surface: '#FFFFFF',
        text: '#000000',
        textSecondary: '#6B7280',
      },
      fonts: {
        heading: 'Helvetica',
        body: 'Helvetica',
        mono: 'Monaco',
      },
      borderRadius: '0rem',
      spacing: '1rem',
      shadows: 'none',
    },
  ];

  const fontOptions = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins',
    'Source Sans Pro', 'Nunito', 'Raleway', 'Ubuntu', 'Playfair Display',
    'Merriweather', 'Crimson Text', 'Lora', 'PT Serif'
  ];

  const updateThemeColor = useCallback((colorKey: keyof Theme['colors'], value: string) => {
    setCurrentTheme(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value,
      },
    }));
  }, []);

  const updateThemeFont = useCallback((fontKey: keyof Theme['fonts'], value: string) => {
    setCurrentTheme(prev => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        [fontKey]: value,
      },
    }));
  }, []);

  const applyTheme = useCallback(() => {
    // Apply theme to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary-color', currentTheme.colors.primary);
    root.style.setProperty('--secondary-color', currentTheme.colors.secondary);
    root.style.setProperty('--accent-color', currentTheme.colors.accent);
    root.style.setProperty('--background-color', currentTheme.colors.background);
    root.style.setProperty('--surface-color', currentTheme.colors.surface);
    root.style.setProperty('--text-color', currentTheme.colors.text);
    root.style.setProperty('--text-secondary-color', currentTheme.colors.textSecondary);
    root.style.setProperty('--border-radius', currentTheme.borderRadius);
    root.style.setProperty('--spacing', currentTheme.spacing);
  }, [currentTheme]);

  const exportTheme = useCallback(() => {
    const themeData = {
      theme: currentTheme,
      brandKit,
      accessibilitySettings,
    };
    
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentTheme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [currentTheme, brandKit, accessibilitySettings]);

  const importTheme = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (data.theme) setCurrentTheme(data.theme);
          if (data.brandKit) setBrandKit(data.brandKit);
          if (data.accessibilitySettings) setAccessibilitySettings(data.accessibilitySettings);
        } catch (error) {
          console.error('Error importing theme:', error);
        }
      };
      reader.readAsText(file);
    }
  }, []);

  const tabs = [
    { id: 'theme', label: 'Tema Editörü', icon: Palette },
    { id: 'brand', label: 'Marka Kit', icon: Image },
    { id: 'fonts', label: 'Fontlar', icon: Type },
    { id: 'accessibility', label: 'Erişilebilirlik', icon: Accessibility },
    { id: 'preview', label: 'Önizleme', icon: Eye },
  ];

  return (
    <div className="flex-1 overflow-auto bg-slate-50 min-h-screen">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-900 mb-2">Tasarım ve Özelleştirme</h1>
              <p className="text-slate-600">Platformunuzun görünümünü ve hissini özelleştirin</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800 text-white hover:bg-slate-700' 
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300'
                }`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                {isDarkMode ? 'Açık Tema' : 'Koyu Tema'}
              </button>
              <button
                onClick={applyTheme}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Zap size={20} />
                Uygula
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-6">
          <div className="flex border-b border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Theme Editor Tab */}
            {activeTab === 'theme' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Tema Editörü</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowTemplateGallery(true)}
                      className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                    >
                      <Settings size={16} />
                      Şablonlar
                    </button>
                    <input
                      type="file"
                      accept=".json"
                      onChange={importTheme}
                      className="hidden"
                      id="import-theme"
                    />
                    <label
                      htmlFor="import-theme"
                      className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm cursor-pointer"
                    >
                      <Upload size={16} />
                      İçe Aktar
                    </label>
                    <button
                      onClick={exportTheme}
                      className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                    >
                      <Download size={16} />
                      Dışa Aktar
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Color Palette */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Renk Paleti</h4>
                    <div className="space-y-3">
                      {Object.entries(currentTheme.colors).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg border border-slate-300"
                            style={{ backgroundColor: value }}
                          />
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-slate-700 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </label>
                            <input
                              type="color"
                              value={value}
                              onChange={(e) => updateThemeColor(key as keyof Theme['colors'], e.target.value)}
                              className="w-full h-8 border border-slate-300 rounded"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Theme Settings */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Tema Ayarları</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Border Radius
                        </label>
                        <select
                          value={currentTheme.borderRadius}
                          onChange={(e) => setCurrentTheme(prev => ({ ...prev, borderRadius: e.target.value }))}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="0rem">Köşeli</option>
                          <option value="0.25rem">Küçük</option>
                          <option value="0.5rem">Orta</option>
                          <option value="0.75rem">Büyük</option>
                          <option value="1rem">Çok Büyük</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Spacing
                        </label>
                        <select
                          value={currentTheme.spacing}
                          onChange={(e) => setCurrentTheme(prev => ({ ...prev, spacing: e.target.value }))}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="0.5rem">Sıkışık</option>
                          <option value="0.75rem">Küçük</option>
                          <option value="1rem">Orta</option>
                          <option value="1.25rem">Büyük</option>
                          <option value="1.5rem">Geniş</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Gölgeler
                        </label>
                        <select
                          value={currentTheme.shadows}
                          onChange={(e) => setCurrentTheme(prev => ({ ...prev, shadows: e.target.value }))}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="none">Yok</option>
                          <option value="soft">Yumuşak</option>
                          <option value="medium">Orta</option>
                          <option value="large">Büyük</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Brand Kit Tab */}
            {activeTab === 'brand' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Marka Kit</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Logo Upload */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Logo Yükleme</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Ana Logo
                        </label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm text-slate-600">Logo dosyasını sürükleyip bırakın</p>
                          <p className="text-xs text-slate-500">PNG, SVG formatları desteklenir</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Koyu Tema Logo
                        </label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm text-slate-600">Koyu tema için logo</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Favicon
                        </label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm text-slate-600">16x16 veya 32x32 px</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Brand Colors */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Marka Renkleri</h4>
                    <div className="space-y-3">
                      {brandKit.colors.map((color, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg border border-slate-300"
                            style={{ backgroundColor: color }}
                          />
                          <input
                            type="color"
                            value={color}
                            onChange={(e) => {
                              const newColors = [...brandKit.colors];
                              newColors[index] = e.target.value;
                              setBrandKit(prev => ({ ...prev, colors: newColors }));
                            }}
                            className="w-full h-8 border border-slate-300 rounded"
                          />
                          <button
                            onClick={() => {
                              const newColors = brandKit.colors.filter((_, i) => i !== index);
                              setBrandKit(prev => ({ ...prev, colors: newColors }));
                            }}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setBrandKit(prev => ({ 
                            ...prev, 
                            colors: [...prev.colors, '#000000'] 
                          }));
                        }}
                        className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-slate-400 transition-colors"
                      >
                        + Renk Ekle
                      </button>
                    </div>
                  </div>
                </div>

                {/* Brand Guidelines */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Marka Rehberi</h4>
                  <textarea
                    value={brandKit.guidelines}
                    onChange={(e) => setBrandKit(prev => ({ ...prev, guidelines: e.target.value }))}
                    placeholder="Marka rehberinizi buraya yazın..."
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            )}

            {/* Fonts Tab */}
            {activeTab === 'fonts' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Font Seçenekleri</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {Object.entries(currentTheme.fonts).map(([key, value]) => (
                    <div key={key} className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()} Font
                      </label>
                      <select
                        value={value}
                        onChange={(e) => updateThemeFont(key as keyof Theme['fonts'], e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        {fontOptions.map((font) => (
                          <option key={font} value={font} style={{ fontFamily: font }}>
                            {font}
                          </option>
                        ))}
                      </select>
                      <div 
                        className="p-4 border border-slate-200 rounded-lg"
                        style={{ fontFamily: value }}
                      >
                        <p className="text-lg font-semibold">Aa Bb Cc</p>
                        <p className="text-sm text-slate-600">The quick brown fox jumps over the lazy dog</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Font Yükleme</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Özel fontlarınızı yükleyerek platformunuzda kullanabilirsiniz.
                  </p>
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-sm text-blue-600">Font dosyalarını sürükleyip bırakın</p>
                    <p className="text-xs text-blue-500">WOFF, WOFF2, TTF formatları desteklenir</p>
                  </div>
                </div>
              </div>
            )}

            {/* Accessibility Tab */}
            {activeTab === 'accessibility' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Erişilebilirlik Özellikleri</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Görsel Erişilebilirlik</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Contrast className="h-5 w-5 text-slate-600" />
                          <div>
                            <p className="font-medium text-slate-900">Yüksek Kontrast</p>
                            <p className="text-sm text-slate-600">Renk kontrastını artırır</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={accessibilitySettings.highContrast}
                          onChange={(e) => setAccessibilitySettings(prev => ({ ...prev, highContrast: e.target.checked }))}
                          className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Type className="h-5 w-5 text-slate-600" />
                          <div>
                            <p className="font-medium text-slate-900">Büyük Metin</p>
                            <p className="text-sm text-slate-600">Metin boyutunu artırır</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={accessibilitySettings.largeText}
                          onChange={(e) => setAccessibilitySettings(prev => ({ ...prev, largeText: e.target.checked }))}
                          className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Globe className="h-5 w-5 text-slate-600" />
                          <div>
                            <p className="font-medium text-slate-900">Renk Körlüğü Desteği</p>
                            <p className="text-sm text-slate-600">Renk körlüğü için alternatifler</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={accessibilitySettings.colorBlindSupport}
                          onChange={(e) => setAccessibilitySettings(prev => ({ ...prev, colorBlindSupport: e.target.checked }))}
                          className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900">Etkileşim Erişilebilirliği</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <MousePointer className="h-5 w-5 text-slate-600" />
                          <div>
                            <p className="font-medium text-slate-900">Azaltılmış Hareket</p>
                            <p className="text-sm text-slate-600">Animasyonları azaltır</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={accessibilitySettings.reducedMotion}
                          onChange={(e) => setAccessibilitySettings(prev => ({ ...prev, reducedMotion: e.target.checked }))}
                          className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Keyboard className="h-5 w-5 text-slate-600" />
                          <div>
                            <p className="font-medium text-slate-900">Klavye Navigasyonu</p>
                            <p className="text-sm text-slate-600">Klavye ile gezinme</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={accessibilitySettings.keyboardNavigation}
                          onChange={(e) => setAccessibilitySettings(prev => ({ ...prev, keyboardNavigation: e.target.checked }))}
                          className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Volume2 className="h-5 w-5 text-slate-600" />
                          <div>
                            <p className="font-medium text-slate-900">Ekran Okuyucu</p>
                            <p className="text-sm text-slate-600">ARIA etiketleri</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={accessibilitySettings.screenReader}
                          onChange={(e) => setAccessibilitySettings(prev => ({ ...prev, screenReader: e.target.checked }))}
                          className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preview Tab */}
            {activeTab === 'preview' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Canlı Önizleme</h3>
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
                      onClick={() => setPreviewMode('tablet')}
                      className={`px-3 py-1 rounded-md text-sm transition-colors ${
                        previewMode === 'tablet' 
                          ? 'bg-white text-slate-900 shadow-sm' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Tablet className="h-4 w-4 inline mr-1" />
                      Tablet
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
                </div>

                <div className={`mx-auto ${previewMode === 'mobile' ? 'max-w-sm' : previewMode === 'tablet' ? 'max-w-2xl' : 'max-w-4xl'}`}>
                  <div 
                    className="bg-white border border-slate-200 rounded-lg p-6 shadow-lg"
                    style={{
                      backgroundColor: currentTheme.colors.background,
                      color: currentTheme.colors.text,
                      borderRadius: currentTheme.borderRadius,
                    }}
                  >
                    <div className="space-y-6">
                      {/* Header Preview */}
                      <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: currentTheme.colors.surface }}>
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-lg"
                            style={{ backgroundColor: currentTheme.colors.primary }}
                          />
                          <h2 className="text-xl font-bold" style={{ fontFamily: currentTheme.fonts.heading }}>
                            Platform Adı
                          </h2>
                        </div>
                        <button 
                          className="px-4 py-2 rounded-lg text-white"
                          style={{ backgroundColor: currentTheme.colors.primary }}
                        >
                          Giriş Yap
                        </button>
                      </div>

                      {/* Content Preview */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold" style={{ fontFamily: currentTheme.fonts.heading }}>
                          Ana Başlık
                        </h3>
                        <p style={{ color: currentTheme.colors.textSecondary, fontFamily: currentTheme.fonts.body }}>
                          Bu bir önizleme metnidir. Tema değişikliklerinizi burada görebilirsiniz.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 rounded-lg" style={{ backgroundColor: currentTheme.colors.surface }}>
                            <h4 className="font-semibold mb-2" style={{ fontFamily: currentTheme.fonts.heading }}>
                              Kart 1
                            </h4>
                            <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                              Kart içeriği
                            </p>
                          </div>
                          <div className="p-4 rounded-lg" style={{ backgroundColor: currentTheme.colors.surface }}>
                            <h4 className="font-semibold mb-2" style={{ fontFamily: currentTheme.fonts.heading }}>
                              Kart 2
                            </h4>
                            <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                              Kart içeriği
                            </p>
                          </div>
                          <div className="p-4 rounded-lg" style={{ backgroundColor: currentTheme.colors.surface }}>
                            <h4 className="font-semibold mb-2" style={{ fontFamily: currentTheme.fonts.heading }}>
                              Kart 3
                            </h4>
                            <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                              Kart içeriği
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Template Gallery Modal */}
        {showTemplateGallery && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Tema Şablonları</h3>
                <button
                  onClick={() => setShowTemplateGallery(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {predefinedThemes.map((theme) => (
                  <motion.div
                    key={theme.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setCurrentTheme(theme)}
                    className="p-4 border border-slate-200 rounded-xl hover:border-primary-300 cursor-pointer transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <div
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />
                        <div
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: theme.colors.accent }}
                        />
                      </div>
                      <h4 className="font-semibold text-slate-900">{theme.name}</h4>
                      <p className="text-sm text-slate-600">
                        {theme.fonts.heading} • {theme.borderRadius} • {theme.shadows}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
