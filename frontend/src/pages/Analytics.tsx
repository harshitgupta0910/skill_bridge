import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Clock, 
  Star,
  Award,
  Calendar,
  BookOpen,
  Target,
  Activity,
  BarChart3,
  PieChart
} from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const stats = [
    {
      title: 'Total Learning Hours',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: Clock,
      color: 'bg-blue-500'
    },
    {
      title: 'Skills Taught',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      title: 'Exchange Partners',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'bg-yellow-500'
    }
  ];

  const skillProgress = [
    { skill: 'Machine Learning', progress: 75, hoursSpent: 45, level: 'Intermediate' },
    { skill: 'Spanish Language', progress: 60, hoursSpent: 32, level: 'Beginner' },
    { skill: 'Digital Marketing', progress: 90, hoursSpent: 28, level: 'Advanced' },
    { skill: 'Mobile Development', progress: 40, hoursSpent: 18, level: 'Beginner' },
    { skill: 'DevOps', progress: 25, hoursSpent: 12, level: 'Beginner' }
  ];

  const teachingStats = [
    { skill: 'React Development', sessions: 15, hours: 45, rating: 4.9, students: 8 },
    { skill: 'Node.js', sessions: 12, hours: 36, rating: 4.7, students: 6 },
    { skill: 'Python Programming', sessions: 8, hours: 24, rating: 4.8, students: 5 },
    { skill: 'UI/UX Design', sessions: 6, hours: 18, rating: 4.6, students: 4 }
  ];

  const monthlyActivity = [
    { month: 'Sep', learning: 8, teaching: 12 },
    { month: 'Oct', learning: 12, teaching: 15 },
    { month: 'Nov', learning: 15, teaching: 18 },
    { month: 'Dec', learning: 18, teaching: 20 },
    { month: 'Jan', learning: 22, teaching: 24 }
  ];

  const achievements = [
    {
      title: 'First Exchange',
      description: 'Completed your first skill exchange',
      date: '2024-09-15',
      icon: '🎉'
    },
    {
      title: 'Teaching Master',
      description: 'Taught 10+ students successfully',
      date: '2024-11-20',
      icon: '👨‍🏫'
    },
    {
      title: 'Perfect Rating',
      description: 'Maintained 5-star rating for 10 sessions',
      date: '2024-12-05',
      icon: '⭐'
    },
    {
      title: 'Language Learner',
      description: 'Completed Spanish basics course',
      date: '2025-01-10',
      icon: '🗣️'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Track your learning progress and teaching impact.</p>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center space-x-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Learning Progress */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Learning Progress</h2>
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">5 Active Skills</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {skillProgress.map((skill, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{skill.skill}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{skill.hoursSpent} hours</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              skill.level === 'Beginner' ? 'bg-yellow-100 text-yellow-800' :
                              skill.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {skill.level}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{skill.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${skill.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Monthly Activity */}
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Monthly Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {monthlyActivity.map((month, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-900">{month.month}</span>
                        <span className="text-gray-600">{month.learning + month.teaching}h</span>
                      </div>
                      <div className="flex space-x-1 h-2">
                        <div 
                          className="bg-blue-500 rounded-full"
                          style={{ width: `${(month.learning / 25) * 100}%` }}
                          title={`Learning: ${month.learning}h`}
                        ></div>
                        <div 
                          className="bg-green-500 rounded-full"
                          style={{ width: `${(month.teaching / 25) * 100}%` }}
                          title={`Teaching: ${month.teaching}h`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">Learning</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Teaching</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Teaching Performance */}
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Teaching Performance</h2>
                  <Activity className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {teachingStats.map((skill, index) => (
                    <div key={index} className="p-4 rounded-xl border border-gray-200 hover:border-primary-300 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{skill.skill}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-900">{skill.rating}</span>
                        </div>
                      </div>
                      <div class="grid grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="block font-medium text-gray-900">{skill.sessions}</span>
                          <span>Sessions</span>
                        </div>
                        <div>
                          <span className="block font-medium text-gray-900">{skill.hours}h</span>
                          <span>Hours</span>
                        </div>
                        <div>
                          <span className="block font-medium text-gray-900">{skill.students}</span>
                          <span>Students</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Recent Achievements</h2>
                  <Award className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">{achievement.description}</p>
                        <p className="text-xs text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All Achievements
                </button>
              </div>
            </div>
          </div>

          {/* Goals Section */}
          <div className="mt-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Set Your Learning Goals</h2>
                <p className="text-primary-100 mb-6">
                  Define what you want to achieve this month and track your progress towards your learning objectives.
                </p>
                <button className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200">
                  Create New Goal
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-primary-100">Complete ML Course</span>
                    <span className="text-white font-semibold">75%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-primary-100">Teach 5 New Students</span>
                    <span className="text-white font-semibold">60%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;