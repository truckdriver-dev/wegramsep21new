import React, { useState } from 'react';
import { BarChart3, Plus, Wallet, HelpCircle, Play, Type, Image, Video, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tabs = [
    { id: 'video', label: 'Video', icon: Play, path: '/video' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { id: 'add', label: 'Add', icon: Plus, path: '/compose' },
    { id: 'wallet', label: 'Wallet', icon: Wallet, path: '/wallet' },
    { id: 'help', label: 'Help', icon: HelpCircle, path: '/help' }
  ];

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

      {/* Create Modal (simple, beautiful, matches screenshot) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowCreateModal(false)}
          />

          {/* Modal */}
          <div
            className="relative w-full max-w-sm rounded-t-2xl p-5"
            style={{ backgroundColor: 'var(--card)', color: 'var(--text)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-blue-400 text-sm">Everyone can reply</span>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-lg hover:opacity-80"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Divider */}
            <div className="h-px mb-4" style={{ backgroundColor: 'var(--border)' }} />

            {/* Icon Row */}
            <div className="flex items-center justify-between">
              {/* Text */}
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  navigate('/compose');
                }}
                className="w-10 h-10 flex items-center justify-center hover:opacity-80"
                aria-label="Create text post"
              >
                <Type className="w-6 h-6 text-blue-400" />
              </button>
              {/* Photo */}
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  navigate('/compose');
                }}
                className="w-10 h-10 flex items-center justify-center hover:opacity-80"
                aria-label="Create photo post"
              >
                <Image className="w-6 h-6 text-blue-400" />
              </button>
              {/* Video */}
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  navigate('/compose');
                }}
                className="w-10 h-10 flex items-center justify-center hover:opacity-80"
                aria-label="Create video post"
              >
                <Video className="w-6 h-6 text-blue-400" />
              </button>

              {/* Spacer elements to mirror screenshot layout */}
              <div className="w-6 h-6 rounded-full" style={{ border: '2px solid var(--border)' }} />
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--accent)' }}
                aria-label="Close"
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