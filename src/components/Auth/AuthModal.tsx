import React from 'react';
import { X as CloseIcon, Search, Mail, Phone } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth: (method: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuth }) => {
  const { signInWithGoogle } = useAuth();

  const handleGoogleAuth = async () => {
    await signInWithGoogle();
    navigate('/landing');
  };

  const handleEmailAuth = () => {
    // For now, just close modal - email auth form can be added later
    navigate('/landing');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-75" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative card max-w-sm w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img 
              src="https://i.ibb.co/TxdWc0kL/IMG-9101.jpg"
              alt="WEGRAM Logo" 
              className="w-10 h-10 rounded-xl object-cover shadow-2xl border border-purple-400/30"
            />
            <div>
              <h2 className="text-xl font-bold text-primary">WEGRAM</h2>
              <p className="text-secondary text-sm">Web3 SocialFi app</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-lg font-semibold text-primary mb-6">Social signup</h3>

        <div className="space-y-3">
          <button
            onClick={handleGoogleAuth}
            className="btn-primary w-full flex items-center justify-center gap-3 py-4"
          >
            <Search className="w-5 h-5" />
            Continue with Google
          </button>
          <button
            onClick={() => onAuth('twitter')}
            className="btn-primary w-full flex items-center justify-center gap-3 py-4"
          >
            <div className="w-5 h-5 flex items-center justify-center font-bold text-lg">𝕏</div>
            Continue with X
          </button>
          <button
            onClick={handleEmailAuth}
            className="btn-primary w-full flex items-center justify-center gap-3 py-4"
          >
            <Mail className="w-5 h-5" />
            Continue with Email
          </button>
          <button
            onClick={() => onAuth('phone')}
            className="btn-primary w-full flex items-center justify-center gap-3 py-4"
          >
            <Phone className="w-5 h-5" />
            Continue with Phone
          </button>
          
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }}></div>
            <span className="text-secondary text-sm">or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }}></div>
          </div>
          
          <button
            onClick={() => onAuth('guest')}
            className="btn-secondary w-full py-4"
          >
            Continue without account
          </button>
        </div>

        <p className="text-xs text-secondary text-center mt-6">
          By continuing you agree to our Terms & Privacy
        </p>
      </div>
    </div>
  );
};