import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Upload, Bell, User, Menu, Youtube } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useVideo } from '../contexts/VideoContext';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { searchQuery, setSearchQuery } = useVideo();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/');
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="flex items-center space-x-2">
            <Youtube className="w-8 h-8 text-red-500" />
            <span className="text-xl font-bold">VideoTube</span>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos..."
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-full focus:outline-none focus:border-red-500 text-white"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gray-600 border border-gray-600 rounded-r-full hover:bg-gray-500 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/upload"
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                title="Upload Video"
              >
                <Upload className="w-5 h-5" />
              </Link>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-1 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.username}
                    className="w-8 h-8 rounded-full"
                  />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50">
                    <div className="p-3 border-b border-gray-600">
                      <p className="font-medium">{user?.username}</p>
                      <p className="text-sm text-gray-400">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to={`/profile/${user?.id}`}
                        className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Your Channel
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;