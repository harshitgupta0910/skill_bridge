import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import {
  MessageCircle,
  Award,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Messages = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/community/members')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  // You can later change the filtering logic based on the tab
  const filteredUsers = users;  // Currently, showing all users.

  return (<div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Messages & Community Connections</h1>

        {activeTab === 'discover' && (
          <div className="space-y-6">
            {filteredUsers.map((member) => (
              <div
                key={member._id}
                className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={member.photo ? `http://localhost:5000${member.photo}` : '/default-avatar.png'}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">
                      {member.location || 'No Location'}
                    </p>
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
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
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
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Wants to Learn</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.wantToLearn.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
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
                      {member.availability || 'N/A'}
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
  );
};

export default Messages;
