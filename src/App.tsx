import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { TrendingUp, Compass, Gamepad2, MessageCircle, Coins, Play, ShoppingCart } from 'lucide-react';

// Styles
import './styles/theme.css';

// Hooks
import { useAuth } from './hooks/useAuth';

// Layout Components
import { TopBar } from './components/Layout/TopBar';
import { BottomNav } from './components/Layout/BottomNav';
import { SideDrawer } from './components/Layout/SideDrawer';
import { AuthModal } from './components/Auth/AuthModal';
import { MessageModal } from './components/Layout/MessageModal';

// Pages
import { Home } from './pages/Home';
import { Landing } from './pages/Landing';
import { AuthPage } from './pages/AuthPage';
import { Profile } from './pages/Profile';
import { Analytics } from './pages/Analytics';
import { Compose } from './pages/Compose';
import { Wallet } from './pages/Wallet';
import { Help } from './pages/Help';
import { Rewards } from './pages/Rewards';
import { Livestream } from './pages/Livestream';
import { WegramAI } from './pages/WegramAI';
import { Trending } from './pages/Trending';
import { Explore } from './pages/Explore';
import { Games } from './pages/Games';
import { UserProfile } from './pages/UserProfile';
import { Messages } from './pages/Messages';
import { Bookmarks } from './pages/Bookmarks';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { Staking } from './pages/Staking';
import { BuyWegram } from './pages/BuyWegram';
import { Notifications } from './pages/Notifications';
import { LaunchToken } from './pages/LaunchToken';
import { Video } from './pages/Video';

function AppContent() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading } = useAuth();

  // Show auth modal if not authenticated and not loading
  useEffect(() => {
    // Only show auth modal if Supabase is configured
    // if (!loading && !user) {
    //   setIsAuthOpen(true);
    // }
  }, [user, loading]);

  const handleAuth = (method: string) => {
    console.log('Auth method:', method);
    setIsAuthOpen(false);
  };

  const handleGiftClick = () => {
    navigate('/rewards');
  };

  const handleMessageClick = () => {
    navigate('/messages');
  };

  const handleMessageUser = (username: string) => {
    setMessageRecipient(username);
    setIsMessageModalOpen(true);
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  // Don't show TopBar and BottomNav on landing and auth pages
  const hideNavigation = location.pathname === '/' || location.pathname === '/auth';

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      {!hideNavigation && (
        <TopBar 
          onMenuClick={() => setIsDrawerOpen(true)}
          onGiftClick={handleGiftClick}
          onMessageClick={handleMessageClick}
          onNotificationClick={handleNotificationClick}
        />
      )}
      
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/compose" element={<Compose />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/help" element={<Help />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/livestream" element={<Livestream />} />
          <Route path="/ai" element={<WegramAI />} />
          
          {/* Full functionality pages */}
          <Route path="/trending" element={<Trending />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/games" element={<Games />} />
          <Route path="/messages" element={<Messages />} />
          
          {/* User Profile */}
          <Route path="/user/:username" element={<UserProfile />} />
          
          {/* Pages that need to be built */}
          <Route path="/staking" element={<Staking />} />
          <Route path="/video" element={<Video />} />
          <Route path="/buy-wegram" element={<BuyWegram />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/launch-token" element={<LaunchToken />} />
        </Routes>
      </main>

      {!hideNavigation && <BottomNav />}
      
      <SideDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
      
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuth={handleAuth}
      />
      
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        recipientUsername={messageRecipient}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;