<<<<<<< HEAD
'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  TrendingUp, 
  Map, 
  Calendar, 
  Layers, 
  Zap, 
  Download, 
  Settings, 
  Eye, 
  Play, 
  Pause, 
  RotateCcw,
  Filter,
  Maximize,
  Minimize,
  ChevronDown,
  ChevronRight,
  Target,
  Activity,
  Globe,
  Clock,
  Users,
  Database,
  X
} from 'lucide-react';

interface ChartData {
  id: string;
  name: string;
  type: 'heatmap' | 'sankey' | 'radar' | 'gantt' | '3d' | 'map' | 'timeline' | 'custom';
  data: any;
  config: any;
  createdAt: string;
  updatedAt: string;
}

interface HeatMapData {
  x: string[];
  y: string[];
  values: number[][];
  colors: string[];
}

interface SankeyData {
  nodes: Array<{ id: string; name: string; color?: string }>;
  links: Array<{ source: string; target: string; value: number; color?: string }>;
}

interface RadarData {
  categories: string[];
  datasets: Array<{
    label: string;
    data: number[];
    color: string;
  }>;
}

interface GanttData {
  tasks: Array<{
    id: string;
    name: string;
    start: string;
    end: string;
    progress: number;
    dependencies?: string[];
    color?: string;
  }>;
}

