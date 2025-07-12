//  Your full working Profile.tsx with editable languages
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import imag from '../pages/image.png';
import { useApp } from '../context/AppContext';
import ReviewsSection from '../components/ReviewsSection';
import {
  Camera, Edit3, Save, MapPin, Star, X, Plus, Globe
} from 'lucide-react';
import { toast } from 'react-toastify';
  const achievements = [
    { title: 'Expert Teacher', description: '50+ successful exchanges', icon: '🎓' },
    { title: 'Community Helper', description: 'Top 10% contributor', icon: '🤝' },
    { title: 'Quick Responder', description: 'Responds within 2 hours', icon: '⚡' },
    { title: 'Reliable Partner', description: '100% completion rate', icon: '✅' }
  ];
  

const Profile: React.FC = () => {
  const { user, setUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [newSkill, setNewSkill] = useState('');
  const [newLearning, setNewLearning] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name,
        bio: user.bio || '',
        location: user.location || '',
        availability: user.availability || '',
        languages: user.languages || [],
        skills: user.skills || [],
        wantToLearn: user.wantToLearn || [],
      });
    }
  }, [user]);

  if (!user || !editForm) return <div className="p-10">Loading...</div>;
const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.put(`${backendUrl}/api/user/profile`, editForm, {

        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      toast.success('Profile updated!');
      setIsEditing(false);
    } catch {
      toast.error('Failed to save profile.');
    }
  };

  const handleAvatar = async (file: File) => {
    const fd = new FormData();
    fd.append('avatar', file);
    try {
      const token = localStorage.getItem('token');

      const res = await axios.post(`${backendUrl}/api/user/avatar`, fd, {

        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(res.data);
      toast.success('Avatar updated!');
    } catch {
      toast.error('Failed to upload avatar.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-gray-600">Update your public information</p>
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-full flex items-center"
          >
            {isEditing ? <Save className="w-5 h-5 mr-2" /> : <Edit3 className="w-5 h-5 mr-2" />}
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Profile Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="relative inline-block">
              <img

                src={user.photo ? `${backendUrl}${user.photo}` : imag}

                alt="avatar"
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
                  <Camera className="w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleAvatar(e.target.files[0])}
                  />
                </label>
              )}
            </div>
            {isEditing ? (
              <input
                className="text-2xl font-bold text-center w-full mt-3"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            ) : (
              <h2 className="text-2xl font-bold mt-3">{user.name}</h2>
            )}

            <div className="flex justify-center mt-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5" />
              ))}
            </div>

            <div className="text-gray-600 mt-2 flex items-center justify-center gap-1">
              <MapPin className="w-4 h-4" />
              {isEditing ? (
                <input
                  className="text-center border-b"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                />
              ) : (
                <span>{user.location}</span>
              )}
            </div>

            {isEditing ? (
              <textarea
                className="w-full mt-4 border p-2 rounded"
                rows={4}
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
              />
            ) : (
              <p className="mt-4 text-gray-600">{user.bio}</p>
            )}
          </div>

          {/* Right Side Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold mb-3">Skills I Can Teach</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {editForm.skills.map((skill: string) => (
                  <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2">
                    {skill}
                    {isEditing && (
                      <X className="w-4 h-4 cursor-pointer" onClick={() =>
                        setEditForm({ ...editForm, skills: editForm.skills.filter((s: string) => s !== skill) })
                      } />
                    )}
                  </span>
                ))}
              </div>
              {isEditing && (
                <div className="flex">
                  <input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add skill"
                    className="flex-1 border px-3 py-2 rounded-l"
                  />
                  <button
                    onClick={() => {
                      if (newSkill.trim()) {
                        setEditForm({ ...editForm, skills: [...editForm.skills, newSkill.trim()] });
                        setNewSkill('');
                      }
                    }}
                    className="bg-blue-600 text-white px-3 rounded-r"
                  >
                    <Plus />
                  </button>
                </div>
              )}
            </div>

            {/* Learning Skills */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold mb-3">Skills I Want to Learn</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {editForm.wantToLearn.map((skill: string) => (
                  <span key={skill} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2">
                    {skill}
                    {isEditing && (
                      <X className="w-4 h-4 cursor-pointer" onClick={() =>
                        setEditForm({ ...editForm, wantToLearn: editForm.wantToLearn.filter((s: string) => s !== skill) })
                      } />
                    )}
                  </span>
                ))}
              </div>
              {isEditing && (
                <div className="flex">
                  <input
                    value={newLearning}
                    onChange={(e) => setNewLearning(e.target.value)}
                    placeholder="Add skill"
                    className="flex-1 border px-3 py-2 rounded-l"
                  />
                  <button
                    onClick={() => {
                      if (newLearning.trim()) {
                        setEditForm({ ...editForm, wantToLearn: [...editForm.wantToLearn, newLearning.trim()] });
                        setNewLearning('');
                      }
                    }}
                    className="bg-green-600 text-white px-3 rounded-r"
                  >
                    <Plus />
                  </button>
                </div>
              )}
            </div>

            {/* Availability & Languages */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold mb-2">Availability</h3>
                {isEditing ? (
                  <textarea
                    className="border p-2 w-full rounded"
                    rows={3}
                    value={editForm.availability}
                    onChange={(e) => setEditForm({ ...editForm, availability: e.target.value })}
                  />
                ) : (
                  <p>{user.availability}</p>
                )}
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {editForm.languages.map((lang: string) => (
                    <span key={lang} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-2">
                      {lang}
                      {isEditing && (
                        <X className="w-4 h-4 cursor-pointer" onClick={() =>
                          setEditForm({ ...editForm, languages: editForm.languages.filter((l: string) => l !== lang) })
                        } />
                      )}
                    </span>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex mt-2">
                    <input
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      placeholder="Add language"
                      className="flex-1 border px-3 py-2 rounded-l"
                    />
                    <button
                      onClick={() => {
                        if (newLanguage.trim()) {
                          setEditForm({ ...editForm, languages: [...editForm.languages, newLanguage.trim()] });
                          setNewLanguage('');
                        }
                      }}
                      className="bg-purple-600 text-white px-3 rounded-r"
                    >
                      <Plus />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">Achievements</h3>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default Profile;
