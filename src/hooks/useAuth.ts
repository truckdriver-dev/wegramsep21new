import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { mockUser } from '../data/mockData';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If no Supabase, use mock data
    if (!supabase) {
      setUser(null);
      setProfile(null);
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

  const signOut = async () => {
    if (!supabase) {
      console.log('Demo mode: Sign-out simulated');
      return;
    }
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error);
  };

  return {
    user,
    profile,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };
};