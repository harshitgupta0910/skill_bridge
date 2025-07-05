import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { io } from 'socket.io-client';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Video,
  MessageCircle,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  BookOpen,
  BarChart3,
  MoreVertical,
  Send
} from 'lucide-react';

const socket = io('http://localhost:5000');

const ConnectionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [connection, setConnection] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [requestStatus, setRequestStatus] = useState<'pending' | 'accepted' | 'rejected'>('pending');
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');



  // Load persisted messages from the server
useEffect(() => {
  const fetchMessages = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId || !id) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/messages/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      // Set messages from DB with sender labels
      const msgs = res.data.map((msg: any) => ({
        sender: msg.senderId === userId ? 'You' : connection?.name,
        text: msg.text,
      }));
      setMessages(msgs);
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };

  fetchMessages();
}, [id, connection]);


  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/${id}`)
      .then((res) => {
        setConnection(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

//  Register socket with sender ID
useEffect(() => {
  const senderId = localStorage.getItem('userId');
  if (senderId) {
    socket.emit('register', senderId);
    console.log(' Registered sender socket:', senderId);
  }
}, []);

//  Listen for incoming messages
useEffect(() => {
  const handleReceiveMessage = (msg: { senderId: string; text: string; timestamp: string }) => {
    console.log('📥 Received message:', msg);
    const senderName = msg.senderId === localStorage.getItem('userId') ? 'You' : connection?.name;
    setMessages((prev) => [...prev, { sender: senderName, text: msg.text }]);
  };

  socket.on('receive_message', handleReceiveMessage);

  return () => {
    socket.off('receive_message', handleReceiveMessage);
  };
}, []); // ✅ No dependency (run once)


// Send message to backend and update UI
const sendMessage = async () => {
  const senderId = localStorage.getItem('userId');
  const receiverId = connection?._id;

  if (!newMessage.trim() || !senderId || !receiverId) return;

  const msg = { sender: 'You', text: newMessage };

  try {
    // Call the backend API to store the message
    await axios.post(
      'http://localhost:5000/api/messages',
      { receiverId, text: newMessage },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );

    // Emit real-time update
    socket.emit('send_message', {
      senderId,
      receiverId,
      message: newMessage,
    });

    // UI update
    setMessages((prev) => [...prev, msg]);
    setNewMessage('');
  } catch (err) {
    console.error('Failed to send & save message:', err);
  }
};




  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (loading || !connection) return <div className="p-8 text-center text-gray-600">Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/community" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div className="flex items-center space-x-4">
                <img
                  src={`http://localhost:5000${connection.photo}`}
                  alt={connection.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{connection.name}</h1>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{connection.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 ${getStatusColor(requestStatus)}`}>
                {getStatusIcon(requestStatus)}
                <span className="capitalize">{requestStatus}</span>
              </div>
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
          {/* Tabs */}
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
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      activeTab === tab.key ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
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
                </div>
              )}

              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <div className="h-64 border rounded-lg p-4 overflow-y-auto bg-gray-50">
                    {messages.map((msg, index) => (
                      <div key={index} className={`mb-2 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>
                        <span className="inline-block px-3 py-1 bg-white border rounded-lg shadow text-sm">
                          <strong>{msg.sender}:</strong> {msg.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none"
                    />


                      {/* SEND MESSSAGE BUTTON  */}
                    <button
                      onClick={sendMessage}
                      className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-4 py-2 flex items-center"
                    >
                      <Send className="w-4 h-4 mr-2" /> Send
                    </button>
                  </div>
                </div>
              )}

              {/* You can expand other tabs here later */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionDetail;
