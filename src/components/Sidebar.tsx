import React from 'react';
import { Link } from 'react-router-dom';
import { Home, TrendingUp, Music, Gamepad2, Film, Trophy, Lightbulb, Shirt } from 'lucide-react';
import { useVideo } from '../contexts/VideoContext';

const Sidebar: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useVideo();

  const categories = [
    { name: 'All', icon: Home },
    { name: 'Trending', icon: TrendingUp },
    { name: 'Music', icon: Music },
    { name: 'Gaming', icon: Gamepad2 },
    { name: 'Movies', icon: Film },
    { name: 'Sports', icon: Trophy },
    { name: 'Technology', icon: Lightbulb },
    { name: 'Fashion', icon: Shirt },
  ];

  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 h-[calc(100vh-73px)] sticky top-[73px]">
      <nav className="p-4">
        <div className="space-y-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;