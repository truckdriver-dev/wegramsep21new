import React, { useState } from 'react';
import { X, Shield, Smartphone, Key, CheckCircle, QrCode, Copy, AlertCircle } from 'lucide-react';
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
  const [backupCodes] = useState([
    'BACKUP-1234-5678',
    'BACKUP-9876-5432', 
    'BACKUP-4567-8901',
    'BACKUP-2345-6789',
    'BACKUP-7890-1234'
  ]);

  const secretKey = 'JBSWY3DPEHPK3PXP'; // Mock secret key

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal */}
      <div className={`relative max-w-md w-full m-4 rounded-xl shadow-xl ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-primary">Two-Factor Authentication</h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'setup' && !isEnabled && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Secure Your Account</h3>
                <p className="text-secondary text-sm">
                  Add an extra layer of security to your WEGRAM account with 2FA authentication.
                </p>
              </div>

              {/* QR Code Section */}
              <div className={`p-4 rounded-lg border-2 border-dashed ${
                isDark ? 'border-gray-600 bg-gray-900' : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="text-center">
                  <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                    <QrCode className="w-24 h-24 text-gray-800" />
                  </div>
                  <p className="text-sm text-secondary mb-3">
                    Scan this QR code with your authenticator app
                  </p>
                  <div className={`p-3 rounded-lg ${
                    isDark ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    <p className="text-xs text-secondary mb-2">Manual Setup Key:</p>
                    <div className="flex items-center justify-between">
                      <code className="text-xs font-mono text-primary">{secretKey}</code>
                      <button
                        onClick={() => copyToClipboard(secretKey)}
                        className="p-1 hover:bg-gray-600 rounded transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-primary">Recommended Apps:</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-lg ${
                    isDark ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <p className="text-sm font-medium text-primary">Google Authenticator</p>
                    <p className="text-xs text-secondary">iOS & Android</p>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    isDark ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <p className="text-sm font-medium text-primary">Authy</p>
                    <p className="text-xs text-secondary">Cross-platform</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep('verify')}
                className="w-full btn-primary py-3"
              >
                Continue to Verification
              </button>
            </div>
          )}

          {step === 'verify' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Enter Verification Code</h3>
                <p className="text-secondary text-sm">
                  Enter the 6-digit code from your authenticator app
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="input text-center text-2xl font-mono tracking-widest"
                  maxLength={6}
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('setup')}
                    className="flex-1 btn-secondary py-3"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleVerify}
                    disabled={verificationCode.length !== 6}
                    className="flex-1 btn-primary py-3 disabled:opacity-50"
                  >
                    Verify & Enable
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">2FA Enabled Successfully!</h3>
                <p className="text-secondary text-sm">
                  Your account is now protected with two-factor authentication
                </p>
              </div>

              {/* Backup Codes */}
              <div className={`p-4 rounded-lg ${
                isDark ? 'bg-yellow-900 bg-opacity-30 border border-yellow-600' : 'bg-yellow-50 border border-yellow-300'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Backup Codes</h4>
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                  Save these codes in a safe place. You can use them to access your account if you lose your device.
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {backupCodes.map((code, index) => (
                    <div key={index} className={`p-2 rounded ${
                      isDark ? 'bg-gray-800' : 'bg-white'
                    } flex items-center justify-between`}>
                      <code className="text-sm font-mono text-primary">{code}</code>
                      <button
                        onClick={() => copyToClipboard(code)}
                        className="p-1 hover:bg-gray-600 rounded transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full btn-primary py-3"
              >
                Done
              </button>
            </div>
          )}

          {step === 'disable' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Disable Two-Factor Authentication</h3>
                <p className="text-secondary text-sm">
                  Enter a verification code to disable 2FA on your account
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="input text-center text-2xl font-mono tracking-widest"
                  maxLength={6}
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 btn-secondary py-3"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDisable}
                    disabled={verificationCode.length !== 6}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium disabled:opacity-50 transition-colors"
                  >
                    Disable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {isEnabled && step === 'setup' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">2FA is Enabled</h3>
                <p className="text-secondary text-sm">
                  Your account is protected with two-factor authentication
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setStep('disable')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Disable Two-Factor Authentication
                </button>
                <button
                  onClick={onClose}
                  className="w-full btn-secondary py-3"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};