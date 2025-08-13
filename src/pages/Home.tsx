import React from 'react';
import VideoCard from '../components/VideoCard';
import { useVideo } from '../contexts/VideoContext';

const Home: React.FC = () => {
  const { videos, searchQuery, selectedCategory } = useVideo();

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.channel.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const isPublished = video.status === 'published';
    
    return matchesSearch && matchesCategory && isPublished;
  });

  return (
    <div>
      {searchQuery && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            Search results for "{searchQuery}"
          </h2>
          <p className="text-gray-400">{filteredVideos.length} videos found</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No videos found</p>
        </div>
      )}
    </div>
  );
};

export default Home;