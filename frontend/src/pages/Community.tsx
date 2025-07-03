import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import {
  Search,
  Filter,
  Star,
  MessageCircle,
  UserPlus,
  MapPin,
  Clock,
  BookOpen,
  Users,
  TrendingUp,
  Award,
  Heart,
  Share2,
  Tag,
  X,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Community = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/community/members')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);


  const availableTags = [
    'Programming', 'Web Development', 'Mobile Development', 'Data Science',
    'Machine Learning', 'AI', 'UI/UX Design', 'Graphic Design', 'Photography',
    'Digital Marketing', 'Content Writing', 'SEO', 'Social Media', 'Business',
    'Languages', 'Spanish', 'French', 'German', 'Japanese', 'Korean', 'Chinese',
    'Music', 'Guitar', 'Piano', 'Singing', 'Art', 'Drawing', 'Painting',
    'Cooking', 'Fitness', 'Yoga', 'Dance', 'Writing', 'Public Speaking',
    'Leadership', 'Project Management', 'Finance', 'Accounting', 'Sales'
  ];

  const communityMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      location: 'New York, USA',
      skills: ['Machine Learning', 'Python', 'Data Science'],
      wantToLearn: ['React', 'Web Development', 'UI/UX'],
      tags: ['Programming', 'Data Science', 'AI', 'Python'],
      exchanges: 24,
      joined: '2024-03-15',
      online: true,
      matchScore: 95,
      experience: 'Expert',
      availability: 'Weekends'
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      location: 'Madrid, Spain',
      skills: ['Spanish', 'Guitar', 'Photography'],
      wantToLearn: ['Web Development', 'Digital Marketing'],
      tags: ['Languages', 'Spanish', 'Music', 'Guitar', 'Photography', 'Art'],
      exchanges: 18,
      joined: '2024-02-20',
      online: false,
      matchScore: 87,
      experience: 'Intermediate',
      availability: 'Evenings'
    },
    {
      id: 3,
      name: 'Emma Thompson',
      avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      location: 'London, UK',
      skills: ['Digital Marketing', 'Content Writing', 'SEO'],
      wantToLearn: ['Python', 'Data Analysis'],
      tags: ['Digital Marketing', 'Content Writing', 'SEO', 'Social Media', 'Business'],
      exchanges: 32,
      joined: '2024-01-10',
      online: true,
      matchScore: 92,
      experience: 'Expert',
      availability: 'Flexible'
    },
    {
      id: 4,
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      location: 'Seoul, Korea',
      skills: ['Korean', 'Graphic Design', 'Illustration'],
      wantToLearn: ['UI/UX Design', 'Figma'],
      tags: ['Languages', 'Korean', 'Graphic Design', 'UI/UX Design', 'Art'],
      exchanges: 15,
      joined: '2024-04-05',
      online: true,
      matchScore: 78,
      experience: 'Intermediate',
      availability: 'Mornings'
    }
  ];

  const reviews = [
    {
      id: 1,
      reviewer: {
        name: 'Alex Johnson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      reviewee: {
        name: 'Sarah Chen',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      rating: 5,
      skill: 'Machine Learning',
      comment: 'Sarah is an exceptional teacher! Her explanations are clear and she provides excellent hands-on examples. Highly recommended for anyone looking to learn ML.',
      date: '2025-01-20',
      helpful: 12
    },
    {
      id: 2,
      reviewer: {
        name: 'Emma Thompson',
        avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      reviewee: {
        name: 'Mike Rodriguez',
        avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      rating: 4,
      skill: 'Spanish Language',
      comment: 'Mike makes learning Spanish fun and engaging. His cultural insights really add value to the lessons. Great patience with beginners!',
      date: '2025-01-18',
      helpful: 8
    }
  ];

  const trendingSkills = [
    { skill: 'AI/Machine Learning', growth: '+45%', exchanges: 234 },
    { skill: 'Web Development', growth: '+32%', exchanges: 189 },
    { skill: 'Digital Marketing', growth: '+28%', exchanges: 156 },
    { skill: 'Data Science', growth: '+25%', exchanges: 142 },
    { skill: 'UI/UX Design', growth: '+22%', exchanges: 128 }
  ];



  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Community</h1>
              <p className="text-gray-600 mt-1">Connect with learners and teachers from around the world.</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full hover:shadow-lg transition-all duration-200">
                Join Discussion
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Community Stats */}
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
            {/* Main Content */}
            <div className="lg:col-span-2">




              {/* Tabs */}
              <div className="bg-white rounded-2xl shadow-sm mb-8">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
                    {[
                      { key: 'discover', label: 'Discover People' },
                      { key: 'reviews', label: 'Recent Reviews' }
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${activeTab === tab.key
                            ? 'bg-white text-primary-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Members */}
                <div className="p-6">
                  {activeTab === 'discover' && (
                    <div className="space-y-6">
                      {users.map((member) => (
                        <div key={member._id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200">

                          {/* ✅ Name & Photo */}
                          <div className="flex items-center space-x-4 mb-4">
                            <img
                              src={member.photo ? `http://localhost:5000${member.photo}` : '/default-avatar.png'}
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
                              <div className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                                Match %
                              </div>
                              <button className="p-2 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-primary-50">
                                <MessageCircle className="w-5 h-5" />
                              </button>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {member.languages.slice(0, 6).map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Can Teach</h4>
                              <div className="flex flex-wrap gap-2">
                                {member.skills.map((skill, index) => (
                                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Wants to Learn</h4>
                              <div className="flex flex-wrap gap-2">
                                {member.wantToLearn.map((skill, index) => (
                                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                    {skill}
                                  </span>
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

                  {/* Reviews section unchanged */}
                </div>

              </div>


            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Trending Skills */}
              <div className="bg-white rounded-2xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">Trending Skills</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {trendingSkills.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.skill}</h3>
                          <p className="text-sm text-gray-600">{item.exchanges} exchanges</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {item.growth}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-6 text-white">
                <h2 className="text-xl font-bold mb-4">Share Your Skills</h2>
                <p className="text-primary-100 mb-6">
                  Help others learn by sharing what you know. Join our community of passionate learners and teachers.
                </p>
                <button className="w-full bg-white text-primary-600 font-semibold py-2 px-4 rounded-xl hover:shadow-lg transition-all duration-200">
                  Create Skill Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;