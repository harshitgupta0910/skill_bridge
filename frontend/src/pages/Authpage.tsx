// src/pages/AuthPage.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    location: '',
    availability: '',
    languages: '',
    proficientSkills: '',
    learningSkills: '',
    avatar: null as File | null,
  });

  const { setUser, setIsLoggedIn } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', loginData);
    console.log("Login API Response:", res.data);
    if (!res.data || !res.data.user) throw new Error('Invalid user data from API.');

    localStorage.setItem('token', res.data.token);
    setUser({
      id: res.data.user._id,
      name: res.data.user.name,
      email: res.data.user.email,
      avatar: res.data.user.photo ? `http://localhost:5000${res.data.user.photo}` : '',
      skills: res.data.user.skills || [],
      wantToLearn: res.data.user.wantToLearn || [],
      rating: 4.8,
      location: res.data.user.location || '',
    });

    setIsLoggedIn(true);
    toast.success('Logged in successfully! 🎉');
    navigate('/dashboard');
  } catch (err: any) {
    console.error("Login Error:", err);
    toast.error(err.response?.data?.message || err.message || 'Login failed');
  }
};


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(signupData).forEach(([key, val]) => {
      if (key === 'avatar') {
        if (val) formData.append(key, val);
      } else {
        formData.append(key, val as string);
      }
    });

    // ✅ Convert comma-separated fields to JSON arrays
    formData.set(
      'proficientSkills',
      JSON.stringify(
        signupData.proficientSkills.split(',').map((s) => s.trim()).filter(Boolean)
      )
    );
    formData.set(
      'learningSkills',
      JSON.stringify(
        signupData.learningSkills.split(',').map((s) => s.trim()).filter(Boolean)
      )
    );
    formData.set(
      'languages',
      JSON.stringify(
        signupData.languages.split(',').map((s) => s.trim()).filter(Boolean)
      )
    );

    try {
      await axios.post('http://localhost:5000/api/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Signup successful! Please login.');
      setIsLogin(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-200 p-4">
      <ToastContainer />
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10">
        <div className="flex justify-center mb-6 space-x-4">
          <button
            className={`px-4 py-2 rounded-full ${isLogin ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded-full ${!isLogin ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            {['name', 'email', 'password', 'bio', 'location', 'availability', 'languages'].map((field) => (
              <input
                key={field}
                type={field === 'password' ? 'password' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full p-2 border rounded"
                value={(signupData as any)[field]}
                onChange={(e) => setSignupData({ ...signupData, [field]: e.target.value })}
                required
              />
            ))}

            {/* ✅ Comma-separated skills */}
            <input
              type="text"
              placeholder="Skills I Can Teach (comma separated)"
              className="w-full p-2 border rounded"
              value={signupData.proficientSkills}
              onChange={(e) => setSignupData({ ...signupData, proficientSkills: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Skills I Want to Learn (comma separated)"
              className="w-full p-2 border rounded"
              value={signupData.learningSkills}
              onChange={(e) => setSignupData({ ...signupData, learningSkills: e.target.value })}
              required
            />

            <div>
              <label className="font-bold mb-2 block">Upload Avatar:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setSignupData({ ...signupData, avatar: e.target.files?.[0] || null })
                }
              />
            </div>

            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
              Signup
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
