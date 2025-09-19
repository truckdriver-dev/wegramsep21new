import React, { useState } from 'react';
import { Home, TrendingUp, Compass, Gamepad2, MessageCircle, Gift, Bot, Video, Bell, RotateCcw, Bookmark, Coins, Play, ShoppingCart, CheckCircle, LogOut, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { TwoFactorModal } from '../Auth/TwoFactorModal';
import { useAuth } from '../../hooks/useAuth';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/home' },
    { id: 'launch-token', label: 'Launch Your Token', icon: Coins, path: '/launch-token' },
    { id: 'trending', label: 'Trending', icon: TrendingUp, path: '/trending' },
    { id: 'verification', label: 'Get Verified', icon: CheckCircle, path: '/verification' },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, path: '/bookmarks' },
    { id: 'explore', label: 'Explore', icon: Compass, path: '/explore' },
    { id: 'staking', label: 'Staking', icon: Coins, path: '/staking' },
    { id: 'games', label: 'Games', icon: Gamepad2, path: '/games' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, path: '/messages' },
    { id: 'rewards', label: 'Rewards', icon: Gift, path: '/rewards' },
    { id: 'video', label: 'Video', icon: Play, path: '/video' },
    { id: 'ai', label: 'Wegram AI', icon: Bot, path: '/ai' },
    { id: 'livestream', label: 'Livestream', icon: Video, path: '/livestream' },
    { id: 'buy-wegram', label: 'Buy Wegram', icon: ShoppingCart, path: '/buy-wegram' }
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = async () => {
    try {
      await signOut();
      onClose();
      navigate('/home');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still close the drawer and navigate on error
      onClose();
      navigate('/home');
    }
  };

  const handleTwoFactorClick = () => {
    setIsTwoFactorModalOpen(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Drawer */}
      <div className={`relative ${isExpanded ? 'w-80 max-w-sm' : 'w-20'} bg-opacity-95 backdrop-blur-sm overflow-y-auto transition-all duration-300 flex flex-col h-full`} style={{ backgroundColor: 'var(--card)' }}>
        {/* Header with logo */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center gap-3 transition-colors ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              } rounded-lg p-2`}
            >
              <img 
                src="https://i.ibb.co/TxdWc0kL/IMG-9101.jpg"
                alt="WEGRAM Logo" 
                className="w-10 h-10 rounded-xl object-cover shadow-2xl border border-purple-400/30"
              />
              {isExpanded && <span className="text-xl font-bold text-primary">WEGRAM</span>}
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.path)}
                  className={`w-full flex items-center ${isExpanded ? 'gap-4' : 'justify-center'} py-4 transition-all duration-200 text-left group ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  } rounded-lg mb-2`}
                  title={!isExpanded ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 text-cyan-400 group-hover:text-purple-400 transition-colors duration-200" 
                        style={{
                          filter: 'drop-shadow(0 0 2px currentColor)',
                          background: 'linear-gradient(135deg, #00D4FF, #9945FF)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }} />
                  {isExpanded && (
                    <span className="font-medium bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:from-purple-500 group-hover:to-pink-400 transition-all duration-200 bg-clip-text text-transparent">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Bottom Security Actions */}
          <div className="mt-auto border-t pt-4 space-y-2" style={{ borderColor: isDark ? '#4b5563' : '#d1d5db' }}>
            <button
              onClick={handleTwoFactorClick}
              className={`w-full flex items-center ${isExpanded ? 'gap-4' : 'justify-center'} py-4 transition-all duration-200 text-left group ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              } rounded-lg`}
              title={!isExpanded ? '2FA Settings' : undefined}
            >
              <Shield className="w-5 h-5 text-cyan-400 group-hover:text-purple-400 transition-colors duration-200" 
                    style={{
                      filter: 'drop-shadow(0 0 2px currentColor)',
                      background: 'linear-gradient(135deg, #00D4FF, #9945FF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }} />
              {isExpanded && (
                <span className="font-medium bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:from-purple-500 group-hover:to-pink-400 transition-all duration-200 bg-clip-text text-transparent">
                  2FA Settings
                </span>
              )}
            </button>
            
            <button
              onClick={handleLogout}
              className={`w-full flex items-center ${isExpanded ? 'gap-4' : 'justify-center'} py-4 transition-all duration-200 text-left group ${
                isDark ? 'hover:bg-red-700' : 'hover:bg-red-100'
              } rounded-lg`}
              title={!isExpanded ? 'Log Out' : undefined}
            >
              <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors duration-200" />
              {isExpanded && (
                <span className="font-medium text-red-400 group-hover:text-red-300 transition-all duration-200">
                  Log Out
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Two Factor Modal */}
      <TwoFactorModal
        isOpen={isTwoFactorModalOpen}
        onClose={() => setIsTwoFactorModalOpen(false)}
      />
      
      {/* Right side content area */}
      <div className="flex-1 relative" onClick={onClose}>
        {/* Top bar in drawer view */}
        <div className="p-4 flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search @handle or posts..."
              className="input pl-4 pr-4 text-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className={`p-2 rounded-lg transition-colors relative ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}>
              <Bell className="w-5 h-5" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></div>
            </button>
            <button className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}>
              <RotateCcw className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}>
              <Gift className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};