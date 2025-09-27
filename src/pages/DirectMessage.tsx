import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Phone, Video } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSent: boolean;
  status: 'sent' | 'delivered' | 'read';
}

export const DirectMessage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  // Mock user data
  const user = {
    username: `@${username}`,
    displayName: username?.toUpperCase() || 'USER',
    bio: 'Visionary | Former Operations Analyst | Human Terrain-Mapping and Behavior Pattern Recognition Specialist',
    joinDate: 'June 2021',
    followers: '3.1K',
    avatar: '👤',
    isOnline: true
  };

  // Mock messages
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        text: 'Yoo',
        timestamp: '08:20',
        isSent: true,
        status: 'read'
      },
      {
        id: '2',
        text: 'Hey! How are you doing?',
        timestamp: '08:22',
        isSent: false,
        status: 'read'
      },
      {
        id: '3',
        text: 'I\'m doing great! Just working on some new projects. What about you?',
        timestamp: '08:25',
        isSent: true,
        status: 'read'
      },
      {
        id: '4',
        text: 'Same here! Excited about the new features we\'re building',
        timestamp: '08:27',
        isSent: false,
        status: 'read'
      },
      {
        id: '5',
        text: 'That sounds amazing! Can\'t wait to see what you\'ve been working on',
        timestamp: '08:30',
        isSent: true,
        status: 'delivered'
      }
    ];
    setMessages(mockMessages);
  }, [username]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      isSent: true,
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const formatTime = (time: string) => {
    return time;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <div className="max-w-md mx-auto h-screen flex flex-col" style={{ backgroundColor: 'var(--card)' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-lg">{user.avatar}</span>
              </div>
              <div>
                <h1 className="font-bold text-lg" style={{ color: 'var(--text)' }}>{user.displayName}</h1>
                <p className="text-sm" style={{ color: 'var(--secondary)' }}>Online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Video className="w-5 h-5" style={{ color: 'var(--text)' }} />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Phone className="w-5 h-5" style={{ color: 'var(--text)' }} />
            </button>
          </div>
        </div>

        {/* User Profile Info */}
        <div className="p-4 border-b flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm mb-2" style={{ color: 'var(--secondary)' }}>{user.bio}</p>
          <div className="text-center">
            <p className="text-sm" style={{ color: 'var(--secondary)' }}>Joined {user.joinDate} • {user.followers} Followers</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-center text-sm mb-4" style={{ color: 'var(--secondary)' }}>Today</div>
          
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                  msg.isSent 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <div className={`text-xs mt-1 ${
                    msg.isSent ? 'text-blue-100' : 'text-secondary'
                  }`}>
                    {formatTime(msg.timestamp)} • {msg.isSent ? 'Sent' : 'Received'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <button
              type="button"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Start a message"
              className="input flex-1"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
