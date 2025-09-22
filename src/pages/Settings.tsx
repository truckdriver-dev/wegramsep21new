import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    themeColor: 'Blue',
    fontSize: 'Medium',
    darkMode: true,
    compactMode: false,
    messageNotifications: true,
    soundNotifications: true,
    vibration: true,
    groupNotifications: true,
    onlineStatus: true,
    readReceipts: true,
    typingIndicators: true,
    autoDownloadMedia: false,
    sendWithEnter: true,
    autoSaveMedia: false,
    messagePreview: true
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSelect = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const ToggleSwitch = ({ isOn, onChange }: { isOn: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full transition-colors ${
        isOn ? 'bg-accent' : 'bg-overlay-light'
      }`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full transition-transform ${
          isOn ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      />
    </button>
  );

  const DropdownButton = ({ value, options, onChange }: { value: string; options: string[]; onChange: (value: string) => void }) => (
    <button
      onClick={() => {
        const currentIndex = options.indexOf(value);
        const nextIndex = (currentIndex + 1) % options.length;
        onChange(options[nextIndex]);
      }}
      className="flex items-center gap-2 px-3 py-2 bg-overlay-light rounded-lg text-primary"
    >
      <span>{value}</span>
      <ChevronDown className="w-4 h-4" />
    </button>
  );

  const SettingItem = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-primary">{label}</span>
      {children}
    </div>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <h3 className="text-accent font-bold text-sm uppercase tracking-wide mb-4 mt-6 first:mt-0">
      {title}
    </h3>
  );

  const NavigationItem = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="flex items-center justify-between py-3 w-full"
    >
      <span className="text-primary">{label}</span>
      <ChevronRight className="w-4 h-4 text-secondary" />
    </button>
  );

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
        <h1 className="text-lg font-bold text-primary">Settings</h1>
      </div>

      <div className="px-4 py-6">
        {/* APPEARANCE Section */}
        <SectionHeader title="APPEARANCE" />
        <div className="space-y-1">
          <SettingItem label="Theme Color">
            <DropdownButton
              value={settings.themeColor}
              options={['Blue', 'Purple', 'Green', 'Red']}
              onChange={(value) => handleSelect('themeColor', value)}
            />
          </SettingItem>
          <SettingItem label="Font Size">
            <DropdownButton
              value={settings.fontSize}
              options={['Small', 'Medium', 'Large']}
              onChange={(value) => handleSelect('fontSize', value)}
            />
          </SettingItem>
          <SettingItem label="Dark Mode">
            <ToggleSwitch
              isOn={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
            />
          </SettingItem>
          <SettingItem label="Compact Mode">
            <ToggleSwitch
              isOn={settings.compactMode}
              onChange={() => handleToggle('compactMode')}
            />
          </SettingItem>
        </div>

        {/* NOTIFICATIONS Section */}
        <SectionHeader title="NOTIFICATIONS" />
        <div className="space-y-1">
          <SettingItem label="Message Notifications">
            <ToggleSwitch
              isOn={settings.messageNotifications}
              onChange={() => handleToggle('messageNotifications')}
            />
          </SettingItem>
          <SettingItem label="Sound Notifications">
            <ToggleSwitch
              isOn={settings.soundNotifications}
              onChange={() => handleToggle('soundNotifications')}
            />
          </SettingItem>
          <SettingItem label="Vibration">
            <ToggleSwitch
              isOn={settings.vibration}
              onChange={() => handleToggle('vibration')}
            />
          </SettingItem>
          <SettingItem label="Group Notifications">
            <ToggleSwitch
              isOn={settings.groupNotifications}
              onChange={() => handleToggle('groupNotifications')}
            />
          </SettingItem>
        </div>

        {/* PRIVACY & SECURITY Section */}
        <SectionHeader title="PRIVACY & SECURITY" />
        <div className="space-y-1">
          <SettingItem label="Online Status">
            <ToggleSwitch
              isOn={settings.onlineStatus}
              onChange={() => handleToggle('onlineStatus')}
            />
          </SettingItem>
          <SettingItem label="Read Receipts">
            <ToggleSwitch
              isOn={settings.readReceipts}
              onChange={() => handleToggle('readReceipts')}
            />
          </SettingItem>
          <SettingItem label="Typing Indicators">
            <ToggleSwitch
              isOn={settings.typingIndicators}
              onChange={() => handleToggle('typingIndicators')}
            />
          </SettingItem>
          <SettingItem label="Auto-Download Media">
            <ToggleSwitch
              isOn={settings.autoDownloadMedia}
              onChange={() => handleToggle('autoDownloadMedia')}
            />
          </SettingItem>
          <NavigationItem label="Blocked Users" onClick={() => console.log('Navigate to blocked users')} />
        </div>

        {/* CHAT SETTINGS Section */}
        <SectionHeader title="CHAT SETTINGS" />
        <div className="space-y-1">
          <SettingItem label="Send with Enter">
            <ToggleSwitch
              isOn={settings.sendWithEnter}
              onChange={() => handleToggle('sendWithEnter')}
            />
          </SettingItem>
          <SettingItem label="Auto-Save Media">
            <ToggleSwitch
              isOn={settings.autoSaveMedia}
              onChange={() => handleToggle('autoSaveMedia')}
            />
          </SettingItem>
          <SettingItem label="Message Preview">
            <ToggleSwitch
              isOn={settings.messagePreview}
              onChange={() => handleToggle('messagePreview')}
            />
          </SettingItem>
          <NavigationItem label="Chat Backups" onClick={() => console.log('Navigate to chat backups')} />
        </div>

        {/* ACCOUNT Section */}
        <SectionHeader title="ACCOUNT" />
        <div className="space-y-1">
          <NavigationItem label="Edit Profile" onClick={() => navigate('/profile/edit')} />
          <NavigationItem label="Change Username" onClick={() => console.log('Navigate to change username')} />
          <NavigationItem label="Active Sessions" onClick={() => console.log('Navigate to active sessions')} />
          <NavigationItem label="Export Data" onClick={() => console.log('Navigate to export data')} />
        </div>

        {/* ADVANCED Section */}
        <SectionHeader title="ADVANCED" />
        <div className="space-y-1">
          <NavigationItem label="Storage Usage" onClick={() => console.log('Navigate to storage usage')} />
          <NavigationItem label="About NeoChat" onClick={() => console.log('Navigate to about')} />
          <button className="flex items-center justify-between py-3 w-full text-red-400">
            <span>Clear All Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
