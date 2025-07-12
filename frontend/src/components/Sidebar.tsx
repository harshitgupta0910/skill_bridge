// src/components/Sidebar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import imag from '../pages/image.png';
import {
  LayoutDashboard,
  User,
  RefreshCw,
  Users,
  BarChart3,
  Settings,
  MessageCircle,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import SK from '../sk.png';
import io from 'socket.io-client';
const bUrl = import.meta.env.VITE_BACKEND_URL;
const socket = io(bUrl); // Your backend Socket.IO server

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useApp();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user?._id) return;

    socket.emit('register', user._id);

    socket.on('receive_message', (message) => {
      if (location.pathname !== `/connection/${message.senderId}?tab=messages`) {
        setUnreadCount((prev) => prev + 1);
      }
    });

    socket.on('message_read', () => {
      setUnreadCount(0);
    });

    return () => {
      socket.off('receive_message');
      socket.off('message_read');
    };
  }, [user?._id, location.pathname]);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', href: '/profile', icon: User },
    { name: 'Messages', href: '/messages', icon: MessageCircle },
    { name: 'My Exchanges', href: '/exchanges', icon: RefreshCw },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully! 👋');
    navigate('/auth');
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
     <div className="p-6 border-b border-gray-200">
  <div className="flex items-center space-x-4">
    <img src={SK} alt="Skill Bridge Logo" className="w-20 h-20 rounded-xl" />
    <span className="text-xl font-bold bg-gray-900 bg-clip-text text-transparent">
      Skill Bridge
    </span>
  </div>
</div>


      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={user?.photo ? `http://localhost:5000${user.photo}` : imag}
            alt={user?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">Rating: {user?.rating || 4.8}/5.0</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const isMessagesTab = item.name === 'Messages';

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon
                  className={`w-5 h-5 ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                />
                <span className="font-medium">{item.name}</span>
              </div>

              {isMessagesTab && unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
