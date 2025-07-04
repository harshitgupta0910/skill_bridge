import React from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Star,
  ArrowRight,
  Clock,
  MessageCircle,
  BookOpen,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { user } = useApp();

  const stats = [
    {
      title: 'Active Exchanges',
      value: '12',
      change: '+2 this week',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Skills Taught',
      value: '4',
      change: 'React, Node.js, Python, UI/UX',
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      title: 'Hours Exchanged',
      value: '48',
      change: '+8 this month',
      icon: Clock,
      color: 'bg-purple-500'
    },
    {
      title: 'Rating',
      value: '4.8',
      change: 'Based on 24 reviews',
      icon: Star,
      color: 'bg-yellow-500'
    }
  ];

  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  toast.success("Logged out successfully! 👋");
  navigate("/auth");  // Redirect to login page
};


  const recentExchanges = [
    {
      id: 1,
      partner: 'Sarah Chen',
      skill: 'Machine Learning',
      yourSkill: 'React Development',
      status: 'Upcoming',
      time: 'Today, 3:00 PM',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      partner: 'Mike Rodriguez',
      skill: 'Spanish Language',
      yourSkill: 'Web Development',
      status: 'In Progress',
      time: '2 hours ago',
      avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      partner: 'Emma Thompson',
      skill: 'Digital Marketing',
      yourSkill: 'Python Programming',
      status: 'Completed',
      time: 'Yesterday',
      avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: 'Machine Learning Basics',
      partner: 'Sarah Chen',
      time: 'Today, 3:00 PM',
      duration: '1 hour',
      type: 'Learning'
    },
    {
      id: 2,
      title: 'React Best Practices',
      partner: 'David Kim',
      time: 'Tomorrow, 10:00 AM',
      duration: '2 hours',
      type: 'Teaching'
    },
    {
      id: 3,
      title: 'UI/UX Design Review',
      partner: 'Lisa Wang',
      time: 'Friday, 2:00 PM',
      duration: '1.5 hours',
      type: 'Teaching'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className='item-center'>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}! 👋</h1>
              <p className="text-gray-600 mt-1">Here's what's happening with your skill exchanges today.</p>
            </div>
            <div className="flex items-center space-x-4">
  <button className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full hover:shadow-lg transition-all duration-200">
    New Exchange
  </button>

  {/* <button
    onClick={handleLogout}
    className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
  >
    Logout
  </button> */}
</div>

          </div>
        </div>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Exchanges */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Recent Exchanges</h2>
                  <Link to="/exchanges" className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium">
                    View all
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentExchanges.map((exchange) => (
                    <div key={exchange.id} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                      <img 
                        src={exchange.avatar} 
                        alt={exchange.partner}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{exchange.partner}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            exchange.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                            exchange.status === 'In Progress' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {exchange.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Learning: {exchange.skill} • Teaching: {exchange.yourSkill}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{exchange.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Sessions</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="p-4 rounded-xl border border-gray-200 hover:border-primary-300 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm">{session.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          session.type === 'Learning' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {session.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">with {session.partner}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {session.time}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {session.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View Full Calendar
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/community" className="group p-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl text-white hover:shadow-xl transition-all duration-200">
              <Users className="w-8 h-8 mb-4" />
              <h3 className="font-bold text-lg mb-2">Find New Partners</h3>
              <p className="text-primary-100 mb-4">Discover people with complementary skills</p>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link to="/profile" className="group p-6 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl text-white hover:shadow-xl transition-all duration-200">
              <Award className="w-8 h-8 mb-4" />
              <h3 className="font-bold text-lg mb-2">Complete Profile</h3>
              <p className="text-accent-100 mb-4">Add more skills to attract better matches</p>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link to="/analytics" className="group p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl text-white hover:shadow-xl transition-all duration-200">
              <TrendingUp className="w-8 h-8 mb-4" />
              <h3 className="font-bold text-lg mb-2">View Progress</h3>
              <p className="text-green-100 mb-4">Track your learning and teaching journey</p>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;