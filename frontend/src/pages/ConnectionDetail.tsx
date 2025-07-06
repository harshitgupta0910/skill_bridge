// ✅ Production-Ready Enhancement for Your Provided Code
// Features Added: Online/Offline Status + Double Tick Read Receipts

// Note: This only adds features without modifying your code structure.

import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { io } from 'socket.io-client';
import {
  ArrowLeft, MapPin, Calendar, Video, MessageCircle, Phone,
  CheckCircle, XCircle, AlertCircle, Users, BookOpen, BarChart3, MoreVertical, Send
} from 'lucide-react';
import  imag  from './image.png'; // Adjust the import path as necessary
const socket = io('proxy');

const ConnectionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [connection, setConnection] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [requestStatus, setRequestStatus] = useState<'pending' | 'accepted' | 'rejected'>('pending');
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const userId = localStorage.getItem('userId');


  const params = new URLSearchParams(window.location.search);
const defaultTab = params.get('tab') || 'overview';
const [activeTab, setActiveTab] = useState(defaultTab);


  useEffect(() => {
    axios.get(`proxy/api/user/${id}`)
      .then(res => {
        setConnection(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!userId) return;
    socket.emit('register', userId);
    socket.emit('check_online', id);

    socket.on('online_status', ({ userId: onlineUserId, status }) => {
      if (onlineUserId === id) setIsOnline(status);
    });

    return () => {
      socket.off('online_status');
    };
  }, [id, userId]);


  useEffect(() => {
    if (!userId || !id) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`proxy/api/messages/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const msgs = res.data.map((msg: any) => ({
          senderId: msg.senderId,
          text: msg.text,
          timestamp: msg.timestamp,
          status: msg.status || 'sent'
        }));
        setMessages(msgs);
      } catch (err) {
        console.error('Failed to load messages', err);
      }
    };

    fetchMessages();
  }, [id, connection, userId]);

  useEffect(() => {
    if (userId) {
      socket.emit('register', userId);
    }

    const handleReceiveMessage = (msg: { senderId: string; text: string; timestamp: string; status?: string }) => {
      setMessages(prev => [...prev, {
        senderId: msg.senderId,
        text: msg.text,
        timestamp: msg.timestamp,
        status: msg.status || 'sent'
      }]);
    };

    socket.on('receive_message', handleReceiveMessage);

    socket.on('message_read', ({ messageIds }) => {
      setMessages(prev => prev.map((msg, idx) =>
        messageIds.includes(idx) ? { ...msg, status: 'read' } : msg
      ));
    });

    return () => {
      socket.off('receive_message', handleReceiveMessage);
      socket.off('message_read');
    };
  }, [connection, userId]);

useEffect(() => {
  const container = messagesEndRef.current;
  if (!container) return;

  const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;

  if (isNearBottom) {
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }
}, [messages]);


  useEffect(() => {
    if (activeTab === 'messages' && userId && connection?._id) {
      const unreadMessageIndexes = messages
        .map((msg, index) => (msg.senderId !== userId && msg.status !== 'read' ? index : null))
        .filter((i) => i !== null);

      if (unreadMessageIndexes.length > 0) {
        socket.emit('message_read', { messageIds: unreadMessageIndexes, receiverId: connection._id });
      }
    }
  }, [activeTab, messages, connection, userId]);

 const sendMessage = async () => {
  if (!newMessage.trim() || !userId || !connection?._id) return;

  try {
    const timestamp = new Date().toISOString();

    await axios.post(
      'proxy/api/messages',
      { receiverId: connection._id, text: newMessage, timestamp, status: 'sent' },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );

    setNewMessage('');
    // ❌ Do NOT push message locally. Wait for socket broadcast.
  } catch (err) {
    console.error('Failed to send message:', err);
  }
};


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  if (loading || !connection) return <div className="p-8 text-center text-gray-600">Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/community" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div className="flex items-center space-x-4">
                <img
                  src={connection.photo ? `proxy${connection.photo}` : imag}
                  alt={connection.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{connection.name}</h1>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{connection.location}</span>
                    <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-900'}`}></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
               {/* <div className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 ${getStatusColor(requestStatus)}`}>
                 {getStatusIcon(requestStatus)}
                 <span className="capitalize">{requestStatus}</span>
               </div> */}
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="bg-white rounded-2xl shadow-sm mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
                {[
                  { key: 'overview', label: 'Overview', icon: Users },
                  { key: 'modules', label: 'Learning Modules', icon: BookOpen },
                  { key: 'sessions', label: 'Sessions', icon: Calendar },
                  { key: 'messages', label: 'Messages', icon: MessageCircle },
                  { key: 'progress', label: 'Progress', icon: BarChart3 }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${activeTab === tab.key ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">About {connection.name}</h3>
                  <p className="text-gray-700 mb-4">{connection.bio || 'No bio provided.'}</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Can Teach</h4>
                      <div className="flex flex-wrap gap-2">
                        {connection.skills?.map((skill: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Wants to Learn</h4>
                      <div className="flex flex-wrap gap-2">
                        {connection.wantToLearn?.map((skill: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <div className="h-80 border rounded-lg p-4 overflow-y-auto bg-gray-300">
                    {(() => {
                      const seenDates = new Set<string>();
                      return messages.map((msg, index) => {
                        const date = new Date(msg.timestamp).toLocaleDateString();
                        const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const showDate = !seenDates.has(date);
                        if (showDate) seenDates.add(date);
                        const isOwnMessage = msg.senderId === userId;
                        return (
                          <React.Fragment key={index}>
                            {showDate && (<div className="text-center text-xs text-gray-900 my-2">{date}</div>)}
                            <div className={`mb-2 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                              <span className={`inline-block px-4 py-2 border rounded-lg shadow text-m ${isOwnMessage ? 'bg-teal-300 text-black' : 'bg-blue-300 text-black'}`}>
                                {msg.text}
                                <span className="ml-2 text-gray-50 text-xs">{time}</span>
                                {isOwnMessage && (
                                  <span className="ml-2 text-gray-900 text-xs">{msg.status === 'read' ? '✓✓' : '✓'}</span>
                                )}
                              </span>
                            </div>
                          </React.Fragment>
                        );
                      });
                    })()}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-4 outline-none text-base"
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-4 py-4 flex items-center text-base"
                    >
                      <Send className="w-5 h-5 mr-2" /> Send
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionDetail;