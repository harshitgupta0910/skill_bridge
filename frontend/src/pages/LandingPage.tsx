import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import skillLogo from '../skill.jpg';
import adobe from '../sk.png';
import {
  Users,
  BookOpen,
  Calendar,
  MessageCircle,
  Star,
  ArrowRight,
  Play,
  TrendingUp,
  Shield,
  Zap,
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white overflow-hidden">
      {/* Blurred Gradient Blobs */}
      {/* <div className="absolute top-0 -left-20 w-[30rem] h-[30rem] bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 -right-20 w-[30rem] h-[30rem] bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div> */}

      {/* Navbar */}
 <nav className="flex items-center justify-between px-8 py-6 z-10 relative">
  {/* Logo + Title wrapper */}
  <div className="flex items-center gap-2">
  <motion.div whileHover={{ rotate: 0 }} className="w-32 h-32">
    <img
      src={adobe}
      alt="Skill Bridge Logo"
      className="w-full h-full object-contain rounded-full"
    />
  </motion.div>

  <h1 className="text-2xl font-extrabold tracking-tight bg-gray-50 text-transparent bg-clip-text -ml-2">
    Skill Bridge
  </h1>
</div>

  {/* Get Started Button */}
<Link
  to="/auth"
  className="group relative inline-flex items-center justify-center px-6 py-2 rounded-full text-white font-semibold bg-white-500 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden border border-white"
>
  <span className="absolute inset-0 bg-blue-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-in-out rounded-full z-0"></span>
  <span className="relative z-10">Get Started</span>
</Link>
</nav>


      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 py-20 relative z-10">
        <motion.h2
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Learn. Share.
          <span className="block bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">
            Grow Together
          </span>
        </motion.h2>

        <motion.p
          className="max-w-xl text-lg md:text-xl text-gray-300 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Join a vibrant community where knowledge meets curiosity. Exchange skills, mentor others, and unlock new opportunities.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Link
            to="/auth"
            className="px-8 py-4 rounded-full bg-rose-500 shadow-lg hover:scale-110 transition transform hover:shadow-xl font-semibold"
          >
            Join Now
          </Link>
          <button className="px-8 py-4 border border-gray-500 rounded-full hover:border-cyan-500 hover:text-cyan-400 transition">
            Learn More
          </button>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="grid md:grid-cols-4 gap-8 px-8 pb-20 relative z-10">
        {[
          { number: '10,000+', label: 'Active Users' },
          { number: '25,000+', label: 'Skills Exchanged' },
          { number: '150+', label: 'Countries' },
          { number: '4.9', label: 'Avg. Rating' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl font-bold text-cyan-400 mb-2">{stat.number}</div>
            <div className="text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 pb-20 relative z-10">
        {[
          { icon: Users, title: 'Smart Matching', desc: 'AI connects you with perfect partners based on your interests.' },
          { icon: BookOpen, title: 'Diverse Skills', desc: 'Exchange skills across coding, arts, languages, and more.' },
          { icon: Calendar, title: 'Easy Scheduling', desc: 'Integrated calendar for smooth session planning.' },
          { icon: MessageCircle, title: 'Seamless Chat', desc: 'Chat and collaborate directly within the app.' },
          { icon: Star, title: 'Trust Reviews', desc: 'Earn credibility with reviews & ratings.' },
          { icon: Shield, title: 'Privacy First', desc: 'Safe, encrypted, and private exchanges.' },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="p-8 bg-white/10 rounded-2xl backdrop-blur-md shadow-lg hover:shadow-xl border border-white/20 hover:-translate-y-2 transition-all"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-50 mb-4">{feature.title}</h3>
            <p className="text-gray-300">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* How It Works */}
      <section className="px-8 pb-20 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '01', icon: Users, title: 'Create Profile', desc: 'Tell us your skills & interests.' },
            { step: '02', icon: TrendingUp, title: 'Find Match', desc: 'Discover ideal learning partners.' },
            { step: '03', icon: Zap, title: 'Start Exchanging', desc: 'Collaborate & grow together.' },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="relative p-8 bg-white/10 rounded-2xl backdrop-blur-md shadow-lg border border-white/20 hover:-translate-y-1 transition-all"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl font-extrabold text-blue-100 mb-4">{step.step}</div>
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-50 mb-4">{step.title}</h3>
              <p className="text-gray-300">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-20 bg--rose-400 relative z-10 text-center rounded-t-3xl shadow-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Skill Exchange Journey?
          </h2>
          <p className="text-xl text-cyan-100 mb-8">
            Connect, grow, and thrive with the Skill Bridge community.
          </p>
          <Link
  to="/auth"
  className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-gray-900 bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
>
  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-in-out rounded-full z-0"></span>
  <span className="relative z-10">Get Started Now</span>
</Link>

        </motion.div>
      </section>

    {/* Footer */}
<footer className="relative z-10 px-8 py-12 border-t border-white/10 bg-gradient-to-b from-slate-900 via-slate-800 to-gray-900 text-gray-400">
  <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
    {/* Logo + Tagline */}
    <div>
      <div className="flex items-center space-x-3 mb-4">
        <img src={adobe} alt="Skill Bridge Logo" className="w-20 h-20 rounded-xl" />
        <span className="text-xl font-bold text-white">Skill Bridge</span>
      </div>
      <p className="text-gray-400">
        Empowering people to connect, exchange, and grow through community-driven learning.
      </p>
    </div>

    {/* Platform Links */}
    <div>
      <h3 className="text-white font-semibold mb-4">Platform</h3>
      <ul className="space-y-2">
        <li><a href="#" className="hover:text-cyan-400 transition">How It Works</a></li>
        <li><a href="#" className="hover:text-cyan-400 transition">Features</a></li>
        <li><a href="#" className="hover:text-cyan-400 transition">Pricing</a></li>
        <li><a href="#" className="hover:text-cyan-400 transition">Security</a></li>
      </ul>
    </div>

    {/* Community Links */}
    <div>
      <h3 className="text-white font-semibold mb-4">Community</h3>
      <ul className="space-y-2">
        <li><a href="#" className="hover:text-cyan-400 transition">Blog</a></li>
        <li><a href="#" className="hover:text-cyan-400 transition">Events</a></li>
        <li><a href="#" className="hover:text-cyan-400 transition">Forum</a></li>
        <li><a href="#" className="hover:text-cyan-400 transition">Ambassadors</a></li>
      </ul>
    </div>

    {/* Support Links */}
    <div>
      <h3 className="text-white font-semibold mb-4">Support</h3>
      <ul className="space-y-2">
        <li><a href="#" className="hover:text-cyan-400 transition">Help Center</a></li>
        <li><a href="#" className="hover:text-cyan-400 transition">Contact Us</a></li>
        <li><a href="#" className="hover:text-cyan-400 transition">Privacy Policy</a></li>
        <li><a href="#" className="hover:text-cyan-400 transition">Terms of Service</a></li>
      </ul>
    </div>
  </div>

  {/* Divider */}
  <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm">
    &copy; 2025 <span className="text-white font-semibold">Skill Bridge</span>. All rights reserved.
  </div>
</footer>

    </div>
  );
};

export default LandingPage;
