import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreHorizontal, Phone, Video, Search, Send, Image, Gift, Coins, Diamond, Plus, TrendingUp, Compass, Gamepad2, MessageCircle, Wallet, Play, ShoppingCart } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isFromUser: boolean;
  timestamp: string;
  hasImage?: boolean;
  hasGift?: boolean;
  hasToken?: boolean;
  hasNFT?: boolean;
}

export const ChatDetail: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [messageText, setMessageText] = useState('');
  const [showBottomNav, setShowBottomNav] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey! Check out this new NFT drop 🚀',
      isFromUser: false,
      timestamp: '2m ago'
    },
    {
      id: '2',
      text: 'Looks amazing! What\'s the floor price?',
      isFromUser: true,
      timestamp: '1m ago'
    },
    {
      id: '3',
      text: 'Starting at 0.5 ETH, but I think it\'ll moon',
      isFromUser: false,
      timestamp: '1m ago'
    },
    {
      id: '4',
      text: 'I\'m definitely minting one!',
      isFromUser: true,
      timestamp: 'now'
    }
  ]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        isFromUser: true,
        timestamp: 'now'
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const actionButtons = [
    { icon: Diamond, label: 'NFT', color: 'text-purple-400' },
    { icon: Gift, label: 'Gift', color: 'text-cyan-400' },
    { icon: Image, label: 'Image', color: 'text-green-400' },
    { icon: Coins, label: 'Token', color: 'text-yellow-400' }
  ];

  const bottomNavItems = [
    { icon: TrendingUp, label: 'Trending', path: '/trending' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: Gamepad2, label: 'Games', path: '/games' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
    { icon: Play, label: 'Livestream', path: '/livestream' },
    { icon: ShoppingCart, label: 'Buy', path: '/buy-wegram' }
  ];

  const handleBottomNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="max-w-md mx-auto" style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="sticky top-0 z-10" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/messages')}
              className="p-2 hover:bg-overlay-light rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-primary">{username}</h1>
              <p className="text-sm text-secondary">Online</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-overlay-light rounded-lg transition-colors">
                <Phone className="w-5 h-5 text-secondary" />
              </button>
              <button className="p-2 hover:bg-overlay-light rounded-lg transition-colors">
                <Video className="w-5 h-5 text-secondary" />
              </button>
              <button className="p-2 hover:bg-overlay-light rounded-lg transition-colors">
                <Search className="w-5 h-5 text-secondary" />
              </button>
              <button 
                onClick={() => setShowBottomNav(!showBottomNav)}
                className="p-2 hover:bg-overlay-light rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5 text-secondary" />
              </button>
              <button className="p-2 hover:bg-overlay-light rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5 text-secondary" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="px-4 py-4 space-y-4" style={{ paddingBottom: '120px' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                message.isFromUser
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  : 'bg-overlay-light text-primary'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.isFromUser ? 'text-blue-100' : 'text-secondary'
              }`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto px-4">
        <div className="bg-overlay-light rounded-lg p-3 mb-3">
          <div className="flex justify-around">
            {actionButtons.map((button, index) => (
              <button
                key={index}
                className="flex flex-col items-center gap-1 p-2 hover:bg-overlay-medium rounded-lg transition-colors"
              >
                <button.icon className={`w-6 h-6 ${button.color}`} />
                <span className="text-xs text-secondary">{button.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="flex items-center gap-3" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex-1 relative">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="iMessage"
              className="w-full px-4 py-3 rounded-lg text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className="p-3 rounded-lg transition-colors disabled:opacity-50"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation Overlay */}
      {showBottomNav && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowBottomNav(false)}>
          <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto">
            <div className="card m-4 p-4">
              <div className="grid grid-cols-4 gap-4">
                {bottomNavItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleBottomNavClick(item.path);
                      setShowBottomNav(false);
                    }}
                    className="flex flex-col items-center gap-2 p-3 hover:bg-overlay-light rounded-lg transition-colors"
                  >
                    <item.icon className="w-6 h-6 text-primary" />
                    <span className="text-xs text-secondary">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
