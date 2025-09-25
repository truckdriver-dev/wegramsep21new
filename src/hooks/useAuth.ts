import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { mockUser } from '../data/mockData';
import { twitterAuth, TwitterUser } from '../lib/twitterAuth';

export interface Profile {
  id: string;
  username: string;
  email: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [twitterUser, setTwitterUser] = useState<TwitterUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If no Supabase, use mock data
    if (!supabase) {
      setUser(null);
      setProfile({
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email || null,
        avatar_url: null,
        bio: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        await createProfile(userId);
      } else if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (userId: string) => {
    try {
      const username = `user_${userId.slice(0, 8)}`;
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          username,
          email: user?.email || null,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error in createProfile:', error);
    }
  };

  const signInWithGoogle = async () => {
    if (!supabase) {
      console.log('Demo mode: Google sign-in simulated');
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) console.error('Error signing in with Google:', error);
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!supabase) {
      console.log('Demo mode: Email sign-in simulated');
      return { error: null };
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) console.error('Error signing in with email:', error);
    return { error };
  };

  const signUpWithEmail = async (email: string, password: string) => {
    if (!supabase) {
      console.log('Demo mode: Email sign-up simulated');
      return { error: null };
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) console.error('Error signing up with email:', error);
    return { error };
  };

  const signInWithTwitter = async () => {
    try {
      // For demo purposes, simulate Twitter auth
      const result = await twitterAuth.simulateTwitterAuth();
      
      if (result.success && result.user) {
        setTwitterUser(result.user);
        
        // Create or update profile with Twitter data
        const twitterProfile: Profile = {
          id: result.user.id,
          username: `@${result.user.username}`,
          email: null,
          avatar_url: result.user.profile_image_url || null,
          bio: `Twitter user ${result.user.name}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setProfile(twitterProfile);
        setUser(null); // No Supabase user for Twitter auth
        return { success: true, user: result.user };
      } else {
        throw new Error(result.error || 'Twitter authentication failed');
      }
    } catch (error) {
      console.error('Twitter sign-in error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Authentication failed' };
    }
  };

  const signOut = async () => {
    if (!supabase) {
      console.log('Demo mode: Sign-out simulated');
      setTwitterUser(null);
      setProfile(null);
      setUser(null);
      return;
    }
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error);
    setTwitterUser(null);
  };

  return {
    user,
    profile,
    twitterUser,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signInWithTwitter,
    signOut,
  };
};