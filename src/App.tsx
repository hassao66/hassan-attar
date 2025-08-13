import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { VideoProvider } from './contexts/VideoContext';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Upload from './pages/Upload';
import Profile from './pages/Profile';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminVideos from './pages/admin/Videos';
import AdminAnalytics from './pages/admin/Analytics';

function App() {
  return (
    <AuthProvider>
      <VideoProvider>
        <div className="min-h-screen bg-gray-900 text-white">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin/*" element={
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/users" element={<AdminUsers />} />
                  <Route path="/videos" element={<AdminVideos />} />
                  <Route path="/analytics" element={<AdminAnalytics />} />
                </Routes>
              </AdminLayout>
            } />
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/watch/:id" element={<Watch />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/profile/:id" element={<Profile />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </div>
      </VideoProvider>
    </AuthProvider>
  );
}

export default App;