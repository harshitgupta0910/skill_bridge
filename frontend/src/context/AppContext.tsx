// src/context/AppContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('proxy');

interface User {
  _id: string;
  name: string;
  email: string;
  bio: string;
  location: string;
  availability: string;
  languages: string[];
  photo: string;
  skills: string[];
  wantToLearn: string[];
  rating?: number;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  fetchUserProfile: () => Promise<void>;
  socket: ReturnType<typeof io> | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const c = useContext(AppContext);
  if (!c) throw new Error('useApp must be used inside AppProvider');
  return c;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token');
      const res = await axios.get('proxy/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
      setIsLoggedIn(true);
    } catch (err) {
      console.error('Fetch profile error:', err);
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem('token');
    }
  };

  // Register the user with socket.io when profile is fetched
  useEffect(() => {
    if (user && user._id) {
      socket.emit('register', user._id);
    }
  }, [user]);

  // Auto fetch on login state change
  useEffect(() => {
    if (isLoggedIn) fetchUserProfile();
  }, [isLoggedIn]);

  return (
    <AppContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn, fetchUserProfile, socket }}
    >
      {children}
    </AppContext.Provider>
  );
};
