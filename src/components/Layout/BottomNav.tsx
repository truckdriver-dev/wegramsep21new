import React from 'react';
import { BarChart3, Plus, Wallet, HelpCircle, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuth();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User, path: profile?.username ? `/user/${profile.username}` : '/home' },
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
                  onClick={() => navigate(tab.path)}
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
    </div>
  );
};