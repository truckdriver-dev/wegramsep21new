import React, { useState } from 'react';
import { Search, Camera, Plus, Archive, Video, Phone, MoreHorizontal } from 'lucide-react';

interface Message {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  avatarColor: string;
  preview: string;
  time: string;
  unread: number;
  isOnline: boolean;
  isPinned: boolean;
  hasVideo?: boolean;
  hasSticker?: boolean;
  hasPhoto?: boolean;
  isDeleted?: boolean;
  isGroup?: boolean;
  groupMembers?: number;
}

export const Messages: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'favorites' | 'groups'>('all');

  const mockMessages: Message[] = [
    {
      id: '1',
      username: '@crypto_whale',
      displayName: 'Crypto Whale 💎',
      avatar: 'CW',
      avatarColor: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      preview: 'Just bought 1000 SOL! This dip is a gift 🚀',
      time: '00:29',
      unread: 0,
      isOnline: true,
      isPinned: true
    },
    {
      id: '2',
      username: '@defi_queen',
      displayName: 'DeFi Queen 👑💜💖💎❤️',
      avatar: 'DQ',
      avatarColor: 'bg-gradient-to-br from-purple-500 to-pink-500',
      preview: '📹 Video call • In call',
      time: '01:29',
      unread: 0,
      isOnline: true,
      isPinned: true,
      hasVideo: true
    },
    {
      id: '3',
      username: '@solana_dev',
      displayName: 'Solana Dev',
      avatar: 'SD',
      avatarColor: 'bg-gradient-to-br from-green-500 to-emerald-500',
      preview: '✅ That new smart contract is deployed! The gas fees are so low compared to Ethereum...',
      time: '01:19',
      unread: 2,
      isOnline: false,
      isPinned: false
    },
    {
      id: '4',
      username: '@nft_artist',
      displayName: 'NFT Artist ❤️',
      avatar: 'NA',
      avatarColor: 'bg-gradient-to-br from-orange-500 to-red-500',
      preview: '🎨 Sticker',
      time: '00:12',
      unread: 0,
      isOnline: true,
      isPinned: false,
      hasSticker: true
    },
    {
      id: '5',
      username: '@web3_builder',
      displayName: 'Web3 Builder ❤️',
      avatar: 'WB',
      avatarColor: 'bg-gradient-to-br from-cyan-500 to-blue-500',
      preview: '🎨 Sticker',
      time: 'Yesterday',
      unread: 0,
      isOnline: false,
      isPinned: false,
      hasSticker: true
    },
    {
      id: '6',
      username: '@wegram_community',
      displayName: 'WEGRAM Community Group',
      avatar: 'WC',
      avatarColor: 'bg-gradient-to-br from-purple-600 to-purple-800',
      preview: '+234 new members joined using invite link.',
      time: 'Yesterday',
      unread: 7,
      isOnline: false,
      isPinned: false,
      isGroup: true,
      groupMembers: 1247
    },
    {
      id: '7',
      username: '@dao_governance',
      displayName: 'DAO GOVERNANCE CHAT',
      avatar: 'DG',
      avatarColor: 'bg-gradient-to-br from-yellow-500 to-orange-500',
      preview: 'Proposal #42: 📷 Photo',
      time: 'Yesterday',
      unread: 0,
      isOnline: false,
      isPinned: false,
      hasPhoto: true,
      isGroup: true,
      groupMembers: 892
    },
    {
      id: '8',
      username: '@trading_bot',
      displayName: 'Trading Bot',
      avatar: 'TB',
      avatarColor: 'bg-gradient-to-br from-red-500 to-pink-500',
      preview: '🗑️ You deleted this message.',
      time: 'Yesterday',
      unread: 0,
      isOnline: false,
      isPinned: false,
      isDeleted: true
    },
    {
      id: '9',
      username: '@yield_farmer',
      displayName: 'Yield Farmer 😭❤️',
      avatar: 'YF',
      avatarColor: 'bg-gradient-to-br from-green-600 to-lime-500',
      preview: 'GM! Ready for another day of farming? 🌾',
      time: 'Yesterday',
      unread: 0,
      isOnline: true,
      isPinned: false
    }
  ];

  const filters = [
    { id: 'all', label: 'All', count: 0 },
    { id: 'unread', label: 'Unread', count: 4 },
    { id: 'favorites', label: 'Favorites', count: 0 },
    { id: 'groups', label: 'Groups', count: 1 }
  ];

  const filteredMessages = mockMessages.filter(message => {
    switch (activeFilter) {
      case 'unread':
        return message.unread > 0;
      case 'favorites':
        return message.isPinned;
      case 'groups':
        return message.isGroup;
      default:
        return true;
    }
  });

  const totalUnread = mockMessages.reduce((sum, msg) => sum + msg.unread, 0);
  const archivedCount = 12;

  return (
    <div className="max-w-md mx-auto pt-20 pb-24" style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5 text-secondary" />
            </button>
            <h1 className="text-2xl font-bold text-primary">Chats</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <Camera className="w-5 h-5 text-secondary" />
            </button>
            <button className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center hover:scale-105 transition-transform">
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search messages..."
            className="input pl-10 pr-4 bg-gray-800 bg-opacity-50"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 min-w-fit ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                  : 'bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {filter.label}
              {filter.count > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-white bg-opacity-20 rounded-full text-xs">
                  {filter.count}
                </span>
              )}
            </button>
          ))}
          <button className="w-10 h-10 rounded-full bg-gray-700 bg-opacity-50 flex items-center justify-center hover:bg-gray-600 transition-colors flex-shrink-0">
            <Plus className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        {/* Archived */}
        <div className="flex items-center justify-between py-3 px-1 hover:bg-gray-800 hover:bg-opacity-30 rounded-lg transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <Archive className="w-5 h-5 text-gray-400" />
            <span className="text-primary font-medium">Archived</span>
          </div>
          <span className="text-secondary text-sm">{archivedCount}</span>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-1">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className="flex items-center gap-3 p-4 hover:bg-gray-800 hover:bg-opacity-30 transition-colors cursor-pointer relative"
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className={`w-12 h-12 rounded-full ${message.avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                {message.avatar}
              </div>
              {message.isOnline && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-gray-900"></div>
              )}
            </div>

            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-primary truncate pr-2">{message.displayName}</h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-secondary">{message.time}</span>
                  {message.isPinned && (
                    <div className="w-4 h-4 text-gray-400">📌</div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {message.hasVideo && (
                    <Video className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  )}
                  {message.hasSticker && (
                    <span className="text-sm flex-shrink-0">🎨</span>
                  )}
                  {message.hasPhoto && (
                    <Camera className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  )}
                  <p className={`text-sm truncate ${message.isDeleted ? 'text-gray-500 italic' : 'text-secondary'}`}>
                    {message.preview}
                  </p>
                </div>
                {message.unread > 0 && (
                  <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                    <span className="text-white text-xs font-bold">{message.unread}</span>
                  </div>
                )}
              </div>
              {message.isGroup && message.groupMembers && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-gray-500">{message.groupMembers.toLocaleString()} members</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMessages.length === 0 && (
        <div className="text-center py-12 px-4">
          <div className="w-16 h-16 rounded-full bg-gray-700 bg-opacity-50 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-primary font-semibold mb-2">No messages found</h3>
          <p className="text-secondary text-sm">
            {activeFilter === 'unread' && 'No unread messages'}
            {activeFilter === 'favorites' && 'No favorite chats'}
            {activeFilter === 'groups' && 'No group chats'}
          </p>
        </div>
      )}
    </div>
  );
};