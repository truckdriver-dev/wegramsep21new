import React, { useState } from 'react';
import { CheckCircle, Star, Shield, Zap, Crown, ArrowRight, Copy, Check } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface VerificationTier {
  id: string;
  name: string;
  icon: React.ElementType;
  price: string;
  benefits: string[];
  color: string;
  popular?: boolean;
}

export const Verification: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedTier, setSelectedTier] = useState<string>('blue');
  const [paymentStep, setPaymentStep] = useState<'select' | 'payment' | 'processing' | 'success'>('select');
  const [copiedAddress, setCopiedAddress] = useState(false);

  const verificationTiers: VerificationTier[] = [
    {
      id: 'blue',
      name: 'Blue Verified',
      icon: CheckCircle,
      price: '50',
      color: 'blue',
      benefits: [
        'Blue verification badge',
        'Priority customer support',
        'Increased posting limits',
        'Basic analytics access'
      ]
    },
    {
      id: 'creator',
      name: 'Creator Verified',
      icon: Star,
      price: '150',
      color: 'purple',
      popular: true,
      benefits: [
        'Purple creator badge',
        'Advanced analytics dashboard',
        'Monetization tools access',
        'Priority content promotion',
        'Custom profile themes',
        'Direct message privileges'
      ]
    },
    {
      id: 'business',
      name: 'Business Verified',
      icon: Crown,
      price: '300',
      color: 'gold',
      benefits: [
        'Gold business badge',
        'Company profile features',
        'Advertisement privileges',
        'API access for integrations',
        'Dedicated account manager',
        'Advanced security features',
        'White-label options'
      ]
    }
  ];

  const selectedVerification = verificationTiers.find(tier => tier.id === selectedTier);

  const handleConnectWallet = () => {
    setTimeout(() => setPaymentStep('payment'), 1000);
  };

  const handlePayment = () => {
    setPaymentStep('processing');
    setTimeout(() => setPaymentStep('success'), 3000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText('WGM7xK4pJh2mR8qN5vL9cX3tY6wE1oP4qR9mL3v');
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-20 pb-24">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-bg flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-primary mb-2">Get Verified on WEGRAM</h1>
        <p className="text-secondary max-w-2xl mx-auto">
          Join thousands of verified creators and businesses. Enhance your credibility, unlock exclusive features, and grow your presence with WGM token-powered verification.
        </p>
      </div>

      {paymentStep === 'select' && (
        <>
          {/* Verification Tiers */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {verificationTiers.map((tier) => {
              const Icon = tier.icon;
              const isSelected = selectedTier === tier.id;
              
              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    isSelected ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className={`card h-full ${isSelected ? 'border-purple-500' : ''}`}>
                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                        tier.color === 'blue' ? 'bg-blue-500 bg-opacity-20' :
                        tier.color === 'purple' ? 'bg-purple-500 bg-opacity-20' :
                        'bg-yellow-500 bg-opacity-20'
                      }`}>
                        <Icon className={`w-8 h-8 ${
                          tier.color === 'blue' ? 'text-blue-400' :
                          tier.color === 'purple' ? 'text-purple-400' :
                          'text-yellow-400'
                        }`} />
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-2">{tier.name}</h3>
                      <div className="text-3xl font-bold gradient-text mb-1">{tier.price} WGM</div>
                      <div className="text-secondary text-sm">One-time payment</div>
                    </div>
                    
                    <div className="space-y-3">
                      {tier.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-secondary text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Tier Summary */}
          {selectedVerification && (
            <div className="card mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedVerification.color === 'blue' ? 'bg-blue-500 bg-opacity-20' :
                    selectedVerification.color === 'purple' ? 'bg-purple-500 bg-opacity-20' :
                    'bg-yellow-500 bg-opacity-20'
                  }`}>
                    <selectedVerification.icon className={`w-6 h-6 ${
                      selectedVerification.color === 'blue' ? 'text-blue-400' :
                      selectedVerification.color === 'purple' ? 'text-purple-400' :
                      'text-yellow-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{selectedVerification.name}</h3>
                    <p className="text-secondary text-sm">One-time verification fee</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold gradient-text">{selectedVerification.price} WGM</div>
                  <div className="text-secondary text-sm">≈ $15.00 USD</div>
                </div>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <div className="text-center">
            <button
              onClick={handleConnectWallet}
              className="btn-primary px-8 py-3 text-lg font-semibold inline-flex items-center gap-2"
            >
              Continue to Payment
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}

      {paymentStep === 'payment' && (
        <div className="max-w-md mx-auto">
          <div className="card">
            <div className="text-center mb-6">
              <Shield className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-semibold text-primary mb-2">Complete Payment</h3>
              <p className="text-secondary text-sm">
                Send exactly {selectedVerification?.price} WGM to the address below to complete your verification
              </p>
            </div>

            {/* Payment Details */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-secondary text-sm mb-2">Amount to Send</label>
                <div className="p-3 bg-overlay-light rounded-lg">
                  <div className="text-xl font-bold text-primary">{selectedVerification?.price} WGM</div>
                </div>
              </div>

              <div>
                <label className="block text-secondary text-sm mb-2">Payment Address</label>
                <div className="p-3 bg-overlay-light rounded-lg flex items-center justify-between">
                  <code className="text-primary text-sm">WGM7xK4pJh2mR8qN5vL9cX3tY6wE1oP4qR9mL3v</code>
                  <button
                    onClick={handleCopyAddress}
                    className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    {copiedAddress ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="p-4 bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg mb-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-400 mb-1">Important</div>
                  <div className="text-secondary text-sm">
                    Only send WGM tokens to this address. Sending other tokens will result in permanent loss.
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full btn-primary py-3 font-semibold"
            >
              I've Sent the Payment
            </button>
          </div>
        </div>
      )}

      {paymentStep === 'processing' && (
        <div className="text-center max-w-md mx-auto">
          <div className="card">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center animate-pulse">
              <Zap className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">Processing Payment</h3>
            <p className="text-secondary mb-6">
              We're verifying your transaction on the blockchain. This usually takes 1-2 minutes.
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full animate-pulse" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
      )}

      {paymentStep === 'success' && (
        <div className="text-center max-w-md mx-auto">
          <div className="card">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">Verification Complete!</h3>
            <p className="text-secondary mb-6">
              Congratulations! Your {selectedVerification?.name} badge has been added to your profile.
            </p>
            <button
              onClick={() => window.location.href = '/home'}
              className="w-full btn-primary py-3 font-semibold"
            >
              Return to Home
            </button>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      {paymentStep === 'select' && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-primary text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h4 className="font-semibold text-primary mb-2">Why do I need to pay WGM tokens?</h4>
              <p className="text-secondary text-sm">
                WGM token payments help prevent spam and ensure that verified accounts are legitimate contributors to the WEGRAM ecosystem.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary mb-2">How long does verification take?</h4>
              <p className="text-secondary text-sm">
                Once payment is confirmed on the blockchain, your verification badge is instantly applied to your profile.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary mb-2">Can I upgrade my verification tier?</h4>
              <p className="text-secondary text-sm">
                Yes! You can upgrade to a higher tier by paying the difference in WGM tokens at any time.
              </p>
            </div>
            <div className="card">
              <h4 className="font-semibold text-primary mb-2">What if I lose my verification badge?</h4>
              <p className="text-secondary text-sm">
                Verification badges are permanent as long as you follow WEGRAM's community guidelines and terms of service.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};