import React, { useState } from 'react';
import { BarChart3, Plus, Wallet, HelpCircle, Play, Image, Type, Video, Smile, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tabs = [
    { id: 'video', label: 'Video', icon: Play, path: '/video' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { id: 'add', label: 'Add', icon: Plus, path: '/compose' },
    { id: 'wallet', label: 'Wallet', icon: Wallet, path: '/wallet' },
    { id: 'help', label: 'Help', icon: HelpCircle, path: '/help' }
  ];

  const createOptions = [
    { id: 'text', label: 'Text', icon: Type, color: 'text-blue-400', bgColor: 'bg-blue-400 bg-opacity-20' },
    { id: 'image', label: 'Image', icon: Image, color: 'text-green-400', bgColor: 'bg-green-400 bg-opacity-20' },
    { id: 'video', label: 'Video', icon: Video, color: 'text-purple-400', bgColor: 'bg-purple-400 bg-opacity-20' },
    { id: 'gif', label: 'GIF', icon: Smile, color: 'text-orange-400', bgColor: 'bg-orange-400 bg-opacity-20' }
  ];

  const handleCreateOption = (option: string) => {
    setShowCreateModal(false);
    // For now, navigate to compose for all options
    // In the future, this could navigate to specific creation flows
    navigate('/compose');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto bg-opacity-95 backdrop-blur-sm" style={{ backgroundColor: 'var(--card)' }}>
        <div className="flex items-center justify-around py-2 border-t" style={{ borderColor: 'var(--border)' }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;
            
            if (tab.id === 'add') {
              return (
                <button
                  key={tab.id}
                  onClick={() => setShowCreateModal(true)}
                  className="fab"
                  style={{ position: 'relative', bottom: 'auto', right: 'auto', margin: '0 8px' }}
                >
                  <Icon className="w-6 h-6" />
                </button>
              );
            }

            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center gap-1 py-2 px-3 transition-all duration-200 focus:outline-none"
              >
                <Icon 
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? 'text-purple-400' : 'text-gray-400'
                  }`}
                />
                <span 
                  className={`text-xs font-medium transition-colors duration-200 ${
                    isActive ? 'text-purple-400' : 'text-gray-400'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setShowCreateModal(false)} 
          />
          
          {/* Modal */}
          <div className={`relative w-full max-w-sm rounded-t-2xl p-6 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Create Post
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* Create Options */}
            <div className="grid grid-cols-2 gap-4">
              {createOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleCreateOption(option.id)}
                    className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-200 hover:scale-105 ${
                      isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${option.bgColor}`}>
                      <Icon className={`w-6 h-6 ${option.color}`} />
                    </div>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};