export default function AdvancedChartsPage() {
  const [activeChart, setActiveChart] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [chartConfig, setChartConfig] = useState<any>(null);

  // Mock data for different chart types
  const heatMapData: HeatMapData = {
    x: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
    y: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    values: [
      [10, 5, 8, 15, 20, 25, 30],
      [5, 8, 12, 18, 22, 28, 35],
      [8, 12, 15, 20, 25, 30, 40],
      [12, 15, 18, 25, 30, 35, 45],
      [15, 18, 22, 28, 35, 40, 50],
      [18, 22, 25, 30, 40, 45, 55]
    ],
    colors: ['#f0f9ff', '#0ea5e9', '#0284c7', '#0369a1', '#075985']
  };

  const sankeyData: SankeyData = {
    nodes: [
      { id: 'source1', name: 'Web Sitesi', color: '#3B82F6' },
      { id: 'source2', name: 'Mobil Uygulama', color: '#10B981' },
      { id: 'source3', name: 'Sosyal Medya', color: '#F59E0B' },
      { id: 'target1', name: 'Ürün Sayfası', color: '#8B5CF6' },
      { id: 'target2', name: 'Sepet', color: '#EF4444' },
      { id: 'target3', name: 'Ödeme', color: '#06B6D4' },
      { id: 'final', name: 'Satış', color: '#84CC16' }
    ],
    links: [
      { source: 'source1', target: 'target1', value: 1000 },
      { source: 'source2', target: 'target1', value: 800 },
      { source: 'source3', target: 'target1', value: 600 },
      { source: 'target1', target: 'target2', value: 1800 },
      { source: 'target2', target: 'target3', value: 1200 },
      { source: 'target3', target: 'final', value: 1000 }
    ]
  };

  const radarData: RadarData = {
    categories: ['Kalite', 'Hız', 'Güvenlik', 'Kullanım Kolaylığı', 'Destek', 'Fiyat'],
    datasets: [
      {
        label: 'Ürün A',
        data: [85, 90, 75, 80, 70, 65],
        color: '#3B82F6'
      },
      {
        label: 'Ürün B',
        data: [70, 75, 85, 90, 80, 75],
        color: '#10B981'
      },
      {
        label: 'Ürün C',
        data: [60, 65, 70, 75, 85, 90],
        color: '#F59E0B'
      }
    ]
  };

  const ganttData: GanttData = {
    tasks: [
      {
        id: 'task1',
        name: 'Proje Planlama',
        start: '2024-01-01',
        end: '2024-01-15',
        progress: 100,
        color: '#3B82F6'
      },
      {
        id: 'task2',
        name: 'Tasarım',
        start: '2024-01-10',
        end: '2024-02-01',
        progress: 80,
        dependencies: ['task1'],
        color: '#10B981'
      },
      {
        id: 'task3',
        name: 'Geliştirme',
        start: '2024-01-25',
        end: '2024-03-15',
        progress: 60,
        dependencies: ['task2'],
        color: '#F59E0B'
      },
      {
        id: 'task4',
        name: 'Test',
        start: '2024-03-01',
        end: '2024-03-30',
        progress: 30,
        dependencies: ['task3'],
        color: '#8B5CF6'
      },
      {
        id: 'task5',
        name: 'Yayınlama',
        start: '2024-03-25',
        end: '2024-04-05',
        progress: 0,
        dependencies: ['task4'],
        color: '#EF4444'
      }
    ]
  };

  const chartTypes = [
    {
      id: 'heatmap',
      name: 'Isı Haritası',
      description: 'Veri yoğunluğunu renklerle gösterir',
      icon: BarChart3,
      color: 'red',
      data: heatMapData
    },
    {
      id: 'sankey',
      name: 'Sankey Diyagramı',
      description: 'Veri akışını gösterir',
      icon: TrendingUp,
      color: 'blue',
      data: sankeyData
    },
    {
      id: 'radar',
      name: 'Radar Grafiği',
      description: 'Çoklu boyutlu karşılaştırma',
      icon: Target,
      color: 'green',
      data: radarData
    },
    {
      id: 'gantt',
      name: 'Gantt Grafiği',
      description: 'Proje zaman çizelgesi',
      icon: Calendar,
      color: 'purple',
      data: ganttData
    },
    {
      id: '3d',
      name: '3D Grafikler',
      description: 'Üç boyutlu veri görselleştirme',
      icon: Layers,
      color: 'orange',
      data: null
    },
    {
      id: 'map',
      name: 'Etkileşimli Harita',
      description: 'Coğrafi veri analizi',
      icon: Map,
      color: 'teal',
      data: null
    },
    {
      id: 'timeline',
      name: 'Zaman Çizelgesi',
      description: 'Olayların zaman içindeki sırası',
      icon: Clock,
      color: 'pink',
      data: null
    },
    {
      id: 'custom',
      name: 'Özel Görselleştirme',
      description: 'Kendi tasarımınızı oluşturun',
      icon: Zap,
      color: 'indigo',
      data: null
    }
  ];

  const renderHeatMap = useCallback(() => {
    const maxValue = Math.max(...heatMapData.values.flat());
    const minValue = Math.min(...heatMapData.values.flat());

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Isı Haritası</h3>
          <div className="flex items-center gap-2">
            <div className="text-sm text-slate-600">Yoğunluk:</div>
            <div className="flex gap-1">
              {heatMapData.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-max">
            {/* Header */}
            <div className="flex">
              <div className="w-20 h-8"></div>
              {heatMapData.x.map((day) => (
                <div key={day} className="w-16 h-8 flex items-center justify-center text-xs font-medium text-slate-600">
                  {day}
                </div>
              ))}
            </div>

            {/* Rows */}
            {heatMapData.y.map((time, yIndex) => (
              <div key={time} className="flex">
                <div className="w-20 h-12 flex items-center justify-end pr-2 text-xs font-medium text-slate-600">
                  {time}
                </div>
                {heatMapData.x.map((_, xIndex) => {
                  const value = heatMapData.values[yIndex][xIndex];
                  const intensity = (value - minValue) / (maxValue - minValue);
                  const colorIndex = Math.floor(intensity * (heatMapData.colors.length - 1));
                  const color = heatMapData.colors[colorIndex];

                  return (
                    <div
                      key={`${yIndex}-${xIndex}`}
                      className="w-16 h-12 flex items-center justify-center text-xs font-medium text-white cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: color }}
                      title={`${time} - ${heatMapData.x[xIndex]}: ${value}`}
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }, [heatMapData.colors, heatMapData.values, heatMapData.x, heatMapData.y]);

  const renderSankeyDiagram = useCallback(() => {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Sankey Diyagramı</h3>
        
        <div className="relative h-96 bg-slate-50 rounded-lg p-4">
          {/* Simplified Sankey visualization */}
          <div className="flex items-center justify-between h-full">
            {/* Source nodes */}
            <div className="space-y-4">
              {sankeyData.nodes.slice(0, 3).map((node) => (
                <div
                  key={node.id}
                  className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                  style={{ backgroundColor: node.color }}
                >
                  {node.name}
                </div>
              ))}
            </div>

            {/* Flow lines */}
            <div className="flex-1 mx-8">
              <div className="space-y-8">
                {sankeyData.links.slice(0, 3).map((link, index) => {
                  const sourceNode = sankeyData.nodes.find(n => n.id === link.source);
                  const targetNode = sankeyData.nodes.find(n => n.id === link.target);
                  
                  return (
                    <div key={index} className="relative">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-slate-700">{sourceNode?.name}</div>
                        <div className="text-sm font-medium text-slate-700">{targetNode?.name}</div>
                      </div>
                      <div className="mt-2 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60"></div>
                      <div className="text-xs text-slate-500 text-center mt-1">{link.value} kullanıcı</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Target nodes */}
            <div className="space-y-4">
              {sankeyData.nodes.slice(3, 6).map((node) => (
                <div
                  key={node.id}
                  className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                  style={{ backgroundColor: node.color }}
                >
                  {node.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }, [sankeyData.links, sankeyData.nodes]);

  const renderRadarChart = useCallback(() => {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Radar Grafiği</h3>
        
        <div className="flex items-center justify-center">
          <div className="relative w-80 h-80">
            {/* Radar chart visualization */}
            <svg width="320" height="320" className="absolute inset-0">
              {/* Grid circles */}
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, index) => (
                <circle
                  key={index}
                  cx="160"
                  cy="160"
                  r={160 * scale}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />
              ))}

              {/* Category lines */}
              {radarData.categories.map((_, index) => {
                const angle = (index * 2 * Math.PI) / radarData.categories.length - Math.PI / 2;
                const x = 160 + 160 * Math.cos(angle);
                const y = 160 + 160 * Math.sin(angle);
                
                return (
                  <line
                    key={index}
                    x1="160"
                    y1="160"
                    x2={x}
                    y2={y}
                    stroke="#E2E8F0"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Data polygons */}
              {radarData.datasets.map((dataset, datasetIndex) => {
                const points = dataset.data.map((value, index) => {
                  const angle = (index * 2 * Math.PI) / radarData.categories.length - Math.PI / 2;
                  const normalizedValue = value / 100;
                  const x = 160 + 160 * normalizedValue * Math.cos(angle);
                  const y = 160 + 160 * normalizedValue * Math.sin(angle);
                  return `${x},${y}`;
                }).join(' ');

                return (
                  <polygon
                    key={datasetIndex}
                    points={points}
                    fill={dataset.color}
                    fillOpacity="0.2"
                    stroke={dataset.color}
                    strokeWidth="2"
                  />
                );
              })}

              {/* Category labels */}
              {radarData.categories.map((category, index) => {
                const angle = (index * 2 * Math.PI) / radarData.categories.length - Math.PI / 2;
                const x = 160 + 180 * Math.cos(angle);
                const y = 160 + 180 * Math.sin(angle);
                
                return (
                  <text
                    key={index}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-medium fill-slate-600"
                  >
                    {category}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6">
          {radarData.datasets.map((dataset, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: dataset.color }}
              />
              <span className="text-sm text-slate-600">{dataset.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }, [radarData.categories, radarData.datasets]);

  const renderGanttChart = useCallback(() => {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-04-05');
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysPerPixel = 300 / totalDays;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Gantt Grafiği</h3>
        
        <div className="space-y-2">
          {ganttData.tasks.map((task) => {
            const taskStart = new Date(task.start);
            const taskEnd = new Date(task.end);
            const taskStartDays = Math.ceil((taskStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            const taskDurationDays = Math.ceil((taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24));
            
            const left = taskStartDays * daysPerPixel;
            const width = taskDurationDays * daysPerPixel;

            return (
              <div key={task.id} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-slate-700 truncate">
                  {task.name}
                </div>
                <div className="flex-1 relative h-8 bg-slate-100 rounded">
                  <div
                    className="absolute h-full rounded flex items-center px-2 text-xs font-medium text-white"
                    style={{
                      left: `${left}px`,
                      width: `${width}px`,
                      backgroundColor: task.color,
                    }}
                  >
                    {task.progress}%
                  </div>
                  <div
                    className="absolute h-full rounded"
                    style={{
                      left: `${left}px`,
                      width: `${width * (task.progress / 100)}px`,
                      backgroundColor: task.color,
                      opacity: 0.3,
                    }}
                  />
                </div>
                <div className="w-20 text-xs text-slate-500">
                  {task.start} - {task.end}
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="mt-4 flex justify-between text-xs text-slate-500">
          <span>Ocak 2024</span>
          <span>Şubat 2024</span>
          <span>Mart 2024</span>
          <span>Nisan 2024</span>
        </div>
      </div>
    );
  }, [ganttData.tasks]);

  const renderChart = useCallback((chartType: string) => {
    switch (chartType) {
      case 'heatmap':
        return renderHeatMap();
      case 'sankey':
        return renderSankeyDiagram();
      case 'radar':
        return renderRadarChart();
      case 'gantt':
        return renderGanttChart();
      case '3d':
        return (
          <div className="text-center py-12">
            <Layers className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">3D Grafikler</h3>
            <p className="text-slate-600">Üç boyutlu görselleştirme özelliği yakında gelecek</p>
          </div>
        );
      case 'map':
        return (
          <div className="text-center py-12">
            <Map className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Etkileşimli Harita</h3>
            <p className="text-slate-600">Coğrafi veri analizi özelliği yakında gelecek</p>
          </div>
        );
      case 'timeline':
        return (
          <div className="text-center py-12">
            <Clock className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Zaman Çizelgesi</h3>
            <p className="text-slate-600">Olay zaman çizelgesi özelliği yakında gelecek</p>
          </div>
        );
      case 'custom':
        return (
          <div className="text-center py-12">
            <Zap className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Özel Görselleştirme</h3>
            <p className="text-slate-600">Kendi tasarımınızı oluşturun</p>
            <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Başla
            </button>
          </div>
        );
      default:
        return null;
    }
  }, [renderHeatMap, renderSankeyDiagram, renderRadarChart, renderGanttChart]);

  return (
    <div className="flex-1 overflow-auto bg-slate-50 min-h-screen">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-900 mb-2">Gelişmiş Grafikler</h1>
              <p className="text-slate-600">Profesyonel veri görselleştirme araçları</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isPlaying 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                {isPlaying ? 'Durdur' : 'Oynat'}
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                <Settings size={20} />
                Ayarlar
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chart Types Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Grafik Türleri</h3>
              <div className="space-y-2">
                {chartTypes.map((chart) => (
                  <button
                    key={chart.id}
                    onClick={() => setActiveChart(chart.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                      activeChart === chart.id
                        ? 'bg-primary-100 text-primary-700 border border-primary-300'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <chart.icon className={`h-5 w-5 text-${chart.color}-600`} />
                    <div>
                      <p className="font-medium text-sm">{chart.name}</p>
                      <p className="text-xs text-slate-500">{chart.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Display Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              {activeChart ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold text-slate-900">
                        {chartTypes.find(c => c.id === activeChart)?.name}
                      </h2>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                          <Download size={16} />
                        </button>
                        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                          <Maximize size={16} />
                        </button>
                        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                          <RotateCcw size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm">
                        <Filter size={14} className="inline mr-1" />
                        Filtrele
                      </button>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-4">
                    {renderChart(activeChart)}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Grafik Seçin</h3>
                  <p className="text-slate-600">Sol panelden bir grafik türü seçerek başlayın</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Grafik Ayarları</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Animasyon Hızı
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="slow">Yavaş</option>
                    <option value="medium">Orta</option>
                    <option value="fast">Hızlı</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Renk Paleti
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="default">Varsayılan</option>
                    <option value="corporate">Kurumsal</option>
                    <option value="creative">Yaratıcı</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">Otomatik Yenileme</p>
                    <p className="text-sm text-slate-600">Verileri otomatik güncelle</p>
                  </div>
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">Etkileşimli Mod</p>
                    <p className="text-sm text-slate-600">Grafiklerde etkileşim</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Kaydet
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
=======
'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  TrendingUp, 
  Map, 
  Calendar, 
  Layers, 
  Zap, 
  Download, 
  Settings, 
  Eye, 
  Play, 
  Pause, 
  RotateCcw,
  Filter,
  Maximize,
  Minimize,
  ChevronDown,
  ChevronRight,
  Target,
  Activity,
  Globe,
  Clock,
  Users,
  Database,
  X
} from 'lucide-react';

interface ChartData {
  id: string;
  name: string;
  type: 'heatmap' | 'sankey' | 'radar' | 'gantt' | '3d' | 'map' | 'timeline' | 'custom';
  data: any;
  config: any;
  createdAt: string;
  updatedAt: string;
}

interface HeatMapData {
  x: string[];
  y: string[];
  values: number[][];
  colors: string[];
}

interface SankeyData {
  nodes: Array<{ id: string; name: string; color?: string }>;
  links: Array<{ source: string; target: string; value: number; color?: string }>;
}

interface RadarData {
  categories: string[];
  datasets: Array<{
    label: string;
    data: number[];
    color: string;
  }>;
}

interface GanttData {
  tasks: Array<{
    id: string;
    name: string;
    start: string;
    end: string;
    progress: number;
    dependencies?: string[];
    color?: string;
  }>;
}

export default function AdvancedChartsPage() {
  const [activeChart, setActiveChart] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [chartConfig, setChartConfig] = useState<any>(null);

  // Mock data for different chart types
  const heatMapData: HeatMapData = {
    x: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
    y: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    values: [
      [10, 5, 8, 15, 20, 25, 30],
      [5, 8, 12, 18, 22, 28, 35],
      [8, 12, 15, 20, 25, 30, 40],
      [12, 15, 18, 25, 30, 35, 45],
      [15, 18, 22, 28, 35, 40, 50],
      [18, 22, 25, 30, 40, 45, 55]
    ],
    colors: ['#f0f9ff', '#0ea5e9', '#0284c7', '#0369a1', '#075985']
  };

  const sankeyData: SankeyData = {
    nodes: [
      { id: 'source1', name: 'Web Sitesi', color: '#3B82F6' },
      { id: 'source2', name: 'Mobil Uygulama', color: '#10B981' },
      { id: 'source3', name: 'Sosyal Medya', color: '#F59E0B' },
      { id: 'target1', name: 'Ürün Sayfası', color: '#8B5CF6' },
      { id: 'target2', name: 'Sepet', color: '#EF4444' },
      { id: 'target3', name: 'Ödeme', color: '#06B6D4' },
      { id: 'final', name: 'Satış', color: '#84CC16' }
    ],
    links: [
      { source: 'source1', target: 'target1', value: 1000 },
      { source: 'source2', target: 'target1', value: 800 },
      { source: 'source3', target: 'target1', value: 600 },
      { source: 'target1', target: 'target2', value: 1800 },
      { source: 'target2', target: 'target3', value: 1200 },
      { source: 'target3', target: 'final', value: 1000 }
    ]
  };

  const radarData: RadarData = {
    categories: ['Kalite', 'Hız', 'Güvenlik', 'Kullanım Kolaylığı', 'Destek', 'Fiyat'],
    datasets: [
      {
        label: 'Ürün A',
        data: [85, 90, 75, 80, 70, 65],
        color: '#3B82F6'
      },
      {
        label: 'Ürün B',
        data: [70, 75, 85, 90, 80, 75],
        color: '#10B981'
      },
      {
        label: 'Ürün C',
        data: [60, 65, 70, 75, 85, 90],
        color: '#F59E0B'
      }
    ]
  };

  const ganttData: GanttData = {
    tasks: [
      {
        id: 'task1',
        name: 'Proje Planlama',
        start: '2024-01-01',
        end: '2024-01-15',
        progress: 100,
        color: '#3B82F6'
      },
      {
        id: 'task2',
        name: 'Tasarım',
        start: '2024-01-10',
        end: '2024-02-01',
        progress: 80,
        dependencies: ['task1'],
        color: '#10B981'
      },
      {
        id: 'task3',
        name: 'Geliştirme',
        start: '2024-01-25',
        end: '2024-03-15',
        progress: 60,
        dependencies: ['task2'],
        color: '#F59E0B'
      },
      {
        id: 'task4',
        name: 'Test',
        start: '2024-03-01',
        end: '2024-03-30',
        progress: 30,
        dependencies: ['task3'],
        color: '#8B5CF6'
      },
      {
        id: 'task5',
        name: 'Yayınlama',
        start: '2024-03-25',
        end: '2024-04-05',
        progress: 0,
        dependencies: ['task4'],
        color: '#EF4444'
      }
    ]
  };

  const chartTypes = [
    {
      id: 'heatmap',
      name: 'Isı Haritası',
      description: 'Veri yoğunluğunu renklerle gösterir',
      icon: BarChart3,
      color: 'red',
      data: heatMapData
    },
    {
      id: 'sankey',
      name: 'Sankey Diyagramı',
      description: 'Veri akışını gösterir',
      icon: TrendingUp,
      color: 'blue',
      data: sankeyData
    },
    {
      id: 'radar',
      name: 'Radar Grafiği',
      description: 'Çoklu boyutlu karşılaştırma',
      icon: Target,
      color: 'green',
      data: radarData
    },
    {
      id: 'gantt',
      name: 'Gantt Grafiği',
      description: 'Proje zaman çizelgesi',
      icon: Calendar,
      color: 'purple',
      data: ganttData
    },
    {
      id: '3d',
      name: '3D Grafikler',
      description: 'Üç boyutlu veri görselleştirme',
      icon: Layers,
      color: 'orange',
      data: null
    },
    {
      id: 'map',
      name: 'Etkileşimli Harita',
      description: 'Coğrafi veri analizi',
      icon: Map,
      color: 'teal',
      data: null
    },
    {
      id: 'timeline',
      name: 'Zaman Çizelgesi',
      description: 'Olayların zaman içindeki sırası',
      icon: Clock,
      color: 'pink',
      data: null
    },
    {
      id: 'custom',
      name: 'Özel Görselleştirme',
      description: 'Kendi tasarımınızı oluşturun',
      icon: Zap,
      color: 'indigo',
      data: null
    }
  ];

  const renderHeatMap = useCallback(() => {
    const maxValue = Math.max(...heatMapData.values.flat());
    const minValue = Math.min(...heatMapData.values.flat());

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Isı Haritası</h3>
          <div className="flex items-center gap-2">
            <div className="text-sm text-slate-600">Yoğunluk:</div>
            <div className="flex gap-1">
              {heatMapData.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-max">
            {/* Header */}
            <div className="flex">
              <div className="w-20 h-8"></div>
              {heatMapData.x.map((day) => (
                <div key={day} className="w-16 h-8 flex items-center justify-center text-xs font-medium text-slate-600">
                  {day}
                </div>
              ))}
            </div>

            {/* Rows */}
            {heatMapData.y.map((time, yIndex) => (
              <div key={time} className="flex">
                <div className="w-20 h-12 flex items-center justify-end pr-2 text-xs font-medium text-slate-600">
                  {time}
                </div>
                {heatMapData.x.map((_, xIndex) => {
                  const value = heatMapData.values[yIndex][xIndex];
                  const intensity = (value - minValue) / (maxValue - minValue);
                  const colorIndex = Math.floor(intensity * (heatMapData.colors.length - 1));
                  const color = heatMapData.colors[colorIndex];

                  return (
                    <div
                      key={`${yIndex}-${xIndex}`}
                      className="w-16 h-12 flex items-center justify-center text-xs font-medium text-white cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: color }}
                      title={`${time} - ${heatMapData.x[xIndex]}: ${value}`}
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }, []);

  const renderSankeyDiagram = useCallback(() => {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Sankey Diyagramı</h3>
        
        <div className="relative h-96 bg-slate-50 rounded-lg p-4">
          {/* Simplified Sankey visualization */}
          <div className="flex items-center justify-between h-full">
            {/* Source nodes */}
            <div className="space-y-4">
              {sankeyData.nodes.slice(0, 3).map((node) => (
                <div
                  key={node.id}
                  className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                  style={{ backgroundColor: node.color }}
                >
                  {node.name}
                </div>
              ))}
            </div>

            {/* Flow lines */}
            <div className="flex-1 mx-8">
              <div className="space-y-8">
                {sankeyData.links.slice(0, 3).map((link, index) => {
                  const sourceNode = sankeyData.nodes.find(n => n.id === link.source);
                  const targetNode = sankeyData.nodes.find(n => n.id === link.target);
                  
                  return (
                    <div key={index} className="relative">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-slate-700">{sourceNode?.name}</div>
                        <div className="text-sm font-medium text-slate-700">{targetNode?.name}</div>
                      </div>
                      <div className="mt-2 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60"></div>
                      <div className="text-xs text-slate-500 text-center mt-1">{link.value} kullanıcı</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Target nodes */}
            <div className="space-y-4">
              {sankeyData.nodes.slice(3, 6).map((node) => (
                <div
                  key={node.id}
                  className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                  style={{ backgroundColor: node.color }}
                >
                  {node.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }, []);

  const renderRadarChart = useCallback(() => {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Radar Grafiği</h3>
        
        <div className="flex items-center justify-center">
          <div className="relative w-80 h-80">
            {/* Radar chart visualization */}
            <svg width="320" height="320" className="absolute inset-0">
              {/* Grid circles */}
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, index) => (
                <circle
                  key={index}
                  cx="160"
                  cy="160"
                  r={160 * scale}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />
              ))}

              {/* Category lines */}
              {radarData.categories.map((_, index) => {
                const angle = (index * 2 * Math.PI) / radarData.categories.length - Math.PI / 2;
                const x = 160 + 160 * Math.cos(angle);
                const y = 160 + 160 * Math.sin(angle);
                
                return (
                  <line
                    key={index}
                    x1="160"
                    y1="160"
                    x2={x}
                    y2={y}
                    stroke="#E2E8F0"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Data polygons */}
              {radarData.datasets.map((dataset, datasetIndex) => {
                const points = dataset.data.map((value, index) => {
                  const angle = (index * 2 * Math.PI) / radarData.categories.length - Math.PI / 2;
                  const normalizedValue = value / 100;
                  const x = 160 + 160 * normalizedValue * Math.cos(angle);
                  const y = 160 + 160 * normalizedValue * Math.sin(angle);
                  return `${x},${y}`;
                }).join(' ');

                return (
                  <polygon
                    key={datasetIndex}
                    points={points}
                    fill={dataset.color}
                    fillOpacity="0.2"
                    stroke={dataset.color}
                    strokeWidth="2"
                  />
                );
              })}

              {/* Category labels */}
              {radarData.categories.map((category, index) => {
                const angle = (index * 2 * Math.PI) / radarData.categories.length - Math.PI / 2;
                const x = 160 + 180 * Math.cos(angle);
                const y = 160 + 180 * Math.sin(angle);
                
                return (
                  <text
                    key={index}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-medium fill-slate-600"
                  >
                    {category}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6">
          {radarData.datasets.map((dataset, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: dataset.color }}
              />
              <span className="text-sm text-slate-600">{dataset.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }, []);

  const renderGanttChart = useCallback(() => {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-04-05');
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysPerPixel = 300 / totalDays;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Gantt Grafiği</h3>
        
        <div className="space-y-2">
          {ganttData.tasks.map((task) => {
            const taskStart = new Date(task.start);
            const taskEnd = new Date(task.end);
            const taskStartDays = Math.ceil((taskStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            const taskDurationDays = Math.ceil((taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24));
            
            const left = taskStartDays * daysPerPixel;
            const width = taskDurationDays * daysPerPixel;

            return (
              <div key={task.id} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-slate-700 truncate">
                  {task.name}
                </div>
                <div className="flex-1 relative h-8 bg-slate-100 rounded">
                  <div
                    className="absolute h-full rounded flex items-center px-2 text-xs font-medium text-white"
                    style={{
                      left: `${left}px`,
                      width: `${width}px`,
                      backgroundColor: task.color,
                    }}
                  >
                    {task.progress}%
                  </div>
                  <div
                    className="absolute h-full rounded"
                    style={{
                      left: `${left}px`,
                      width: `${width * (task.progress / 100)}px`,
                      backgroundColor: task.color,
                      opacity: 0.3,
                    }}
                  />
                </div>
                <div className="w-20 text-xs text-slate-500">
                  {task.start} - {task.end}
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="mt-4 flex justify-between text-xs text-slate-500">
          <span>Ocak 2024</span>
          <span>Şubat 2024</span>
          <span>Mart 2024</span>
          <span>Nisan 2024</span>
        </div>
      </div>
    );
  }, []);

  const renderChart = useCallback((chartType: string) => {
    switch (chartType) {
      case 'heatmap':
        return renderHeatMap();
      case 'sankey':
        return renderSankeyDiagram();
      case 'radar':
        return renderRadarChart();
      case 'gantt':
        return renderGanttChart();
      case '3d':
        return (
          <div className="text-center py-12">
            <Layers className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">3D Grafikler</h3>
            <p className="text-slate-600">Üç boyutlu görselleştirme özelliği yakında gelecek</p>
          </div>
        );
      case 'map':
        return (
          <div className="text-center py-12">
            <Map className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Etkileşimli Harita</h3>
            <p className="text-slate-600">Coğrafi veri analizi özelliği yakında gelecek</p>
          </div>
        );
      case 'timeline':
        return (
          <div className="text-center py-12">
            <Clock className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Zaman Çizelgesi</h3>
            <p className="text-slate-600">Olay zaman çizelgesi özelliği yakında gelecek</p>
          </div>
        );
      case 'custom':
        return (
          <div className="text-center py-12">
            <Zap className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Özel Görselleştirme</h3>
            <p className="text-slate-600">Kendi tasarımınızı oluşturun</p>
            <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Başla
            </button>
          </div>
        );
      default:
        return null;
    }
  }, [renderHeatMap, renderSankeyDiagram, renderRadarChart, renderGanttChart]);

  return (
    <div className="flex-1 overflow-auto bg-slate-50 min-h-screen">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-900 mb-2">Gelişmiş Grafikler</h1>
              <p className="text-slate-600">Profesyonel veri görselleştirme araçları</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isPlaying 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                {isPlaying ? 'Durdur' : 'Oynat'}
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                <Settings size={20} />
                Ayarlar
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chart Types Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Grafik Türleri</h3>
              <div className="space-y-2">
                {chartTypes.map((chart) => (
                  <button
                    key={chart.id}
                    onClick={() => setActiveChart(chart.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                      activeChart === chart.id
                        ? 'bg-primary-100 text-primary-700 border border-primary-300'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <chart.icon className={`h-5 w-5 text-${chart.color}-600`} />
                    <div>
                      <p className="font-medium text-sm">{chart.name}</p>
                      <p className="text-xs text-slate-500">{chart.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Display Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              {activeChart ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold text-slate-900">
                        {chartTypes.find(c => c.id === activeChart)?.name}
                      </h2>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                          <Download size={16} />
                        </button>
                        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                          <Maximize size={16} />
                        </button>
                        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                          <RotateCcw size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm">
                        <Filter size={14} className="inline mr-1" />
                        Filtrele
                      </button>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-4">
                    {renderChart(activeChart)}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Grafik Seçin</h3>
                  <p className="text-slate-600">Sol panelden bir grafik türü seçerek başlayın</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Grafik Ayarları</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Animasyon Hızı
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="slow">Yavaş</option>
                    <option value="medium">Orta</option>
                    <option value="fast">Hızlı</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Renk Paleti
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="default">Varsayılan</option>
                    <option value="corporate">Kurumsal</option>
                    <option value="creative">Yaratıcı</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">Otomatik Yenileme</p>
                    <p className="text-sm text-slate-600">Verileri otomatik güncelle</p>
                  </div>
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">Etkileşimli Mod</p>
                    <p className="text-sm text-slate-600">Grafiklerde etkileşim</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Kaydet
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
>>>>>>> 4855e23d27390993c3739d0f6d832d04426b1d54
