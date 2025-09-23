import React, { useState } from 'react';
import { BarChart3, Plus, Wallet, HelpCircle, Play, Image, Type, Video, Smile, X, Globe, BarChart, CircleDot, List } from 'lucide-react';
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
    { id: 'text', label: 'Text', icon: Type, color: 'text-blue-400' },
    { id: 'image', label: 'Image', icon: Image, color: 'text-blue-400' },
    { id: 'poll', label: 'Poll', icon: BarChart, color: 'text-blue-400' },
    { id: 'live', label: 'LIVE', icon: CircleDot, color: 'text-blue-400' },
    { id: 'gif', label: 'GIF', icon: Smile, color: 'text-blue-400' },
    { id: 'thread', label: 'Thread', icon: List, color: 'text-blue-400' }
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
          <div className={`relative w-full max-w-sm rounded-t-2xl p-4 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            {/* Reply Setting */}
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm">Everyone can reply</span>
            </div>

            {/* Divider */}
            <div className={`h-px mb-4 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}></div>

            {/* Create Options - Horizontal Row */}
            <div className="flex items-center justify-between">
              {createOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleCreateOption(option.id)}
                    className="flex items-center justify-center w-8 h-8 transition-colors hover:opacity-80"
                  >
                    <Icon className={`w-5 h-5 ${option.color}`} />
                  </button>
                );
              })}
              
              {/* Progress Circle */}
              <div className="w-6 h-6 rounded-full border-2 border-gray-400"></div>
              
              {/* Plus Button */}
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};