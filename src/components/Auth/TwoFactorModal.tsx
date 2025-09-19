import React, { useState } from 'react';
import { X, Shield, Smartphone, Key, CheckCircle, QrCode, Copy, AlertCircle, Download, Check } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface TwoFactorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TwoFactorModal: React.FC<TwoFactorModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const [step, setStep] = useState<'setup' | 'verify' | 'success' | 'disable'>('setup');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [copiedBackup, setCopiedBackup] = useState<string | null>(null);
  
  const [backupCodes] = useState([
    'WEGRAM-1234-5678',
    'WEGRAM-9876-5432', 
    'WEGRAM-4567-8901',
    'WEGRAM-2345-6789',
    'WEGRAM-7890-1234'
  ]);

  const secretKey = 'JBSWY3DPEHPK3PXP'; // Mock secret key for demo

  const handleVerify = () => {
    if (verificationCode.length === 6) {
      setStep('success');
      setIsEnabled(true);
    }
  };

  const handleDisable = () => {
    if (verificationCode.length === 6) {
      setIsEnabled(false);
      setStep('setup');
      onClose();
    }
  };

  const copyToClipboard = async (text: string, type?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'secret') {
        setCopiedSecret(true);
        setTimeout(() => setCopiedSecret(false), 2000);
      } else if (type === 'backup') {
        setCopiedBackup(text);
        setTimeout(() => setCopiedBackup(null), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Enhanced Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className={`relative max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700' 
          : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
      }`}>
        {/* Header */}
        <div className={`px-8 py-6 border-b ${
          isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/80'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">Two-Factor Authentication</h2>
                <p className="text-sm text-secondary">Enhanced account security</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-all hover:scale-105 ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5 text-secondary" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {step === 'setup' && !isEnabled && (
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="text-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                  isDark 
                    ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-purple-500/20' 
                    : 'bg-gradient-to-br from-purple-100 to-blue-100 border border-purple-200'
                }`}>
                  <Smartphone className={`w-10 h-10 ${
                    isDark ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">Secure Your Account</h3>
                <p className="text-secondary leading-relaxed max-w-sm mx-auto">
                  Protect your WEGRAM account with an additional layer of security using time-based authentication codes.
                </p>
              </div>

              {/* QR Code Section */}
              <div className={`relative p-8 rounded-2xl border-2 ${
                isDark 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600' 
                  : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'
              }`}>
                <div className="text-center">
                  {/* Realistic QR Code Placeholder */}
                  <div className="relative w-44 h-44 mx-auto mb-6">
                    <div className="w-full h-full bg-white rounded-2xl shadow-lg p-4 border">
                      <svg viewBox="0 0 144 144" className="w-full h-full">
                        {/* QR Code Pattern */}
                        <rect width="144" height="144" fill="white"/>
                        {/* Corner squares */}
                        <g fill="black">
                          <rect x="8" y="8" width="32" height="32"/>
                          <rect x="104" y="8" width="32" height="32"/>
                          <rect x="8" y="104" width="32" height="32"/>
                          <rect x="16" y="16" width="16" height="16" fill="white"/>
                          <rect x="112" y="16" width="16" height="16" fill="white"/>
                          <rect x="16" y="112" width="16" height="16" fill="white"/>
                          <rect x="20" y="20" width="8" height="8" fill="black"/>
                          <rect x="116" y="20" width="8" height="8" fill="black"/>
                          <rect x="20" y="116" width="8" height="8" fill="black"/>
                          {/* Data pattern */}
                          <rect x="48" y="8" width="4" height="4"/>
                          <rect x="56" y="8" width="4" height="4"/>
                          <rect x="64" y="8" width="4" height="4"/>
                          <rect x="80" y="8" width="4" height="4"/>
                          <rect x="88" y="8" width="4" height="4"/>
                          <rect x="48" y="16" width="4" height="4"/>
                          <rect x="64" y="16" width="4" height="4"/>
                          <rect x="72" y="16" width="4" height="4"/>
                          <rect x="88" y="16" width="4" height="4"/>
                          <rect x="48" y="24" width="4" height="4"/>
                          <rect x="56" y="24" width="4" height="4"/>
                          <rect x="72" y="24" width="4" height="4"/>
                          <rect x="80" y="24" width="4" height="4"/>
                          <rect x="96" y="24" width="4" height="4"/>
                          {/* More pattern continues... */}
                          <rect x="8" y="48" width="4" height="4"/>
                          <rect x="16" y="48" width="4" height="4"/>
                          <rect x="32" y="48" width="4" height="4"/>
                          <rect x="48" y="48" width="4" height="4"/>
                          <rect x="56" y="48" width="4" height="4"/>
                          <rect x="72" y="48" width="4" height="4"/>
                          <rect x="88" y="48" width="4" height="4"/>
                          <rect x="104" y="48" width="4" height="4"/>
                          <rect x="120" y="48" width="4" height="4"/>
                          <rect x="128" y="48" width="4" height="4"/>
                        </g>
                      </svg>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <QrCode className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-primary mb-2">Scan with Authenticator App</h4>
                  <p className="text-sm text-secondary mb-6">
                    Use Google Authenticator, Authy, or any TOTP-compatible app to scan this code
                  </p>
                  
                  {/* Manual Setup Key */}
                  <div className={`p-4 rounded-xl border ${
                    isDark 
                      ? 'bg-gray-800 border-gray-600' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <p className="text-xs font-medium text-secondary mb-3">Can't scan? Enter this key manually:</p>
                    <div className="flex items-center gap-3">
                      <code className={`flex-1 px-3 py-2 rounded-lg text-sm font-mono ${
                        isDark ? 'bg-gray-700 text-green-400' : 'bg-gray-100 text-purple-700'
                      }`}>
                        {secretKey}
                      </code>
                      <button
                        onClick={() => copyToClipboard(secretKey, 'secret')}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          copiedSecret
                            ? 'bg-green-500 text-white'
                            : isDark
                              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                      >
                        {copiedSecret ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* App Recommendations */}
              <div className="space-y-4">
                <h4 className="font-semibold text-primary">Recommended Authenticator Apps</h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                    isDark 
                      ? 'bg-gray-800 border-gray-600 hover:border-purple-500' 
                      : 'bg-white border-gray-200 hover:border-purple-300'
                  }`}>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg font-bold">G</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-primary">Google Authenticator</p>
                      <p className="text-xs text-secondary">Free • iOS & Android</p>
                    </div>
                    <Download className="w-5 h-5 text-secondary" />
                  </div>
                  <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                    isDark 
                      ? 'bg-gray-800 border-gray-600 hover:border-purple-500' 
                      : 'bg-white border-gray-200 hover:border-purple-300'
                  }`}>
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg font-bold">A</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-primary">Authy</p>
                      <p className="text-xs text-secondary">Free • Multi-device sync</p>
                    </div>
                    <Download className="w-5 h-5 text-secondary" />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep('verify')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg"
              >
                I've Added the Account
              </button>
            </div>
          )}

          {step === 'verify' && (
            <div className="space-y-8">
              <div className="text-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                  isDark 
                    ? 'bg-gradient-to-br from-green-900/50 to-emerald-900/50 border border-green-500/20' 
                    : 'bg-gradient-to-br from-green-100 to-emerald-100 border border-green-200'
                }`}>
                  <Key className={`w-10 h-10 ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  }`} />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">Verify Setup</h3>
                <p className="text-secondary leading-relaxed">
                  Enter the 6-digit verification code from your authenticator app to complete setup
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-primary">Verification Code</label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    className={`w-full px-4 py-4 text-center text-3xl font-mono tracking-[0.5em] rounded-xl border-2 transition-all ${
                      verificationCode.length === 6
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : isDark
                          ? 'border-gray-600 bg-gray-800 focus:border-purple-500'
                          : 'border-gray-300 bg-white focus:border-purple-500'
                    } focus:outline-none focus:ring-0`}
                    maxLength={6}
                    autoComplete="off"
                  />
                  <p className="text-xs text-secondary text-center">
                    Code refreshes every 30 seconds
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('setup')}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                      isDark 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleVerify}
                    disabled={verificationCode.length !== 6}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    Verify & Enable
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">2FA Enabled Successfully!</h3>
                <p className="text-secondary leading-relaxed">
                  Your account is now protected with two-factor authentication
                </p>
              </div>

              {/* Backup Codes */}
              <div className={`p-6 rounded-2xl border-2 ${
                isDark 
                  ? 'bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-600/30' 
                  : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-bold text-yellow-800 dark:text-yellow-200">
                    Important: Save Your Backup Codes
                  </h4>
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-4 leading-relaxed">
                  Store these codes in a secure location. Each code can only be used once to access your account if you lose your authenticator device.
                </p>
                <div className="space-y-2">
                  {backupCodes.map((code, index) => (
                    <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
                      isDark ? 'bg-gray-800' : 'bg-white'
                    } border`}>
                      <span className="text-xs text-secondary w-4">#{index + 1}</span>
                      <code className="flex-1 font-mono text-sm text-primary">{code}</code>
                      <button
                        onClick={() => copyToClipboard(code, 'backup')}
                        className={`px-2 py-1 rounded text-xs transition-all ${
                          copiedBackup === code
                            ? 'bg-green-500 text-white'
                            : isDark
                              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                        }`}
                      >
                        {copiedBackup === code ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg"
              >
                Complete Setup
              </button>
            </div>
          )}

          {isEnabled && step === 'setup' && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">2FA is Active</h3>
                <p className="text-secondary leading-relaxed">
                  Your account is currently protected with two-factor authentication
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setStep('disable')}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg"
                >
                  Disable Two-Factor Authentication
                </button>
                <button
                  onClick={onClose}
                  className={`w-full py-3 rounded-xl font-medium transition-all ${
                    isDark 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {step === 'disable' && (
            <div className="space-y-8">
              <div className="text-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                  isDark 
                    ? 'bg-gradient-to-br from-red-900/50 to-red-900/50 border border-red-500/20' 
                    : 'bg-gradient-to-br from-red-100 to-red-100 border border-red-200'
                }`}>
                  <AlertCircle className={`w-10 h-10 ${
                    isDark ? 'text-red-400' : 'text-red-600'
                  }`} />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">Disable Two-Factor Authentication</h3>
                <p className="text-secondary leading-relaxed">
                  Enter a verification code from your authenticator app to disable 2FA protection
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-primary">Verification Code</label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    className={`w-full px-4 py-4 text-center text-3xl font-mono tracking-[0.5em] rounded-xl border-2 transition-all ${
                      isDark
                        ? 'border-gray-600 bg-gray-800 focus:border-red-500'
                        : 'border-gray-300 bg-white focus:border-red-500'
                    } focus:outline-none focus:ring-0`}
                    maxLength={6}
                    autoComplete="off"
                  />
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={onClose}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                      isDark 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDisable}
                    disabled={verificationCode.length !== 6}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    Disable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};