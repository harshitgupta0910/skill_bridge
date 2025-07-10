import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

const Messages = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://skill-bridge-7de9.onrender.com/api/community/members')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    user.wantToLearn.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          Messages & Community Connections
        </h1>

        {/* ✅ Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, can teach, or want to learn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="space-y-8">
          {filteredUsers.map((member) => (
            <div
              key={member._id}
              className="border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      member.photo
                        ? `https://skill-bridge-7de9.onrender.com${member.photo}`
                        : '/default-avatar.png'
                    }
                    alt={member.name}
                    className="w-14 h-14 rounded-full object-cover border border-gray-300"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {member.location || 'No Location'}
                    </p>
                  </div>
                </div>

                {/* ✅ Directly opens Messages Tab */}
                <Link
                  to={`/connection/${member._id}?tab=messages`}
                  className="px-6 py-2 rounded-full bg-gray-800 text-white text-sm font-medium shadow-md hover:bg-gray-900 transition-colors"
                >
                  Chat
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
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
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Wants to Learn
                  </h4>
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
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-500">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
