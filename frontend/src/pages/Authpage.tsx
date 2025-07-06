import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

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
      const res = await axios.post('proxy/api/auth/login', loginData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user._id);

      setUser({
        id: res.data.user._id,
        name: res.data.user.name,
        email: res.data.user.email,
        avatar: res.data.user.photo ? `proxy${res.data.user.photo}` : '',
        skills: res.data.user.skills || [],
        wantToLearn: res.data.user.wantToLearn || [],
        rating: 4.8,
        location: res.data.user.location || '',
      });

      setIsLoggedIn(true);
      toast.success('Logged in successfully! 🎉');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed');
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
      await axios.post('proxy/api/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Signup successful! Please login.');
      setIsLogin(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 p-6 text-white">
      <ToastContainer />

      {/* Blurred Gradient Blobs */}
      {/* <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div> */}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 max-w-lg w-full"
      >
        {/* Switcher */}
        <div className="flex justify-center mb-8 space-x-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`px-6 py-3 rounded-full font-semibold text-lg shadow-md transition-all ${
              isLogin
                ? 'bg-blue-800 text-white'
                : 'bg-white/80 text-gray-800 border border-gray-300'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`px-6 py-3 rounded-full font-semibold text-lg shadow-md transition-all ${
              !isLogin
                ? 'bg-blue-800 text-white'
                : 'bg-white/80 text-gray-800 border border-gray-300'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </motion.button>
        </div>

        {/* Forms */}
        <motion.div
          key={isLogin ? 'login' : 'signup'}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-xl bg-white text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-xl bg-white text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="w-full py-3 bg-rose-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Login
              </motion.button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-5">
              {['name', 'email', 'password', 'bio', 'location', 'availability', 'languages'].map((field) => (
                <input
                  key={field}
                  type={field === 'password' ? 'password' : 'text'}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full p-3 rounded-xl bg-white text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400"
                  value={(signupData as any)[field]}
                  onChange={(e) => setSignupData({ ...signupData, [field]: e.target.value })}
                  required
                />
              ))}

              <input
                type="text"
                placeholder="Skills I Can Teach (comma separated)"
                className="w-full p-3 rounded-xl bg-white text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={signupData.proficientSkills}
                onChange={(e) => setSignupData({ ...signupData, proficientSkills: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Skills I Want to Learn (comma separated)"
                className="w-full p-3 rounded-xl bg-white text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={signupData.learningSkills}
                onChange={(e) => setSignupData({ ...signupData, learningSkills: e.target.value })}
                required
              />

              <div>
                <label className="font-bold mb-2 block text-gray-300">Upload Avatar:</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-gray-300"
                  onChange={(e) =>
                    setSignupData({ ...signupData, avatar: e.target.files?.[0] || null })
                  }
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="w-full py-3 bg-rose-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Signup
              </motion.button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
