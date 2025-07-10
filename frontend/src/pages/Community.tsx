import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import  imag  from './image.png'; 
import {
  Search,
  Filter,
  Star,
  MessageCircle,
  Users,
  TrendingUp,
  BookOpen,
  Award,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Community = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/community/members')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const trendingSkills = [
    { skill: 'AI/Machine Learning', growth: '+45%', exchanges: 234 },
    { skill: 'Web Development', growth: '+32%', exchanges: 189 },
    { skill: 'Digital Marketing', growth: '+28%', exchanges: 156 },
    { skill: 'Data Science', growth: '+25%', exchanges: 142 },
    { skill: 'UI/UX Design', growth: '+22%', exchanges: 128 }
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    user.wantToLearn.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Community</h1>
              <p className="text-gray-600 mt-1">Connect with learners and teachers from around the world.</p>
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full hover:shadow-lg transition-all duration-200">
              Join Discussion
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">10,247</h3>
              <p className="text-sm text-gray-600">Active Members</p>
              <p className="text-xs text-green-600 mt-1">+12% this month</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">850+</h3>
              <p className="text-sm text-gray-600">Skills Available</p>
              <p className="text-xs text-green-600 mt-1">+8% this month</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">25,486</h3>
              <p className="text-sm text-gray-600">Exchanges Made</p>
              <p className="text-xs text-green-600 mt-1">+15% this month</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">4.8</span>
              </div>
              <h3 className="font-semibold text-gray-900">Avg. Rating</h3>
              <p className="text-sm text-gray-600">Community satisfaction</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm mb-8">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
                    {['discover', 'reviews'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm ${activeTab === tab ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                      >
                        {tab === 'discover' ? 'Discover People' : 'Recent Reviews'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search by name, can teach, or want to learn..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="p-6">
                  {activeTab === 'discover' && (
                    <div className="space-y-6">
                      {filteredUsers.map((member) => (
                        <div key={member._id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200">
                          <div className="flex items-center space-x-4 mb-4">
                            <img
                              src={member.photo ? `http://localhost:5000${member.photo}` : imag}
                              alt={member.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-900">{member.name}</h3>
                              <p className="text-sm text-gray-600">{member.location || 'No Location'}</p>
                            </div>
                          </div>
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <div className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">Match %</div>
                              <button className="p-2 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-primary-50">
                                <MessageCircle className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {member.languages.slice(0, 6).map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">{tag}</span>
                              ))}
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Can Teach</h4>
                              <div className="flex flex-wrap gap-2">
                                {member.skills.map((skill, index) => (
                                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{skill}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Wants to Learn</h4>
                              <div className="flex flex-wrap gap-2">
                                {member.wantToLearn.map((skill, index) => (
                                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{skill}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center">
                                <Award className="w-4 h-4 mr-1" />
                                {member.bio || 'No Bio'}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {member.availability}
                              </span>
                            </div>
                            <Link
                              to={`/connection/${member._id}`}
                              className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors font-medium"
                            >
                              Connect
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">Trending Skills</h2>
                </div>
                <div className="p-6 space-y-4">
                  {trendingSkills.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.skill}</h3>
                        <p className="text-sm text-gray-600">{item.exchanges} exchanges</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">{item.growth}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-6 text-white">
                <h2 className="text-xl font-bold mb-4">Share Your Skills</h2>
                <p className="text-primary-100 mb-6">Help others learn by sharing what you know. Join our community of passionate learners and teachers.</p>
                <button className="w-full bg-white text-primary-600 font-semibold py-2 px-4 rounded-xl hover:shadow-lg transition-all duration-200">Create Skill Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
