import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Megaphone, X } from 'lucide-react';

export const CreateNew: React.FC = () => {
  const navigate = useNavigate();

  const options = [
    {
      id: 'group',
      title: 'New Group',
      description: 'Create a group for up to 200,000 members with interactive chat and media sharing',
      icon: Users,
      iconColor: 'text-green-400',
      bgColor: 'bg-green-500',
      onClick: () => navigate('/create-group')
    },
    {
      id: 'channel',
      title: 'New Channel',
      description: 'Broadcast messages to unlimited subscribers with admin controls',
      icon: Megaphone,
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500',
      onClick: () => console.log('Create channel')
    }
  ];

  return (
    <div className="max-w-md mx-auto" style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-opacity-95 backdrop-blur-sm px-4 py-3 flex items-center gap-3" style={{ backgroundColor: 'var(--bg)' }}>
        <button
          onClick={() => navigate('/messages')}
          className="p-2 rounded-lg transition-colors hover:bg-overlay-light"
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </button>
        <h1 className="text-lg font-bold text-primary">Create New</h1>
        <button
          onClick={() => navigate('/messages')}
          className="ml-auto p-2 rounded-lg transition-colors hover:bg-overlay-light"
        >
          <X className="w-5 h-5 text-primary" />
        </button>
      </div>

      <div className="px-4 py-6">
        <div className="space-y-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={option.onClick}
              className="w-full p-4 card hover:bg-overlay-light transition-colors text-left"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full ${option.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <option.icon className={`w-6 h-6 ${option.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-primary font-semibold text-lg mb-2">{option.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed">{option.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
