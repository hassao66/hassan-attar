import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share, Download, CheckCircle } from 'lucide-react';
import { useVideo } from '../contexts/VideoContext';
import { useAuth } from '../contexts/AuthContext';

const Watch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getVideoById } = useVideo();
  const { isAuthenticated } = useAuth();
  const [comment, setComment] = useState('');
  const video = getVideoById(id!);

  if (!video) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">Video not found</p>
      </div>
    );
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      // Add comment logic here
      setComment('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="bg-black rounded-lg overflow-hidden mb-4">
            <div className="aspect-video bg-gray-800 flex items-center justify-center">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Video Info */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-white mb-4">{video.title}</h1>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">{formatViews(video.views)} views</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{video.uploadDate}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{formatViews(video.likes)}</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                  <span>{formatViews(video.dislikes)}</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <Share className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <img
                src={video.channel.avatar}
                alt={video.channel.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-white">{video.channel.name}</h3>
                  {video.channel.verified && (
                    <CheckCircle className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <p className="text-sm text-gray-400">1.2M subscribers</p>
              </div>
              <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors">
                Subscribe
              </button>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-300">{video.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {video.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-gray-800 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Comments</h3>
            
            {isAuthenticated && (
              <form onSubmit={handleComment} className="mb-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a public comment..."
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white resize-none focus:outline-none focus:border-red-500"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Comment
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {/* Sample comments */}
              <div className="flex space-x-3">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm text-white">@user123</span>
                    <span className="text-xs text-gray-400">2 days ago</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">Great video! Really helpful content.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar with related videos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Up Next</h3>
          {/* Related videos would go here */}
          <div className="text-center py-8 text-gray-400">
            Related videos coming soon...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;