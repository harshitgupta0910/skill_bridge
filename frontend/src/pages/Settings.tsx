import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  CreditCard,
  HelpCircle,
  LogOut,
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  MessageCircle,
  Calendar,
  Lock,
  Key,
  Trash2
} from 'lucide-react';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // Profile Settings
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Notification Settings
    emailNotifications: {
      newMatches: true,
      messages: true,
      sessionReminders: true,
      weeklyDigest: false,
      marketing: false
    },
    pushNotifications: {
      messages: true,
      sessionReminders: true,
      newRequests: true
    },
    
    // Privacy Settings
    profileVisibility: 'public',
    showLocation: true,
    showLastActive: true,
    allowDirectMessages: true,
    
    // Language & Region
    language: 'en',
    timezone: 'PST',
    dateFormat: 'MM/DD/YYYY',
    
    // Session Settings
    autoAcceptSessions: false,
    bufferTime: 15,
    maxSessionsPerWeek: 10
  });

  const sections = [
    { id: 'profile', label: 'Profile & Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'language', label: 'Language & Region', icon: Globe },
    { id: 'sessions', label: 'Session Preferences', icon: Calendar },
    { id: 'billing', label: 'Billing & Payments', icon: CreditCard },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ];

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Account Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={settings.currentPassword}
                onChange={(e) => setSettings({ ...settings, currentPassword: e.target.value })}
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={settings.newPassword}
                onChange={(e) => setSettings({ ...settings, newPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                value={settings.confirmPassword}
                onChange={(e) => setSettings({ ...settings, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center">
          <Trash2 className="w-5 h-5 mr-2" />
          Danger Zone
        </h3>
        <p className="text-red-700 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Email Notifications</h3>
        <div className="space-y-4">
          {Object.entries(settings.emailNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {key === 'newMatches' && 'Get notified when we find potential skill exchange partners'}
                    {key === 'messages' && 'Receive notifications for new messages'}
                    {key === 'sessionReminders' && 'Reminders for upcoming sessions'}
                    {key === 'weeklyDigest' && 'Weekly summary of your activity'}
                    {key === 'marketing' && 'Updates about new features and tips'}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setSettings({
                    ...settings,
                    emailNotifications: {
                      ...settings.emailNotifications,
                      [key]: e.target.checked
                    }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Push Notifications</h3>
        <div className="space-y-4">
          {Object.entries(settings.pushNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {key === 'messages' && 'Instant notifications for new messages'}
                    {key === 'sessionReminders' && 'Push reminders for upcoming sessions'}
                    {key === 'newRequests' && 'Notifications for new exchange requests'}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setSettings({
                    ...settings,
                    pushNotifications: {
                      ...settings.pushNotifications,
                      [key]: e.target.checked
                    }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Profile Visibility</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Who can see your profile?</label>
            <select
              value={settings.profileVisibility}
              onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value="public">Everyone</option>
              <option value="members">Skill Bridge members only</option>
              <option value="connections">My connections only</option>
              <option value="private">Private</option>
            </select>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Show Location</p>
                <p className="text-sm text-gray-600">Display your city and country on your profile</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showLocation}
                  onChange={(e) => setSettings({ ...settings, showLocation: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Show Last Active</p>
                <p className="text-sm text-gray-600">Let others see when you were last online</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showLastActive}
                  onChange={(e) => setSettings({ ...settings, showLastActive: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Allow Direct Messages</p>
                <p className="text-sm text-gray-600">Let other members send you direct messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowDirectMessages}
                  onChange={(e) => setSettings({ ...settings, allowDirectMessages: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Security</h3>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-gray-400" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
            </div>
            <span className="text-sm text-primary-600 font-medium">Enable</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-gray-400" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Login Activity</p>
                <p className="text-sm text-gray-600">Review recent login attempts and active sessions</p>
              </div>
            </div>
            <span className="text-sm text-primary-600 font-medium">View</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderLanguageSettings = () => (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Language & Region</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            value={settings.language}
            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="zh">中文</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.timezone}
            onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          >
            <option value="PST">Pacific Standard Time (PST)</option>
            <option value="EST">Eastern Standard Time (EST)</option>
            <option value="GMT">Greenwich Mean Time (GMT)</option>
            <option value="CET">Central European Time (CET)</option>
            <option value="JST">Japan Standard Time (JST)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
          <select
            value={settings.dateFormat}
            onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSessionSettings = () => (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Session Preferences</h3>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Auto-accept Sessions</p>
            <p className="text-sm text-gray-600">Automatically accept session requests from verified users</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoAcceptSessions}
              onChange={(e) => setSettings({ ...settings, autoAcceptSessions: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buffer Time (minutes)</label>
            <select
              value={settings.bufferTime}
              onChange={(e) => setSettings({ ...settings, bufferTime: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Time between sessions</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Sessions per Week</label>
            <select
              value={settings.maxSessionsPerWeek}
              onChange={(e) => setSettings({ ...settings, maxSessionsPerWeek: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value={5}>5 sessions</option>
              <option value={10}>10 sessions</option>
              <option value={15}>15 sessions</option>
              <option value={20}>20 sessions</option>
              <option value={0}>No limit</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBillingSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Current Plan</h3>
        <div className="border border-primary-200 rounded-xl p-6 bg-primary-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-bold text-primary-900">Free Plan</h4>
              <p className="text-primary-700">Perfect for getting started</p>
            </div>
            <span className="text-2xl font-bold text-primary-900">$0/month</span>
          </div>
          <ul className="space-y-2 text-primary-800">
            <li>• Up to 10 skill exchanges per month</li>
            <li>• Basic matching algorithm</li>
            <li>• Community access</li>
            <li>• Standard support</li>
          </ul>
          <button className="w-full mt-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
            Upgrade to Pro
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Payment Methods</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-300 rounded-xl">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-600">Expires 12/25</p>
              </div>
            </div>
            <button className="text-primary-600 hover:text-primary-700 font-medium">Edit</button>
          </div>
          <button className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl hover:border-primary-300 hover:text-primary-600 transition-colors">
            + Add Payment Method
          </button>
        </div>
      </div>
    </div>
  );

  const renderHelpSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Help & Support</h3>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <HelpCircle className="w-5 h-5 text-gray-400" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Help Center</p>
                <p className="text-sm text-gray-600">Find answers to common questions</p>
              </div>
            </div>
            <span className="text-sm text-primary-600 font-medium">Visit</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-5 h-5 text-gray-400" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Contact Support</p>
                <p className="text-sm text-gray-600">Get help from our support team</p>
              </div>
            </div>
            <span className="text-sm text-primary-600 font-medium">Contact</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Community Forum</p>
                <p className="text-sm text-gray-600">Connect with other users</p>
              </div>
            </div>
            <span className="text-sm text-primary-600 font-medium">Join</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">About</h3>
        <div className="space-y-4 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Version</span>
            <span>2.1.0</span>
          </div>
          <div className="flex justify-between">
            <span>Last Updated</span>
            <span>January 20, 2025</span>
          </div>
          <div className="flex justify-between">
            <span>Terms of Service</span>
            <button className="text-primary-600 hover:text-primary-700">View</button>
          </div>
          <div className="flex justify-between">
            <span>Privacy Policy</span>
            <button className="text-primary-600 hover:text-primary-700">View</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSettings();
      case 'notifications': return renderNotificationSettings();
      case 'privacy': return renderPrivacySettings();
      case 'language': return renderLanguageSettings();
      case 'sessions': return renderSessionSettings();
      case 'billing': return renderBillingSettings();
      case 'help': return renderHelpSettings();
      default: return renderProfileSettings();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-1">Manage your account preferences and settings.</p>
            </div>
            <button 
              onClick={handleSave}
              className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full hover:shadow-lg transition-all duration-200 flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-4 sticky top-8">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <section.icon className={`w-5 h-5 ${
                        activeSection === section.id ? 'text-white' : 'text-gray-400'
                      }`} />
                      <span className="font-medium text-sm">{section.label}</span>
                    </button>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-200">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200">
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium text-sm">Sign Out</span>
                    </button>
                  </div>
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;