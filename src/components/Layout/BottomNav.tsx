import React, { useState } from 'react';
import { BarChart3, Plus, Wallet, HelpCircle, Play, Type, Image, Video, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [composeMode, setComposeMode] = useState<'none' | 'text' | 'image' | 'video'>('none');
  const [textContent, setTextContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const videoInputRef = React.useRef<HTMLInputElement>(null);

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
                  onClick={() => {
                    setComposeMode('none');
                    setTextContent('');
                    setSelectedFiles([]);
                    setShowCreateModal(true);
                  }}
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

      {/* Create Modal (centered quick composer) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowCreateModal(false)}
          />

          {/* Modal */}
          <div
            className="relative w-full max-w-sm rounded-2xl p-5 shadow-xl"
            style={{ backgroundColor: 'var(--card)', color: 'var(--text)' }}
          >
            {/* Close */}
            <div className="flex items-center justify-end mb-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-lg hover:opacity-80"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Divider */}
            <div className="h-px mb-4" style={{ backgroundColor: 'var(--border)' }} />

            {/* Icon Row or Inline Composer */}
            {composeMode === 'none' && (
              <div className="flex items-center justify-between">
                {/* Text */}
                <button
                  onClick={() => setComposeMode('text')}
                  className="w-10 h-10 flex items-center justify-center hover:opacity-80"
                  aria-label="Create text post"
                >
                  <Type className="w-6 h-6 text-blue-400" />
                </button>
                {/* Photo */}
                <button
                  onClick={() => imageInputRef.current?.click()}
                  className="w-10 h-10 flex items-center justify-center hover:opacity-80"
                  aria-label="Create photo post"
                >
                  <Image className="w-6 h-6 text-blue-400" />
                </button>
                {/* Video */}
                <button
                  onClick={() => videoInputRef.current?.click()}
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
            )}

            {composeMode !== 'none' && (
              <div>
                {composeMode === 'text' && (
                  <div>
                    <textarea
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      placeholder="Write your post..."
                      className="w-full h-28 bg-transparent text-primary outline-none resize-none mb-3"
                    />
                  </div>
                )}
                {selectedFiles.length > 0 && (
                  <div className="mb-3 text-sm text-secondary">{selectedFiles.length} file(s) selected</div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const content = textContent.trim() || (composeMode === 'image' ? 'Shared an image' : 'Shared a video');
                      window.dispatchEvent(new CustomEvent('wegram:new-post', { detail: { content } }));
                      setShowCreateModal(false);
                      setComposeMode('none');
                      setTextContent('');
                      setSelectedFiles([]);
                    }}
                    className="btn-primary flex-1"
                    disabled={composeMode === 'text' && !textContent.trim()}
                  >
                    Post
                  </button>
                  <button
                    onClick={() => {
                      setComposeMode('none');
                      setTextContent('');
                      setSelectedFiles([]);
                    }}
                    className="btn-secondary px-6"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}

            {/* Hidden inputs for media selection */}
            <input ref={imageInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setSelectedFiles(files);
              setComposeMode('image');
            }} />
            <input ref={videoInputRef} type="file" accept="video/*" multiple className="hidden" onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setSelectedFiles(files);
              setComposeMode('video');
            }} />
          </div>
        </div>
      )}
    </div>
  );
};