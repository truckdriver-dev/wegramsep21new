import React, { useState } from 'react';
import { X as CloseIcon, Key, Clock, CreditCard, CheckCircle } from 'lucide-react';
import { useTrialMode } from '../../hooks/useTrialMode';

interface ProductKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProductKeyModal: React.FC<ProductKeyModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'code' | 'explanation' | 'success'>('code');
  const [code, setCode] = useState('');
  const [productKey, setProductKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { daysRemaining, isActivated, activateProduct } = useTrialMode();

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '1234') {
      setStep('explanation');
    } else {
      alert('Invalid code. Please enter 1234 to continue.');
    }
  };

  const handleProductKeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate product key validation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (productKey === 'WEGRAM-PRO-2024') {
      setStep('success');
      activateProduct(productKey);
    } else {
      alert('Invalid product key. Please contact support for a valid key.');
    }
    
    setIsLoading(false);
  };

  const resetModal = () => {
    setStep('code');
    setCode('');
    setProductKey('');
    setIsLoading(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-75" onClick={handleClose} />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden min-w-[400px] max-w-[500px] mx-4" style={{ backgroundColor: 'var(--card)' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <Key className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">Product Activation</h2>
              <p className="text-secondary text-sm">Wegram License Management</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <CloseIcon className="w-5 h-5 text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'code' && (
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Enter Access Code</h3>
              <p className="text-secondary mb-6">
                Please enter the access code to view product information.
              </p>
              
              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Access Code
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter access code"
                    className="input w-full"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn-primary w-full py-3"
                >
                  Continue
                </button>
              </form>
            </div>
          )}

          {step === 'explanation' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">Trial Mode Active</h3>
                  <p className="text-secondary text-sm">{daysRemaining} days remaining</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg)' }}>
                  <h4 className="font-semibold text-primary mb-2">Current Status</h4>
                  <p className="text-secondary text-sm">
                    Your Wegram instance is currently running in <strong>trial mode</strong> with limited functionality.
                  </p>
                </div>

                <div className="p-4 rounded-lg border-2 border-orange-500">
                  <h4 className="font-semibold text-orange-600 mb-2">⚠️ Trial Limitations</h4>
                  <ul className="text-sm text-secondary space-y-1">
                    <li>• Limited to 100 posts per day</li>
                    <li>• Basic analytics only</li>
                    <li>• No custom branding</li>
                    <li>• Limited customer support</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg border-2 border-green-500">
                  <h4 className="font-semibold text-green-600 mb-2">✅ Full Version Benefits</h4>
                  <ul className="text-sm text-secondary space-y-1">
                    <li>• Unlimited posts and features</li>
                    <li>• Advanced analytics dashboard</li>
                    <li>• Custom branding and themes</li>
                    <li>• Priority customer support</li>
                    <li>• API access and integrations</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg)' }}>
                  <CreditCard className="w-6 h-6 text-blue-500" />
                  <div>
                    <h4 className="font-semibold text-primary">Payment Required</h4>
                    <p className="text-secondary text-sm">
                      To activate the full version, please complete payment and receive your product key.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleProductKeySubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Product Key
                    </label>
                    <input
                      type="text"
                      value={productKey}
                      onChange={(e) => setProductKey(e.target.value)}
                      placeholder="Enter your product key"
                      className="input w-full"
                      required
                    />
                    <p className="text-xs text-secondary mt-1">
                      Enter the product key provided after payment completion.
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Activating...' : 'Activate Full Version'}
                  </button>
                </form>

                <div className="text-center">
                  <button
                    onClick={() => setStep('code')}
                    className="text-sm text-secondary hover:text-primary transition-colors"
                  >
                    ← Back to Access Code
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Activation Successful!</h3>
              <p className="text-secondary mb-6">
                Your Wegram instance has been upgraded to the full version. All features are now unlocked!
              </p>
              <button
                onClick={handleClose}
                className="btn-primary px-6 py-3"
              >
                Continue to Wegram
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs text-secondary text-center">
            Need help? Contact support at support@wegram.com
          </p>
        </div>
      </div>
    </div>
  );
};
