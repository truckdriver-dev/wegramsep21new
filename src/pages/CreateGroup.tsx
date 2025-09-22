import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Camera, ChevronDown, Check } from 'lucide-react';

export const CreateGroup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    tags: 'crypto, trading, bitcoin',
    memberLimit: '500 members',
    privacy: 'public',
    mediaSharing: true,
    voiceMessages: true,
    pollsVoting: false,
    botIntegration: false,
    autoModeration: true,
    slowMode: false,
    messageApproval: false
  });

  const categories = ['Technology', 'Crypto', 'Trading', 'Gaming', 'Art', 'Music', 'Sports', 'Education'];
  const memberLimits = ['100 members', '500 members', '1000 members', '5000 members', '200,000 members'];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Create group logic here
      console.log('Creating group:', formData);
      navigate('/messages');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/create-new');
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Add Photo */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-pink-500 flex items-center justify-center">
          <Camera className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-primary font-semibold text-lg">Add Photo</h3>
          <p className="text-secondary text-sm">Choose a profile picture for your group</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-primary font-semibold mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter group name"
            className="w-full px-4 py-3 bg-overlay-light rounded-lg text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-primary font-semibold mb-2">Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="What is your group about?"
            className="w-full px-4 py-3 bg-overlay-light rounded-lg text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-primary font-semibold mb-2">Category</label>
          <div className="relative">
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-4 py-3 bg-overlay-light rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-primary font-semibold mb-2">Tags (comma separated)</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => handleInputChange('tags', e.target.value)}
          className="w-full px-4 py-3 bg-overlay-light rounded-lg text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div>
        <label className="block text-primary font-semibold mb-2">Member Limit</label>
        <div className="relative">
          <select
            value={formData.memberLimit}
            onChange={(e) => handleInputChange('memberLimit', e.target.value)}
            className="w-full px-4 py-3 bg-overlay-light rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
          >
            {memberLimits.map(limit => (
              <option key={limit} value={limit}>{limit}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
        </div>
      </div>

      <div>
        <h3 className="text-primary font-semibold mb-4">Privacy Settings</h3>
        <div className="space-y-3">
          {[
            { value: 'public', label: 'Public', description: 'Anyone can find this group in search and join' },
            { value: 'private', label: 'Private', description: 'Only invited members can find and join this group' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => handleInputChange('privacy', option.value)}
              className={`w-full p-4 rounded-lg text-left transition-colors ${
                formData.privacy === option.value ? 'bg-accent bg-opacity-20 border border-accent' : 'bg-overlay-light'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData.privacy === option.value ? 'border-accent bg-accent' : 'border-secondary'
                }`}>
                  {formData.privacy === option.value && <Check className="w-3 h-3 text-white" />}
                </div>
                <div>
                  <div className="text-primary font-semibold">{option.label}</div>
                  <div className="text-secondary text-sm">{option.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-primary font-semibold mb-4">Group Features</h3>
        <div className="space-y-4">
          {[
            { key: 'mediaSharing', label: 'Media Sharing', description: 'Allow members to share images, videos, and files' },
            { key: 'voiceMessages', label: 'Voice Messages', description: 'Enable voice message recording and playback' },
            { key: 'pollsVoting', label: 'Polls & Voting', description: 'Allow members to create polls and vote' },
            { key: 'botIntegration', label: 'Bot Integration', description: 'Enable bots and automated features' }
          ].map(feature => (
            <div key={feature.key} className="flex items-start gap-3">
              <button
                onClick={() => handleInputChange(feature.key, !formData[feature.key as keyof typeof formData])}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                  formData[feature.key as keyof typeof formData] ? 'border-accent bg-accent' : 'border-secondary'
                }`}
              >
                {formData[feature.key as keyof typeof formData] && <Check className="w-3 h-3 text-white" />}
              </button>
              <div className="flex-1">
                <div className="text-primary font-semibold">{feature.label}</div>
                <div className="text-secondary text-sm">{feature.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-primary font-semibold mb-4">Moderation Settings</h3>
        <div className="space-y-4">
          {[
            { key: 'autoModeration', label: 'Auto Moderation', description: 'Automatically filter spam and inappropriate content' },
            { key: 'slowMode', label: 'Slow Mode', description: 'Limit how often members can send messages' },
            { key: 'messageApproval', label: 'Message Approval', description: 'Require admin approval for new member messages' }
          ].map(feature => (
            <div key={feature.key} className="flex items-start gap-3">
              <button
                onClick={() => handleInputChange(feature.key, !formData[feature.key as keyof typeof formData])}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                  formData[feature.key as keyof typeof formData] ? 'border-accent bg-accent' : 'border-secondary'
                }`}
              >
                {formData[feature.key as keyof typeof formData] && <Check className="w-3 h-3 text-white" />}
              </button>
              <div className="flex-1">
                <div className="text-primary font-semibold">{feature.label}</div>
                <div className="text-secondary text-sm">{feature.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto" style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-opacity-95 backdrop-blur-sm px-4 py-3 flex items-center gap-3" style={{ backgroundColor: 'var(--bg)' }}>
        <button
          onClick={handleBack}
          className="p-2 rounded-lg transition-colors hover:bg-overlay-light"
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </button>
        <h1 className="text-lg font-bold text-primary">New Group</h1>
        <button
          onClick={() => navigate('/messages')}
          className="ml-auto p-2 rounded-lg transition-colors hover:bg-overlay-light"
        >
          <X className="w-5 h-5 text-primary" />
        </button>
      </div>

      <div className="px-4 py-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={handleBack}
            className="flex-1 py-3 px-6 bg-overlay-light text-primary rounded-lg font-medium transition-colors hover:bg-overlay-medium"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex-1 py-3 px-6 btn-primary"
          >
            {step === 3 ? 'Create Group' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};
