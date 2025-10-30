'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Yeni Proje Onayı',
      message: '3 proje onay bekliyor',
      time: '5 dakika önce',
      unread: true,
      type: 'warning'
    },
    {
      id: 2,
      title: 'Sistem Uyarısı',
      message: 'API rate limit %80 doluluk',
      time: '1 saat önce',
      unread: true,
      type: 'error'
    },
    {
      id: 3,
      title: 'Yeni Kullanıcı',
      message: '5 yeni kullanıcı kaydı',
      time: '2 saat önce',
      unread: false,
      type: 'info'
    },
  ];

  const systemStatus = {
    uptime: 99.8,
    activeUsers: 892,
    apiHealth: 'healthy',
    dbHealth: 'healthy'
  };

  return (
    <div className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6">
      {/* Mobile menu button */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={onMenuClick}
      >
        <span className="sr-only">Menüyü aç</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* System Status */}
        <div className="flex items-center gap-x-4">
          <div className="hidden lg:flex items-center gap-x-2">
            <div className="flex items-center gap-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Sistem: %{systemStatus.uptime}</span>
            </div>
            <div className="flex items-center gap-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Aktif: {systemStatus.activeUsers}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
          {/* System Health Indicators */}
          <div className="hidden lg:flex items-center gap-x-3">
            <div className="flex items-center gap-x-1">
              <div className={`w-2 h-2 rounded-full ${systemStatus.apiHealth === 'healthy' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-xs text-gray-600">API</span>
            </div>
            <div className="flex items-center gap-x-1">
              <div className={`w-2 h-2 rounded-full ${systemStatus.dbHealth === 'healthy' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-xs text-gray-600">DB</span>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <span className="sr-only">Bildirimleri görüntüle</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-lg bg-white py-2 shadow-lg ring-1 ring-gray-900/5"
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">Sistem Bildirimleri</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 ${
                        notification.unread 
                          ? notification.type === 'error' 
                            ? 'border-red-500 bg-red-50/50' 
                            : notification.type === 'warning'
                            ? 'border-yellow-500 bg-yellow-50/50'
                            : 'border-blue-500 bg-blue-50/50'
                          : 'border-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        {notification.unread && (
                          <div className={`w-2 h-2 rounded-full ml-2 mt-1 ${
                            notification.type === 'error' ? 'bg-red-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-100">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Tümünü görüntüle
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

          {/* Profile dropdown */}
          <div className="relative">
            <button
              type="button"
              className="-m-1.5 flex items-center p-1.5 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <span className="sr-only">Admin menüsünü aç</span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-sm font-semibold text-white">A</span>
              </div>
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm font-semibold leading-6 text-gray-900">Admin</span>
                <svg className="ml-2 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>

            {/* User menu dropdown */}
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-lg bg-white py-2 shadow-lg ring-1 ring-gray-900/5"
              >
                <a
                  href="/admin/profile"
                  className="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50 rounded-lg mx-2"
                >
                  Admin Profili
                </a>
                <a
                  href="/admin/settings"
                  className="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50 rounded-lg mx-2"
                >
                  Sistem Ayarları
                </a>
                <div className="my-1 h-px bg-gray-200 mx-2" />
                <a
                  href="/logout"
                  className="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-50 rounded-lg mx-2"
                >
                  Çıkış Yap
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
