import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Exchanges from './pages/Exchanges';
import Community from './pages/Community';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Authpage from './pages/Authpage';
import ConnectionDetail from './pages/ConnectionDetail';
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
         <Routes>
  {/* Public Routes */}
  <Route path="/" element={<LandingPage />} />
  <Route path="/auth" element={<Authpage />} />

  {/* Protected Routes */}
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />
  <Route
    path="/exchanges"
    element={
      <ProtectedRoute>
        <Exchanges />
      </ProtectedRoute>
    }
  />
  <Route
    path="/community"
    element={
      <ProtectedRoute>
        <Community />
      </ProtectedRoute>
    }
  />
  <Route
    path="/analytics"
    element={
      <ProtectedRoute>
        <Analytics />
      </ProtectedRoute>
    }
  />
  <Route
    path="/settings"
    element={
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    }
  />
  <Route
    path="/connection/:id"
    element={
      <ProtectedRoute>
        <ConnectionDetail />
      </ProtectedRoute>
    }
  />
</Routes>

        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
