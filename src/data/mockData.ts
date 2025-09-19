// Mock data for the prototype - easily replaceable with database calls

export interface User {
  id: string;
  username: string;
  email?: string;
  isAuthenticated: boolean;
  balance: number;
  assets: Asset[];
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  shares: number;
  gifts?: number;
}

export interface Asset {
  symbol: string;
  name: string;
  balance: number;
  logo?: string;
}

export interface Reward {
  id: string;
  title: string;
  amount: string;
  type: 'daily' | 'invite' | 'task';
  claimed: boolean;
}

// Mock user data
export const mockUser: User = {
  id: '1',
  username: '@demo_user',
  email: 'demo@wegram.com',
  isAuthenticated: false,
  balance: 1234.56,
  assets: [
    { symbol: 'WGM', name: 'Wegram', balance: 820.14 },
    { symbol: 'USDT', name: 'Tether', balance: 240.2 },
    { symbol: 'BTC', name: 'Bitcoin', balance: 0.0123 },
    { symbol: 'ETH', name: 'Ethereum', balance: 1.45 }
  ]
};

// Mock posts data
export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    username: '@crypto_trader',
    content: 'Up 40% since I joined WEGRAM 🚀 — real web3 experience!',
    timestamp: '2h',
    likes: 24,
    replies: 8,
    shares: 5,
    gifts: 2
  },
  {
    id: '2',
    userId: '2',
    username: '@defi_expert',
    content: 'The future of social media is here. Earning while posting has never been this easy! #Web3 #SocialFi',
    timestamp: '4h',
    likes: 156,
    replies: 32,
    shares: 18,
    gifts: 7
  },
  {
    id: '3',
    userId: '3',
    username: '@nft_collector',
    content: 'Just completed my daily check-in and earned +2 WGM! These micro-rewards really add up over time.',
    timestamp: '6h',
    likes: 67,
    replies: 12,
    shares: 9,
    gifts: 3
  }
];

// Mock rewards data
export const mockRewards: Reward[] = [
  {
    id: '1',
    title: 'Daily check-in',
    amount: '+2 WGM',
    type: 'daily',
    claimed: false
  },
  {
    id: '2',
    title: 'Invite a friend',
    amount: '+10 WGM',
    type: 'invite',
    claimed: false
  }
];

// Mock FAQ data
export const mockFAQ = [
  {
    question: 'How do I earn WGM tokens?',
    answer: 'Complete daily tasks, create posts, and engage with the community.'
  },
  {
    question: 'How does the wallet work?',
    answer: 'Your wallet securely stores WGM and other crypto assets.'
  },
  {
    question: 'How do I report a bug?',
    answer: 'Use the contact form →'
  },
  {
    question: 'What is WGM?',
    answer: 'WGM is the native token of WEGRAM used for rewards and transactions.'
  }
];