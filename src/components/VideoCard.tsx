import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Video } from '../contexts/VideoContext';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  const formatDate = (date: string) => {
    const now = new Date();
    const videoDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - videoDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors">
      <Link to={`/watch/${video.id}`}>
        <div className="relative">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-48 object-cover"
          />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </span>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex space-x-3">
          <img
            src={video.channel.avatar}
            alt={video.channel.name}
            className="w-9 h-9 rounded-full"
          />
          <div className="flex-1">
            <Link to={`/watch/${video.id}`}>
              <h3 className="font-medium text-white line-clamp-2 hover:text-gray-300 transition-colors">
                {video.title}
              </h3>
            </Link>
            <div className="flex items-center space-x-1 mt-1">
              <span className="text-gray-400 text-sm">{video.channel.name}</span>
              {video.channel.verified && (
                <CheckCircle className="w-3 h-3 text-gray-400" />
              )}
            </div>
            <div className="text-gray-400 text-sm mt-1">
              {formatViews(video.views)} • {formatDate(video.uploadDate)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;