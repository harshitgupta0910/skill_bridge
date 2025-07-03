import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Star, 
  MessageCircle,
  Video,
  CheckCircle,
  AlertCircle,
  Users,
  RefreshCw,
  Plus
} from 'lucide-react';

const Exchanges = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');

  const exchanges = [
    {
      id: 1,
      partner: {
        name: 'Sarah Chen',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.9,
        location: 'New York, USA'
      },
      teachingSkill: 'React Development',
      learningSkill: 'Machine Learning',
      status: 'active',
      sessionsCompleted: 3,
      totalSessions: 8,
      nextSession: 'Today, 3:00 PM',
      progress: 37.5,
      startDate: '2025-01-15'
    },
    {
      id: 2,
      partner: {
        name: 'Mike Rodriguez',
        avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.7,
        location: 'Madrid, Spain'
      },
      teachingSkill: 'Web Development',
      learningSkill: 'Spanish Language',
      status: 'active',
      sessionsCompleted: 5,
      totalSessions: 10,
      nextSession: 'Tomorrow, 10:00 AM',
      progress: 50,
      startDate: '2025-01-10'
    },
    {
      id: 3,
      partner: {
        name: 'Emma Thompson',
        avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.8,
        location: 'London, UK'
      },
      teachingSkill: 'Python Programming',
      learningSkill: 'Digital Marketing',
      status: 'completed',
      sessionsCompleted: 6,
      totalSessions: 6,
      nextSession: null,
      progress: 100,
      startDate: '2024-12-01',
      completedDate: '2025-01-05'
    },
    {
      id: 4,
      partner: {
        name: 'David Kim',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.6,
        location: 'Seoul, Korea'
      },
      teachingSkill: 'UI/UX Design',
      learningSkill: 'Korean Language',
      status: 'pending',
      sessionsCompleted: 0,
      totalSessions: 8,
      nextSession: 'Pending confirmation',
      progress: 0,
      startDate: null
    }
  ];

  const filteredExchanges = exchanges.filter(exchange => {
    const matchesTab = exchange.status === activeTab;
    const matchesSearch = exchange.partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exchange.teachingSkill.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exchange.learningSkill.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <RefreshCw className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Exchanges</h1>
              <p className="text-gray-600 mt-1">Manage your skill exchange partnerships and track progress.</p>
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full hover:shadow-lg transition-all duration-200 flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              New Exchange
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {exchanges.filter(e => e.status === 'active').length}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900">Active Exchanges</h3>
              <p className="text-sm text-gray-600">Currently ongoing</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {exchanges.filter(e => e.status === 'completed').length}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900">Completed</h3>
              <p className="text-sm text-gray-600">Successfully finished</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {exchanges.reduce((acc, e) => acc + e.sessionsCompleted, 0)}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900">Total Sessions</h3>
              <p className="text-sm text-gray-600">Hours exchanged</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">4.8</span>
              </div>
              <h3 className="font-semibold text-gray-900">Average Rating</h3>
              <p className="text-sm text-gray-600">From partners</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-sm mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
                  {[
                    { key: 'active', label: 'Active', count: exchanges.filter(e => e.status === 'active').length },
                    { key: 'completed', label: 'Completed', count: exchanges.filter(e => e.status === 'completed').length },
                    { key: 'pending', label: 'Pending', count: exchanges.filter(e => e.status === 'pending').length }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                        activeTab === tab.key
                          ? 'bg-white text-primary-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search exchanges..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <button className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                    <Filter className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Exchange Cards */}
            <div className="p-6">
              <div className="grid gap-6">
                {filteredExchanges.map((exchange) => (
                  <div key={exchange.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={exchange.partner.avatar} 
                          alt={exchange.partner.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{exchange.partner.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600">{exchange.partner.rating}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-600">{exchange.partner.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(exchange.status)}`}>
                          {getStatusIcon(exchange.status)}
                          <span className="capitalize">{exchange.status}</span>
                        </span>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <MessageCircle className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <Video className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-blue-50 rounded-xl p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">You're Teaching</h4>
                        <p className="text-blue-700">{exchange.teachingSkill}</p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-4">
                        <h4 className="font-semibold text-green-900 mb-2">You're Learning</h4>
                        <p className="text-green-700">{exchange.learningSkill}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {exchange.nextSession || 'No upcoming sessions'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {exchange.sessionsCompleted}/{exchange.totalSessions} sessions
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-600">{exchange.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${exchange.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {exchange.status === 'active' && (
                      <div className="flex items-center space-x-3">
                        <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium">
                          Schedule Next Session
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                          View Details
                        </button>
                      </div>
                    )}

                    {exchange.status === 'completed' && (
                      <div className="flex items-center space-x-3">
                        <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium">
                          Leave Review
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                          View Certificate
                        </button>
                      </div>
                    )}

                    {exchange.status === 'pending' && (
                      <div className="flex items-center space-x-3">
                        <button className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors font-medium">
                          Confirm Exchange
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredExchanges.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No {activeTab} exchanges found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm ? 'Try adjusting your search terms.' : 'Start a new skill exchange to get started.'}
                  </p>
                  <button className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full hover:shadow-lg transition-all duration-200">
                    Find Exchange Partners
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchanges;